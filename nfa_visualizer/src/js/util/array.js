/**
 * Remove duplicate elements from the array and sort it
 *
 * @param {Array} arr The array to remove duplicate elements from
 * @returns {Array} The deduplicated array
 */
export function removeDuplicates (arr) {
    return [...new Set(arr)].sort()
}
