/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function(arr, n) {
    const result = [];
    
    function flatten(array, depth) {
        for (const item of array) {
            if (Array.isArray(item) && depth < n) {
                flatten(item, depth + 1);
            } else {
                result.push(item);
            }
        }
    }
    
    flatten(arr, 0);
    return result;
};