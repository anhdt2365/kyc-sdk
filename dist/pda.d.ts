import * as anchor from "@project-serum/anchor";
export declare const KYC_SEED = "kyc_account";
export declare const USER_CONFIG_SEED = "user_config_account";
export declare const PROVIDER_CONFIG_SEED = "provider_account";
export interface PDAInfo {
    key: anchor.web3.PublicKey;
    bump: number;
}
export declare class PDA {
    readonly programId: anchor.web3.PublicKey;
    constructor(programId: anchor.web3.PublicKey);
    provider_config: (provider: anchor.web3.PublicKey) => PDAInfo;
    user_config: (user: anchor.web3.PublicKey) => PDAInfo;
    user_kyc: (user_config_account: anchor.web3.PublicKey, prev_kyc_account: anchor.web3.PublicKey) => PDAInfo;
}
