import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";
export declare type DeactivateUserParams = {
    accounts: {
        authority: PublicKey;
        userConfig: PublicKey;
    };
    inputs: {};
};
export declare function deactivateUser(program: Program<KycProgram>, params: DeactivateUserParams): Promise<Instruction>;
