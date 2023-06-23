import { PublicKey } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA } from "..";
import { ProviderConfigData } from "../types";

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
        ctx: Context,
        authority: PublicKey,
        user: PublicKey,
    ): Promise<TransactionBuilder> {
        const pda = new PDA(ctx.program.programId);
        const userConfig = pda.user_config(user);

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
}
