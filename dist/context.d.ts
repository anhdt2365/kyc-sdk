import { AnchorProvider, Program } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { ConfirmOptions, Connection, PublicKey } from "@solana/web3.js";
import { KycProgramType } from "./types";
import { AccountFetcher } from "./fetcher";
import { Methods } from "./methods";
/**
 * @category Core
 */
export declare class Context {
    readonly connection: Connection;
    readonly wallet: Wallet;
    readonly opts: ConfirmOptions;
    readonly program: Program<KycProgramType>;
    readonly provider: AnchorProvider;
    readonly fetcher: AccountFetcher;
    readonly methods: Methods;
    static from(connection: Connection, wallet: Wallet, programId: PublicKey, fetcher?: AccountFetcher, opts?: ConfirmOptions): Context;
    static fromWorkspace(provider: AnchorProvider, program: Program, fetcher?: AccountFetcher, opts?: ConfirmOptions): Context;
    static withProvider(provider: AnchorProvider, programId: PublicKey, fetcher?: AccountFetcher, opts?: ConfirmOptions): Context;
    constructor(provider: AnchorProvider, wallet: Wallet, program: Program, fetcher: AccountFetcher, opts: ConfirmOptions);
}
