export const stringToBytes32 = (str: string | null): number[] => {
    if (!str) return [];
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(str);
    const bytes32 = new Uint8Array(32);
    bytes32.set(encodedString.subarray(0, 32));
    const numbersArray: number[] = Array.from(bytes32, (byte) => byte);
    return numbersArray;
};

export const dateToNumberArray = (date: Date | null): number[] => {
    if (!date) return [];
    let timestamp = date.getTime(); // Get Unix timestamp in milliseconds
    const numberArray: number[] = [];

    // Convert the timestamp to a number array
    while (timestamp > 0) {
        numberArray.unshift(timestamp % 256); // Extract the least significant byte
        timestamp >>>= 8; // Shift right by 8 bits (equivalent to dividing by 256)
    }

    return numberArray;
}