/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    // Handle null
    if (obj === null) return null;
    
    // Handle arrays
    if (Array.isArray(obj)) {
        const result = [];
        for (const item of obj) {
            const val = compactObject(item);
            if (val) {
                result.push(val);
            }
        }
        return result;
    }
    
    // Handle objects
    if (typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            const val = compactObject(obj[key]);
            if (val) {
                result[key] = val;
            }
        }
        return result;
    }
    
    // Handle primitives
    return obj;
};