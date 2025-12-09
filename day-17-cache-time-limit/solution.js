var TimeLimitedCache = function() {
    this.cache = new Map(); // Store key -> {value, timeoutId}
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    // Check if key exists and hasn't expired (has active timeout)
    const exists = this.cache.has(key) && this.cache.get(key).timeoutId !== null;
    
    // Clear existing timeout if any
    if (exists) {
        clearTimeout(this.cache.get(key).timeoutId);
    }
    
    // Create timeout for automatic deletion
    const timeoutId = setTimeout(() => {
        // Only delete if it's still the same entry (not overwritten)
        const entry = this.cache.get(key);
        if (entry && entry.timeoutId === timeoutId) {
            this.cache.delete(key);
        }
    }, duration);
    
    // Store the new entry
    this.cache.set(key, { 
        value, 
        timeoutId 
    });
    
    return exists;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        return this.cache.get(key).value;
    }
    return -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */