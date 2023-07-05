import { ValidateKycData, Gender } from "../types";
export declare const hash: (str: string | null) => string | null;
export declare const stringToBytes32: (str: string | null) => number[];
export declare const validateKycParams: (name: string, documentId: string, country: string, dob: Date, doe: Date | null, gender: Gender | null) => ValidateKycData;
