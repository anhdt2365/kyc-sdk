import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";

export type UpdateKycParams = {
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

export async function updateKyc(
    program: Program<KycProgram>,
    params: UpdateKycParams
): Promise<Instruction> {
    const { accounts, inputs } = params;

    const ix = await program.methods.updateKyc(
        inputs.name,
        inputs.documentId,
        inputs.country,
        inputs.dob,
        inputs.doe,
        inputs.gender,
        inputs.isExpired,
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
