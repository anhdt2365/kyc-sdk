import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";
export declare type UpdateKycParams = {
    accounts: {
        authority: PublicKey;
        providerConfigAccount: PublicKey;
        userConfigAccount: PublicKey;
        oldUserKycAccount: PublicKey;
        newUserKycAccount: PublicKey;
    };
    inputs: {
        name: number[];
        documentId: number[];
        country: number[];
        dob: number[];
        doe: number[];
        gender: number[];
        isExpired: boolean;
    };
};
export declare function updateKyc(program: Program<KycProgram>, params: UpdateKycParams): Promise<Instruction>;
