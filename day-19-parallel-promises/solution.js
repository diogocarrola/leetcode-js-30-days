/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        const n = functions.length;
        const results = new Array(n);
        let completed = 0;
        let hasRejected = false;
        
        functions.forEach((fn, index) => {
            fn()
                .then(value => {
                    if (hasRejected) return;
                    
                    results[index] = value;
                    completed++;
                    
                    if (completed === n) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    if (!hasRejected) {
                        hasRejected = true;
                        reject(error);
                    }
                });
        });
        
        if (n === 0) resolve([]);
    });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */