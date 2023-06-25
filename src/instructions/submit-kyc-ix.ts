import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";

export type SubmitKycParams = {
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

export async function submitKyc(
    program: Program<KycProgram>,
    params: SubmitKycParams
): Promise<Instruction> {
    const { accounts, inputs } = params;

    const ix = await program.methods.submitKyc(
        inputs.user,
        inputs.kycLevel,
        inputs.name,
        inputs.documentId,
        inputs.country,
        inputs.dob,
        inputs.doe,
        inputs.gender,
        inputs.isExpired
    ).accounts({
        ...accounts,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
    }).instruction();

    return {
        instructions: [ix],
        cleanupInstructions: [],
        signers: [],
    };
}
