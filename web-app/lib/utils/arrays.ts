export function splitArrayIntoChunks(array: Array<unknown>, chunkSize: number) {
    const result = [];
    if (array && array.length > 0) {
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
    }
    return result;
}