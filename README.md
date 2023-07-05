# kyc-sdk

## How to use

### 1. Create Provider Config
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, KycClient, KYC_PROGRAM_ID_TESTNET } from "@renec-foundation/kyc-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(KYC_PROGRAM_ID_TESTNET));

const kycClient = await KycClient.getClient(ctx);

const tx = await kycClient.createProviderConfig(
    adminPubkey,
    providerPubkey,
);

await tx.buildAndExecute();

const providerConfig = await kycClient.getProviderConfig(providerPubkey);
console.log("providerConfig", providerConfig);
```

+ Output
```
providerConfig {
  provider: PublicKey [PublicKey(5DpAL3z23bHSbkZxFh6NP3dAzvt85jadGMfTsJoE1J6w)] {
    _bn: <BN: 3eb70ad6e0e1998d39350b8ccc4b9b87f0defa1a6fa0e9b0c83be41db783228c>
  },
  deactivate: true,
  admin: PublicKey [PublicKey(HynkzV2DiMZdUz97CA4DmgCf95Z8q5bvfqPhKhwSQdFT)] {
    _bn: <BN: fc4741617766ae63ec1960a44ae319d8e7922761a1877e9846c8b1149642673e>
  },
  bump: [ 254 ]
}
```


### 2. Submit KYC
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, KycClient, KYC_PROGRAM_ID_TESTNET } from "@renec-foundation/kyc-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(KYC_PROGRAM_ID_TESTNET));

const kycClient = await KycClient.getClient(ctx);

 const kycLevel = 1;
const name = "Tieu Anh Tien";
const documentId = "9899998923321";
const country = "vn";
const dob = new Date("2019-01-16");
const doe = null;
const gender = null;
const isExpired = false;

const tx = await kycClient.submitKyc(
    providerPubkey,
    userPubkey,
    kycLevel,
    name,
    documentId,
    country,
    dob,
    doe,
    gender,
    isExpired
);

await tx.buildAndExecute();

const userConfigData = await kycClient.getUserConfig(user.publicKey);
console.log("userConfigData", userConfigData);

const userKycData = await kycClient.getCurrentUserKyc(providerPubkey);
console.log("userKycData", userKycData);

// Transfer reID Token
await kycClient.transferKycToken(user.publicKey, mint);

// Check reID balance
let providerTokenAccountInfo = await getAccount(
    connection,
    providerTokenAccount.address
);
console.log(providerTokenAccountInfo.amount.toString());
let userTokenAccountInfo = await getAccount(
    connection,
    userTokenAccount.address
);
console.log(userTokenAccountInfo.amount.toString());

```

+ Output
```
userConfigData {
  admin: PublicKey [PublicKey(EtUS32vLSTMXYHzNtaCB1yrj1aJgQWHjMPbxRVDA7P2X)] {
    _bn: <BN: ce57917feea7f46d467a199f4e0aa1e3a34c8eb83ac3a9568359669bb4f22570>
  },
  user: PublicKey [PublicKey(GvYBaorsRCebqHVC67AvNXVEQi37TfCYov6ntQ3rGMvy)] {
    _bn: <BN: ec96584b644a4311cf60e74c6a52925f09e71e6a0a843970aa8e0fd48d48d0f2>
  },
  kycLevel: 1,
  provider: PublicKey [PublicKey(GeCiWwpgjbDScbY9u3r5K9t5u1SfyTeZ35QWxwaFuLrs)] {
    _bn: <BN: e8670a7a2610963bfb00b2585747ce0b26150089e96004483009ccaabdfc9b98>
  },
  deactivate: false,
  latestKycAccount: PublicKey [PublicKey(23yiZ4ahKLomokCyLCfaShs6f5yoJEyooFHK13Bjmkpe)] {
    _bn: <BN: f9efa5f1612ad466af76f85986398ab340ea82f68ac1a3e47a3ae2a7f02c217>
  },
  bump: [ 252 ]
}


userKycData {
  userConfigAccount: PublicKey [PublicKey(EtUS32vLSTMXYHzNtaCB1yrj1aJgQWHjMPbxRVDA7P2X)] {
    _bn: <BN: ce57917feea7f46d467a199f4e0aa1e3a34c8eb83ac3a9568359669bb4f22570>
  },
  name: [
    84, 105, 101, 117, 32, 65, 110, 104, 32,
    84, 105, 101, 110,  0,  0,   0,   0,  0,
     0,   0,   0,   0,  0,  0,   0,   0,  0,
     0,   0,   0,   0,  0
  ],
  documentId: [
    57, 56, 57, 57, 57, 57, 56, 57, 50,
    51, 51, 50, 49,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0
  ],
  country: [
    118, 110, 0, 0, 0, 0, 0, 0, 0,
      0,   0, 0, 0, 0, 0, 0, 0, 0,
      0,   0, 0, 0, 0, 0, 0, 0, 0,
      0,   0, 0, 0, 0
  ],
  dob: [
    83, 245, 32, 0, 0, 0, 0, 0, 0,
     0,   0,  0, 0, 0, 0, 0, 0, 0,
     0,   0,  0, 0, 0, 0, 0, 0, 0,
     0,   0,  0, 0, 0
  ],
  doe: [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  gender: [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  isExpired: false,
  timestamp: <BN: 64952fd6>,
  prevKycAccount: PublicKey [PublicKey(11111111111111111111111111111111)] {
    _bn: <BN: 0>
  },
  bump: [ 255 ]
}
```


### 3. Update KYC
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, KycClient, KYC_PROGRAM_ID_TESTNET, Gender } from "@renec-foundation/kyc-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(KYC_PROGRAM_ID_TESTNET));

const kycClient = await KycClient.getClient(ctx);

const name = "Tieu Anh Tien";
const documentId = "9899998923321";
const country = "us";
const dob = new Date("2019-01-16");
const doe = null;
const gender = Gender.Male;
const isExpired = false;

const tx = await kycClient.update(
    providerPubkey,
    userPubkey,
    name,
    documentId,
    country,
    dob,
    doe,
    gender,
    isExpired
);

await tx.buildAndExecute();

const userKycData = await kycClient.getCurrentUserKyc(providerPubkey);
console.log("userKycData", userKycData);
```

+ Output
```
userKycData {
  userConfigAccount: PublicKey [PublicKey(9kwHq4TVshNFByEnD31ZH5jhnhsiDpekqNEiALEedZUv)] {
    _bn: <BN: 821edb345bb2093308d8be79c06f69123b7de440c0fb01d3bb2473db5020e923>
  },
  name: [
    84, 105, 101, 117, 32, 65, 110, 104, 32,
    84, 105, 101, 110,  0,  0,   0,   0,  0,
     0,   0,   0,   0,  0,  0,   0,   0,  0,
     0,   0,   0,   0,  0
  ],
  documentId: [
    57, 56, 57, 57, 57, 57, 56, 57, 50,
    51, 51, 50, 50,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0
  ],
  country: [
    117, 115, 0, 0, 0, 0, 0, 0, 0,
      0,   0, 0, 0, 0, 0, 0, 0, 0,
      0,   0, 0, 0, 0, 0, 0, 0, 0,
      0,   0, 0, 0, 0
  ],
  dob: [
    89, 27, 124, 0, 0, 0, 0, 0, 0,
     0,  0,   0, 0, 0, 0, 0, 0, 0,
     0,  0,   0, 0, 0, 0, 0, 0, 0,
     0,  0,   0, 0, 0
  ],
  doe: [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  gender: [
    109, 97, 108, 101, 0, 0, 0, 0, 0,
      0,  0,   0,   0, 0, 0, 0, 0, 0,
      0,  0,   0,   0, 0, 0, 0, 0, 0,
      0,  0,   0,   0, 0
  ],
  isExpired: false,
  timestamp: <BN: 6495308c>,
  prevKycAccount: PublicKey [PublicKey(2avtwhtq8Bb4W3HqvFnKZvR6fdBbxVmxujq19sSyp6Zj)] {
    _bn: <BN: 178ccb25ad52257ade91c7d74cce42400cc4a2e3c6986d37529450af34a57316>
  },
  bump: [ 251 ]
}
```