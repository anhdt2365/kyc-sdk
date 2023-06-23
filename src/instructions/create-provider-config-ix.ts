import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";

export type CreateProviderConfigParams = {
    accounts: {
        authority: PublicKey;
        providerConfigAccount: PublicKey;
    };
    inputs: {
        provider: PublicKey,
    };
};

export async function createProviderConfig(
    program: Program<KycProgram>,
    params: CreateProviderConfigParams
): Promise<Instruction> {
    const { accounts, inputs } = params;

    const ix = await program.methods.createProviderConfig(inputs.provider)
        .accounts({
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
