import { TransactionBuilder, Instruction } from "@orca-so/common-sdk";
import { Context } from "./context";
import * as ixs from "./instructions";

export class Methods {
    public ctx: Context;
    public ix: Instruction | null | undefined;

    public constructor(ctx: Context, ix?: Instruction) {
        this.ctx = ctx;
        this.ix = ix;
    }

    public async createProviderConfig(params: ixs.CreateProviderConfigParams) {
        this.ix = await ixs.createProviderConfig(this.ctx.program, params);
        return this;
    }

    public async deactivateProvider(params: ixs.DeactivateProviderParams) {
        this.ix = await ixs.deactivateProvider(this.ctx.program, params);
        return this;
    }

    public async deactivateUser(params: ixs.DeactivateUserParams) {
        this.ix = await ixs.deactivateUser(this.ctx.program, params);
        return this;
    }

    public async submitKyc(params: ixs.SubmitKycParams) {
        this.ix = await ixs.submitKyc(this.ctx.program, params);
        return this;
    }

    public async updateKyc(params: ixs.UpdateKycParams) {
        this.ix = await ixs.updateKyc(this.ctx.program, params);
        return this;
    }

    public toTx(): TransactionBuilder {
        const tx = new TransactionBuilder(this.ctx.provider.connection, this.ctx.provider.wallet);
        return this.ix ? tx.addInstruction(this.ix) : tx;
    }
}
