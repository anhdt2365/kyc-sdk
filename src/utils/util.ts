import { ValidateKycData, Gender } from "../types";
import * as countryLookup from "country-code-lookup";
const { createHash } = require('crypto');

export const hash = (str: string | null): string | null => {
    if (!str) return null;
    return createHash('sha256').update(str).digest('hex');
}

export const stringToBytes32 = (str: string | null): number[] => {
    if (!str) return [];
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(str);
    const bytes32 = new Uint8Array(32);
    bytes32.set(encodedString.subarray(0, 32));
    const numbersArray: number[] = Array.from(bytes32, (byte) => byte);
    return numbersArray;
};

export const validateKycParams = (
    name: string,
    documentId: string,
    country: string,
    dob: Date,
    doe: Date | null,
    gender: Gender | null,
): ValidateKycData => {
    if (name.length > 255 || documentId.length > 255) {
        throw Error("Invalid parameter length! Cannot exceed 255 characters");
    }

    let encodedCountry = country.toLowerCase();
    if (!countryLookup.byFips(encodedCountry)) {
        throw Error("Invalid country")
    }

    let encodedGender: number[] = [];
    if (gender) {
        if (!Object.values(Gender).includes(gender)) {
            throw Error("Invalid gender");
        }
        encodedGender = stringToBytes32(hash(gender));
    }

    return {
        encodedName: stringToBytes32(hash(name)),
        encodedDocumentId: stringToBytes32(hash(documentId)),
        encodedCountry: stringToBytes32(hash(country)),
        encodedDob: stringToBytes32(hash(dob.getTime().toString())),
        encodedDoe: doe ? stringToBytes32(hash(doe.getTime().toString())) : [],
        encodedGender
    }
}