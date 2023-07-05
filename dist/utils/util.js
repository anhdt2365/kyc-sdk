"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKycParams = exports.stringToBytes32 = exports.hash = void 0;
const types_1 = require("../types");
const countryLookup = __importStar(require("country-code-lookup"));
const { createHash } = require('crypto');
const hash = (str) => {
    if (!str)
        return null;
    return createHash('sha256').update(str).digest('hex');
};
exports.hash = hash;
const stringToBytes32 = (str) => {
    if (!str)
        return [];
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(str);
    const bytes32 = new Uint8Array(32);
    bytes32.set(encodedString.subarray(0, 32));
    const numbersArray = Array.from(bytes32, (byte) => byte);
    return numbersArray;
};
exports.stringToBytes32 = stringToBytes32;
const validateKycParams = (name, documentId, country, dob, doe, gender) => {
    if (name.length > 255 || documentId.length > 255) {
        throw Error("Invalid parameter length! Cannot exceed 255 characters");
    }
    let encodedCountry = country.toLowerCase();
    if (!countryLookup.byFips(encodedCountry)) {
        throw Error("Invalid country");
    }
    let encodedGender = [];
    if (gender) {
        if (!Object.values(types_1.Gender).includes(gender)) {
            throw Error("Invalid gender");
        }
        encodedGender = (0, exports.stringToBytes32)((0, exports.hash)(gender));
    }
    return {
        encodedName: (0, exports.stringToBytes32)((0, exports.hash)(name)),
        encodedDocumentId: (0, exports.stringToBytes32)((0, exports.hash)(documentId)),
        encodedCountry: (0, exports.stringToBytes32)((0, exports.hash)(country)),
        encodedDob: (0, exports.stringToBytes32)((0, exports.hash)(dob.getTime().toString())),
        encodedDoe: doe ? (0, exports.stringToBytes32)((0, exports.hash)(doe.getTime().toString())) : [],
        encodedGender
    };
};
exports.validateKycParams = validateKycParams;
