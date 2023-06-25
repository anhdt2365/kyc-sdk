"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycClient = void 0;
const web3_js_1 = require("@solana/web3.js");
const __1 = require("..");
class KycClient {
    constructor(ctx, pda) {
        this.ctx = ctx;
        this.pda = pda;
    }
    static getClient(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(ctx.program.programId);
            return new KycClient(ctx, pda);
        });
    }
    createProviderConfig(authority, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const providerConfig = this.pda.provider_config(provider);
            const tx = (yield this.ctx.methods.createProviderConfig({
                accounts: {
                    authority,
                    providerConfigAccount: providerConfig.key,
                },
                inputs: {
                    provider,
                },
            })).toTx();
            return tx;
        });
    }
    deactivateProvider(authority, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const providerConfig = this.pda.provider_config(provider);
            const tx = (yield this.ctx.methods.deactivateProvider({
                accounts: {
                    authority,
                    providerConfigAccount: providerConfig.key,
                },
                inputs: {},
            })).toTx();
            return tx;
        });
    }
    deactivateUser(ctx, authority, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(ctx.program.programId);
            const userConfig = pda.user_config(user);
            const tx = (yield this.ctx.methods.deactivateUser({
                accounts: {
                    authority,
                    userConfig: userConfig.key,
                },
                inputs: {},
            })).toTx();
            return tx;
        });
    }
    submitKyc(provider, user, kycLevel, name, documentId, country, dob, doe, gender, isExpired) {
        return __awaiter(this, void 0, void 0, function* () {
            const providerConfig = this.pda.provider_config(provider);
            const userConfig = this.pda.user_config(user);
            const userKyc = this.pda.user_kyc(userConfig.key, web3_js_1.SystemProgram.programId);
            const tx = (yield this.ctx.methods.submitKyc({
                accounts: {
                    authority: provider,
                    providerConfigAccount: providerConfig.key,
                    userConfigAccount: userConfig.key,
                    userKycAccount: userKyc.key,
                },
                inputs: {
                    user,
                    kycLevel,
                    name: (0, __1.stringToBytes32)(name),
                    documentId: (0, __1.stringToBytes32)(documentId),
                    country: (0, __1.stringToBytes32)(country),
                    dob: (0, __1.dateToNumberArray)(dob),
                    doe: (0, __1.dateToNumberArray)(doe),
                    gender: (0, __1.stringToBytes32)(gender),
                    isExpired,
                },
            })).toTx();
            return tx;
        });
    }
    updateKyc(provider, user, name, documentId, country, dob, doe, gender, isExpired) {
        return __awaiter(this, void 0, void 0, function* () {
            const providerConfig = this.pda.provider_config(provider);
            const userConfig = this.pda.user_config(user);
            const userConfigData = yield this.ctx.program.account.userConfig.fetch(userConfig.key);
            const newUserKyc = this.pda.user_kyc(userConfig.key, userConfigData.latestKycAccount);
            const tx = (yield this.ctx.methods.updateKyc({
                accounts: {
                    authority: provider,
                    providerConfigAccount: providerConfig.key,
                    userConfigAccount: userConfig.key,
                    oldUserKycAccount: userConfigData.latestKycAccount,
                    newUserKycAccount: newUserKyc.key,
                },
                inputs: {
                    name: (0, __1.stringToBytes32)(name),
                    documentId: (0, __1.stringToBytes32)(documentId),
                    country: (0, __1.stringToBytes32)(country),
                    dob: (0, __1.dateToNumberArray)(dob),
                    doe: (0, __1.dateToNumberArray)(doe),
                    gender: (0, __1.stringToBytes32)(gender),
                    isExpired,
                },
            })).toTx();
            return tx;
        });
    }
    getProviderConfig(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const providerConfig = pda.provider_config(provider);
            const providerConfigData = yield this.ctx.fetcher.getProviderConfig(providerConfig.key, true);
            if (!providerConfigData) {
                throw new Error(`Provider Config of provider ${provider} not found`);
            }
            return providerConfigData;
        });
    }
    getUserConfig(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const userConfig = pda.user_config(user);
            const userConfigData = yield this.ctx.fetcher.getUserConfig(userConfig.key, true);
            if (!userConfigData) {
                throw new Error(`User Config of user ${user} not found`);
            }
            return userConfigData;
        });
    }
    getCurrentUserKyc(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const userConfig = pda.user_config(user);
            const userConfigData = yield this.ctx.fetcher.getUserConfig(userConfig.key, true);
            if (!userConfigData) {
                throw new Error(`User Config of user ${user} not found`);
            }
            return this.getOneUserKyc(userConfigData.latestKycAccount);
        });
    }
    getOneUserKyc(userKyc) {
        return __awaiter(this, void 0, void 0, function* () {
            const userKycData = yield this.ctx.fetcher.getOneUserKyc(userKyc, true);
            if (!userKycData) {
                throw new Error(`User Kyc ${userKyc} not found`);
            }
            return userKycData;
        });
    }
    isKyc(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const userConfig = pda.user_config(user);
            const userConfigData = yield this.ctx.fetcher.getUserConfig(userConfig.key, true);
            if (!userConfigData) {
                return false;
            }
            const userKycData = yield this.getOneUserKyc(userConfigData.latestKycAccount);
            return !userKycData.isExpired;
        });
    }
}
exports.KycClient = KycClient;
