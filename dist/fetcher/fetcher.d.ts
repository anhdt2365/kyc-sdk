import { Connection } from "@solana/web3.js";
import { Address } from "@project-serum/anchor";
import { ProviderConfigData, UserConfigData, UserKycData } from "../";
import { ParsableEntity, ParsableProviderConfig, ParsableUserConfig, ParsableUserKyc } from "./parsing";
/**
 * Supported accounts
 */
declare type CachedValue = ParsableProviderConfig | ParsableUserConfig | ParsableUserKyc;
/**
 * Include both the entity (i.e. type) of the stored value, and the value itself
 */
interface CachedContent<T extends CachedValue> {
    entity: ParsableEntity<T>;
    value: CachedValue | null;
}
export declare class AccountFetcher {
    private readonly connection;
    private readonly _cache;
    constructor(connection: Connection, cache?: Record<string, CachedContent<CachedValue>>);
    /*** Public Methods ***/
    /**
     * Update the cached value of all entities currently in the cache.
     * Uses batched rpc request for network efficient fetch.
     */
    refreshAll(): Promise<void>;
    /*** Private Methods ***/
    /**
     * Retrieve from cache or fetch from rpc, an account
     */
    private get;
    /**
     * Retrieve from cache or fetch from rpc, a list of accounts
     */
    private list;
    /**
     * Make batch rpc request
     */
    private bulkRequest;
    getProviderConfig(address: Address, refresh?: boolean): Promise<ProviderConfigData | null>;
    getUserConfig(address: Address, refresh?: boolean): Promise<UserConfigData | null>;
    getOneUserKyc(address: Address, refresh?: boolean): Promise<UserKycData | null>;
}
export {};
