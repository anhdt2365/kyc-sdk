import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";

export type DeactivateProviderParams = {
    accounts: {
        authority: PublicKey;
        providerConfigAccount: PublicKey;
    };
    inputs: {};
};

export async function deactivateProvider(
    program: Program<KycProgram>,
    params: DeactivateProviderParams
): Promise<Instruction> {
    const { accounts } = params;

    const ix = await program.methods.deactivateProvider()
        .accounts({
            ...accounts,
            systemProgram: SystemProgram.programId
        }).instruction();

    return {
        instructions: [ix],
        cleanupInstructions: [],
        signers: [],
    };
}
