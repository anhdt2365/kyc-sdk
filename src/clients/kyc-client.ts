import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { createTransferInstruction } from "spl-token";
import { Context, PDA, validateKycParams, Gender, RENEC_PROVIDER_TESTNET, REID_MINT_TESTNET } from "..";
import { IsKycData, ProviderConfigData, UserConfigData, UserKycData } from "../types";

export class KycClient {
    ctx: Context;
    public pda: PDA;

    constructor(
        ctx: Context,
        pda: PDA
    ) {
        this.ctx = ctx;
        this.pda = pda;
    }

    public static async getClient(
        ctx: Context,
    ): Promise<KycClient> {
        const pda = new PDA(ctx.program.programId);
        return new KycClient(ctx, pda);
    }

    public async createProviderConfig(
        authority: PublicKey,
        provider: PublicKey,
    ): Promise<TransactionBuilder> {
        const providerConfig = this.pda.provider_config(provider);

        const tx = (
            await this.ctx.methods.createProviderConfig({
                accounts: {
                    authority,
                    providerConfigAccount: providerConfig.key,
                },
                inputs: {
                    provider,
                },
            })
        ).toTx();

        return tx;
    }

    public async deactivateProvider(
        authority: PublicKey,
        provider: PublicKey,
    ): Promise<TransactionBuilder> {
        const providerConfig = this.pda.provider_config(provider);

        const tx = (
            await this.ctx.methods.deactivateProvider({
                accounts: {
                    authority,
                    providerConfigAccount: providerConfig.key,
                },
                inputs: {},
            })
        ).toTx();

        return tx;
    }

    public async deactivateUser(
        authority: PublicKey,
        user: PublicKey,
    ): Promise<TransactionBuilder> {
        const userConfig = this.pda.user_config(user);

        const tx = (
            await this.ctx.methods.deactivateUser({
                accounts: {
                    authority,
                    userConfig: userConfig.key,
                },
                inputs: {},
            })
        ).toTx();

        return tx;
    }

    public async submitKyc(
        provider: PublicKey,
        user: PublicKey,
        kycLevel: number,
        name: string,
        documentId: string,
        country: string,
        dob: Date,
        doe: Date | null,
        gender: Gender | null,
        isExpired: boolean,
    ): Promise<TransactionBuilder> {
        const providerConfig = this.pda.provider_config(provider);
        const _isKyc = await this.isKyc(user);
        if (_isKyc.isKyc) {
            throw Error("User is already have KYC");
        }
        const userConfig = this.pda.user_config(user);
        const userKyc = this.pda.user_kyc(userConfig.key, SystemProgram.programId);
        const validatedParams = validateKycParams(
            name,
            documentId,
            country,
            dob,
            doe,
            gender
        );

        const tx = (
            await this.ctx.methods.submitKyc({
                accounts: {
                    authority: provider,
                    providerConfigAccount: providerConfig.key,
                    userConfigAccount: userConfig.key,
                    userKycAccount: userKyc.key,
                },
                inputs: {
                    user,
                    kycLevel,
                    name: validatedParams.encodedName,
                    documentId: validatedParams.encodedDocumentId,
                    country: validatedParams.encodedCountry,
                    dob: validatedParams.encodedDob,
                    doe: validatedParams.encodedDoe,
                    gender: validatedParams.encodedGender,
                    isExpired,
                },
            })
        ).toTx();

        return tx;
    }

    public async updateKyc(
        provider: PublicKey,
        user: PublicKey,
        name: string,
        documentId: string,
        country: string,
        dob: Date,
        doe: Date | null,
        gender: Gender | null,
        isExpired: boolean,
    ): Promise<TransactionBuilder> {
        const providerConfig = this.pda.provider_config(provider);
        const userConfig = this.pda.user_config(user);
        const userConfigData = await this.ctx.program.account.userConfig.fetch(userConfig.key);
        const newUserKyc = this.pda.user_kyc(userConfig.key, userConfigData.latestKycAccount);
        const validatedParams = validateKycParams(
            name,
            documentId,
            country,
            dob,
            doe,
            gender
        );

        const tx = (
            await this.ctx.methods.updateKyc({
                accounts: {
                    authority: provider,
                    providerConfigAccount: providerConfig.key,
                    userConfigAccount: userConfig.key,
                    oldUserKycAccount: userConfigData.latestKycAccount,
                    newUserKycAccount: newUserKyc.key,
                },
                inputs: {
                    name: validatedParams.encodedName,
                    documentId: validatedParams.encodedDocumentId,
                    country: validatedParams.encodedCountry,
                    dob: validatedParams.encodedDob,
                    doe: validatedParams.encodedDoe,
                    gender: validatedParams.encodedGender,
                    isExpired,
                },
            })
        ).toTx();

        return tx;
    }

    public async transferKycToken(
        user: PublicKey,
        mint: PublicKey,
    ): Promise<string> {
        // Get provider token account
        const providerTokenAccount = await this.ctx.connection.getTokenAccountsByOwner(
            this.ctx.wallet.publicKey,
            {
                mint,
            }
        );

        // Get user token account
        const userTokenAccount = await this.ctx.connection.getTokenAccountsByOwner(
            user,
            {
                mint,
            }
        );

        let tx = new Transaction();
        tx.add(createTransferInstruction(
            providerTokenAccount.value[0].pubkey,
            userTokenAccount.value[0].pubkey,
            this.ctx.wallet.publicKey,
            LAMPORTS_PER_SOL
        ))
        const latestBlockHash = await this.ctx.connection.getLatestBlockhash('confirmed');
        tx.recentBlockhash = latestBlockHash.blockhash;
        tx.feePayer = this.ctx.wallet.publicKey;
        tx = await this.ctx.wallet.signTransaction(tx);

        return await this.ctx.provider.sendAndConfirm(tx);
    }

    public async getProviderConfig(
        provider: PublicKey,
    ): Promise<ProviderConfigData> {
        const pda = new PDA(this.ctx.program.programId);
        const providerConfig = pda.provider_config(provider);

        const providerConfigData = await this.ctx.fetcher.getProviderConfig(providerConfig.key, true);
        if (!providerConfigData) {
            throw new Error(`Provider Config of provider ${provider} not found`);
        }
        return providerConfigData;
    }

    public async getUserConfig(
        user: PublicKey,
    ): Promise<UserConfigData> {
        const pda = new PDA(this.ctx.program.programId);
        const userConfig = pda.user_config(user);

        const userConfigData = await this.ctx.fetcher.getUserConfig(userConfig.key, true);
        if (!userConfigData) {
            throw new Error(`User Config of user ${user} not found`);
        }
        return userConfigData;
    }

    public async getOneUserConfig(
        userConfig: PublicKey,
    ): Promise<UserConfigData> {
        const userConfigData = await this.ctx.fetcher.getUserConfig(userConfig, true);
        if (!userConfigData) {
            throw new Error(`User Config ${userConfig} not found`);
        }
        return userConfigData;
    }

    public async getCurrentUserKyc(
        user: PublicKey,
    ): Promise<UserKycData> {
        const pda = new PDA(this.ctx.program.programId);
        const userConfig = pda.user_config(user);

        const userConfigData = await this.ctx.fetcher.getUserConfig(userConfig.key, true);
        if (!userConfigData) {
            throw new Error(`User Config of user ${user} not found`);
        }

        return this.getOneUserKyc(userConfigData.latestKycAccount);
    }

    public async getOneUserKyc(
        userKyc: PublicKey,
    ): Promise<UserKycData> {
        const userKycData = await this.ctx.fetcher.getOneUserKyc(userKyc, true);
        if (!userKycData) {
            throw new Error(`User Kyc ${userKyc} not found`);
        }

        const userConfigData = await this.getOneUserConfig(userKycData.userConfigAccount);
        if (userConfigData.provider.toBase58() === RENEC_PROVIDER_TESTNET) {
            userKycData.provider = "RENEC blockchain"
        } else {
            userKycData.provider = userConfigData.provider.toBase58();
        }

        return userKycData;
    }

    public async isKyc(
        user: PublicKey,
    ): Promise<IsKycData> {
        const pda = new PDA(this.ctx.program.programId);
        const userConfig = pda.user_config(user);

        const userConfigData = await this.ctx.fetcher.getUserConfig(userConfig.key, true);
        if (!userConfigData) {
            return {
                isKyc: false,
                kycLevel: null,
                isExpired: null,
            };
        }

        const userKycData = await this.getOneUserKyc(userConfigData.latestKycAccount);
        return {
            isKyc: true,
            kycLevel: userConfigData.kycLevel,
            isExpired: userKycData.isExpired,
        };
    }
}
