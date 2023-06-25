import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";
export declare type SubmitKycParams = {
    accounts: {
        authority: PublicKey;
        providerConfigAccount: PublicKey;
        userConfigAccount: PublicKey;
        userKycAccount: PublicKey;
    };
    inputs: {
        user: PublicKey;
        kycLevel: number;
        name: number[];
        documentId: number[];
        country: number[];
        dob: number[];
        doe: number[];
        gender: number[];
        isExpired: boolean;
    };
};
export declare function submitKyc(program: Program<KycProgram>, params: SubmitKycParams): Promise<Instruction>;
