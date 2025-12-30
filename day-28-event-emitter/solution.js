class EventEmitter {
    constructor() {
        // Use Map to store events with their callbacks
        this.events = new Map();
        // Counter to generate unique IDs for subscriptions
        this.id = 0;
    }
    
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        // Create array for this event if it doesn't exist
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        
        // Get the subscriptions for this event
        const subscriptions = this.events.get(eventName);
        
        // Create a unique ID for this subscription
        const subscriptionId = this.id++;
        
        // Create subscription object with ID and callback
        const subscription = {
            id: subscriptionId,
            callback: callback
        };
        
        // Add to subscriptions array
        subscriptions.push(subscription);
        
        // Return object with unsubscribe method
        return {
            unsubscribe: () => {
                // Get current subscriptions for this event
                const currentSubs = this.events.get(eventName);
                if (currentSubs) {
                    // Find index of this subscription by ID
                    const index = currentSubs.findIndex(sub => sub.id === subscriptionId);
                    // Remove if found
                    if (index !== -1) {
                        currentSubs.splice(index, 1);
                    }
                }
                return undefined;
            }
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        // If event doesn't exist, return empty array
        if (!this.events.has(eventName)) {
            return [];
        }
        
        // Get all subscriptions for this event
        const subscriptions = this.events.get(eventName);
        const results = [];
        
        // Call each callback with the provided arguments
        for (const subscription of subscriptions) {
            results.push(subscription.callback(...args));
        }
        
        return results;
    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */