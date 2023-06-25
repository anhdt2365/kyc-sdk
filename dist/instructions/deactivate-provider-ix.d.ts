import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";
export declare type DeactivateProviderParams = {
    accounts: {
        authority: PublicKey;
        providerConfigAccount: PublicKey;
    };
    inputs: {};
};
export declare function deactivateProvider(program: Program<KycProgram>, params: DeactivateProviderParams): Promise<Instruction>;
