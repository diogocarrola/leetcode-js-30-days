/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const map = new Map();
    
    // Add all arr1 items to map
    for (const item of arr1) {
        map.set(item.id, item);
    }
    
    // Merge arr2 items with arr1 items
    for (const item of arr2) {
        if (map.has(item.id)) {
            // Merge existing item with new item
            const existing = map.get(item.id);
            map.set(item.id, { ...existing, ...item });
        } else {
            // Add new item
            map.set(item.id, item);
        }
    }
    
    // Convert map values to array and sort by id
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
};