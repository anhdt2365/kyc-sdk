import { TransactionBuilder, Instruction } from "@orca-so/common-sdk";
import { Context } from "./context";
import * as ixs from "./instructions";
export declare class Methods {
    ctx: Context;
    ix: Instruction | null | undefined;
    constructor(ctx: Context, ix?: Instruction);
    createProviderConfig(params: ixs.CreateProviderConfigParams): Promise<this>;
    deactivateProvider(params: ixs.DeactivateProviderParams): Promise<this>;
    deactivateUser(params: ixs.DeactivateUserParams): Promise<this>;
    submitKyc(params: ixs.SubmitKycParams): Promise<this>;
    updateKyc(params: ixs.UpdateKycParams): Promise<this>;
    toTx(): TransactionBuilder;
}
