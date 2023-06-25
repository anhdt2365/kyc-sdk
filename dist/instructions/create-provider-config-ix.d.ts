import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { KycProgram } from "../artifacts/kyc-program";
export declare type CreateProviderConfigParams = {
    accounts: {
        authority: PublicKey;
        providerConfigAccount: PublicKey;
    };
    inputs: {
        provider: PublicKey;
    };
};
export declare function createProviderConfig(program: Program<KycProgram>, params: CreateProviderConfigParams): Promise<Instruction>;
