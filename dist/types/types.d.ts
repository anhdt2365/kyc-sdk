import { BN, BorshAccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { KycProgram } from "../artifacts/kyc-program";
export declare type KycProgramType = KycProgram;
export declare const KycProgramIDL: Idl;
export declare const accountsCoder: BorshAccountsCoder<string>;
export declare enum AccountName {
    ProviderConfig = "providerConfig",
    UserConfig = "userConfig",
    UserKyc = "userKyc"
}
export declare type ProviderConfigData = {
    provider: PublicKey;
    deactivate: boolean;
    admin: PublicKey;
    bump: number[];
};
export declare type UserConfigData = {
    admin: PublicKey;
    user: PublicKey;
    kycLevel: number;
    provider: PublicKey;
    deactivate: boolean;
    latestKycAccount: PublicKey;
    bump: number[];
};
export declare type UserKycData = {
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
export declare type IsKycData = {
    isKyc: boolean;
    kycLevel: number | null;
    isExpired: boolean | null;
};
