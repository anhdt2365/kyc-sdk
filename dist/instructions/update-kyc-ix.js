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
exports.updateKyc = void 0;
const web3_js_1 = require("@solana/web3.js");
function updateKyc(program, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accounts, inputs } = params;
        const ix = yield program.methods.updateKyc(inputs.name, inputs.documentId, inputs.country, inputs.dob, inputs.doe, inputs.gender, inputs.isExpired).accounts(Object.assign(Object.assign({}, accounts), { systemProgram: web3_js_1.SystemProgram.programId, rent: web3_js_1.SYSVAR_RENT_PUBKEY })).instruction();
        return {
            instructions: [ix],
            cleanupInstructions: [],
            signers: [],
        };
    });
}
exports.updateKyc = updateKyc;
