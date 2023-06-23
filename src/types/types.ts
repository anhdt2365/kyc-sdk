import { BN, BorshAccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { KycProgram } from "../artifacts/kyc-program";
import * as IDL from "../artifacts/kyc-program.json";

export type KycProgramType = KycProgram;
export const KycProgramIDL = IDL as Idl;
export const accountsCoder = new BorshAccountsCoder(KycProgramIDL);

export enum AccountName {
    ProviderConfig = "providerConfig",
    UserConfig = "userConfig",
    UserKyc = "userKyc",
}

export type ProviderConfigData = {
    provider: PublicKey;
    deactivate: boolean;
    admin: PublicKey;
    bump: number[];
};

export type UserConfigData = {
    admin: PublicKey;
    user: PublicKey;
    kycLevel: number;
    provider: PublicKey;
    deactivate: boolean;
    latestKycAccount: PublicKey;
    bump: number[];
};

export type UserKycData = {
    userConfigAccount: PublicKey;
    name: number[];
    documentId: number[];
    country: number[];
    dob: number[];
    doe: number[];
    gender: number[];
    isExpired: boolean;
    timestamp: BN;
    prevKycAccount: PublicKey;
    bump: number[];
};
