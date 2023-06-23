import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";

export type DeactivateUserParams = {
    accounts: {
        authority: PublicKey;
        userConfig: PublicKey;
    };
    inputs: {};
};

export async function deactivateUser(
    program: Program<KycProgram>,
    params: DeactivateUserParams
): Promise<Instruction> {
    const { accounts, } = params;

    const ix = await program.methods.deactivateUser()
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
