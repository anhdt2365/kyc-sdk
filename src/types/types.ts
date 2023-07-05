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

export enum Gender {
    Male = "male",
    Female = "female",
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
    provider: string;
};

export type ValidateKycData = {
    encodedName: number[];
    encodedDocumentId: number[];
    encodedCountry: number[];
    encodedDob: number[];
    encodedDoe: number[];
    encodedGender: number[];
}

export type IsKycData = {
    isKyc: boolean;
    kycLevel: number | null;
    isExpired: boolean | null;
}
