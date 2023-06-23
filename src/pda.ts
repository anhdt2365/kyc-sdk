import * as anchor from "@project-serum/anchor";

export const KYC_SEED = "kyc_account";
export const USER_CONFIG_SEED = "user_config_account";
export const PROVIDER_CONFIG_SEED = "provider_account";

export interface PDAInfo {
    key: anchor.web3.PublicKey;
    bump: number;
}

export class PDA {
    readonly programId: anchor.web3.PublicKey;

    public constructor(programId: anchor.web3.PublicKey) {
        this.programId = programId;
    }

    provider_config = (provider: anchor.web3.PublicKey): PDAInfo => {
        const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode(PROVIDER_CONFIG_SEED), provider.toBuffer()],
            this.programId,
        );
        return {
            key: pda,
            bump: bump,
        };
    };
}
