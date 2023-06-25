"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToNumberArray = exports.stringToBytes32 = void 0;
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
const dateToNumberArray = (date) => {
    if (!date)
        return [];
    let timestamp = date.getTime(); // Get Unix timestamp in milliseconds
    const numberArray = [];
    // Convert the timestamp to a number array
    while (timestamp > 0) {
        numberArray.unshift(timestamp % 256); // Extract the least significant byte
        timestamp >>>= 8; // Shift right by 8 bits (equivalent to dividing by 256)
    }
    return numberArray;
};
exports.dateToNumberArray = dateToNumberArray;
