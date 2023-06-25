/// <reference types="node" />
import { ProviderConfigData, UserConfigData, UserKycData } from "../types";
/**
 * Static abstract class definition to parse entities.
 * @category Parsable
 */
export interface ParsableEntity<T> {
    /**
     * Parse account data
     *
     * @param accountData Buffer data for the entity
     * @returns Parsed entity
     */
    parse: (accountData: Buffer | undefined | null) => T | null;
}
export declare class ParsableProviderConfig {
    private constructor();
    static parse(data: Buffer | undefined | null): ProviderConfigData | null;
}
export declare class ParsableUserConfig {
    private constructor();
    static parse(data: Buffer | undefined | null): UserConfigData | null;
}
export declare class ParsableUserKyc {
    private constructor();
    static parse(data: Buffer | undefined | null): UserKycData | null;
}
