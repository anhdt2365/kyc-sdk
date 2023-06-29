import { PublicKey } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA } from "..";
import { IsKycData, ProviderConfigData, UserConfigData, UserKycData } from "../types";
export declare class KycClient {
    ctx: Context;
    pda: PDA;
    constructor(ctx: Context, pda: PDA);
    static getClient(ctx: Context): Promise<KycClient>;
    createProviderConfig(authority: PublicKey, provider: PublicKey): Promise<TransactionBuilder>;
    deactivateProvider(authority: PublicKey, provider: PublicKey): Promise<TransactionBuilder>;
    deactivateUser(ctx: Context, authority: PublicKey, user: PublicKey): Promise<TransactionBuilder>;
    submitKyc(provider: PublicKey, user: PublicKey, kycLevel: number, name: string, documentId: string, country: string, dob: Date, doe: Date | null, gender: string | null, isExpired: boolean): Promise<TransactionBuilder>;
    updateKyc(provider: PublicKey, user: PublicKey, name: string, documentId: string, country: string, dob: Date, doe: Date | null, gender: string | null, isExpired: boolean): Promise<TransactionBuilder>;
    getProviderConfig(provider: PublicKey): Promise<ProviderConfigData>;
    getUserConfig(user: PublicKey): Promise<UserConfigData>;
    getCurrentUserKyc(user: PublicKey): Promise<UserKycData>;
    getOneUserKyc(userKyc: PublicKey): Promise<UserKycData>;
    isKyc(user: PublicKey): Promise<IsKycData>;
}
