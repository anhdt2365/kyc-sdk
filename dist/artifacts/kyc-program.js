"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDL = void 0;
exports.IDL = {
    "version": "0.1.0",
    "name": "kyc_program",
    "instructions": [
        {
            "name": "createProviderConfig",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "providerConfigAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "provider",
                    "type": "publicKey"
                }
            ]
        },
        {
            "name": "deactivateProvider",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "providerConfigAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "submitKyc",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "providerConfigAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userConfigAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userKycAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "user",
                    "type": "publicKey"
                },
                {
                    "name": "kycLevel",
                    "type": "u8"
                },
                {
                    "name": "name",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "documentId",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "country",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "dob",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "doe",
                    "type": {
                        "option": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                },
                {
                    "name": "gender",
                    "type": {
                        "option": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                },
                {
                    "name": "isExpired",
                    "type": "bool"
                }
            ]
        },
        {
            "name": "updateKyc",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "providerConfigAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userConfigAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "oldUserKycAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "newUserKycAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "documentId",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "country",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "dob",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "doe",
                    "type": {
                        "option": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                },
                {
                    "name": "gender",
                    "type": {
                        "option": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                },
                {
                    "name": "isExpired",
                    "type": "bool"
                }
            ]
        },
        {
            "name": "deactivateUser",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "userConfig",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "providerConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "provider",
                        "type": "publicKey"
                    },
                    {
                        "name": "deactivate",
                        "type": "bool"
                    },
                    {
                        "name": "admin",
                        "type": "publicKey"
                    },
                    {
                        "name": "bump",
                        "type": {
                            "array": [
                                "u8",
                                1
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "userConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "admin",
                        "type": "publicKey"
                    },
                    {
                        "name": "user",
                        "type": "publicKey"
                    },
                    {
                        "name": "kycLevel",
                        "type": "u8"
                    },
                    {
                        "name": "provider",
                        "type": "publicKey"
                    },
                    {
                        "name": "deactivate",
                        "type": "bool"
                    },
                    {
                        "name": "latestKycAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "bump",
                        "type": {
                            "array": [
                                "u8",
                                1
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "userKyc",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "userConfigAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "documentId",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "country",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "dob",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "doe",
                        "type": {
                            "option": {
                                "array": [
                                    "u8",
                                    32
                                ]
                            }
                        }
                    },
                    {
                        "name": "gender",
                        "type": {
                            "option": {
                                "array": [
                                    "u8",
                                    32
                                ]
                            }
                        }
                    },
                    {
                        "name": "isExpired",
                        "type": "bool"
                    },
                    {
                        "name": "timestamp",
                        "type": "u64"
                    },
                    {
                        "name": "prevKycAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "bump",
                        "type": {
                            "array": [
                                "u8",
                                1
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "AlreadyDeactivateProvider",
            "msg": "Already deactivate provider"
        },
        {
            "code": 6001,
            "name": "AlreadyDeactivateUser",
            "msg": "Already deactivate user"
        },
        {
            "code": 6002,
            "name": "ProviderDeactivated",
            "msg": "Provider deactivated"
        },
        {
            "code": 6003,
            "name": "InputInvalidAccount",
            "msg": "Input invalid account"
        },
        {
            "code": 6004,
            "name": "KycNotChange",
            "msg": "Kyc Account not change"
        },
        {
            "code": 6005,
            "name": "InvalidTimestampConversion",
            "msg": "Timestamp should be convertible from i64 to u64"
        }
    ]
};
