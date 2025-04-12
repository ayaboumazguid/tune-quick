function create<T>(setup: (set: (fn: (state: T) => T) => void, get: () => T) => T): T & { getState: () => T } {
    let state: T;
    const subscribers = new Set<() => void>();

    const setState = (fn: (state: T) => T) => {
        state = fn(state);
        subscribers.forEach(subscriber => subscriber());
    };

    const getState = () => state;

    // Initialize the state using the setup function
    state = setup(setState, getState);

    // Subscribe function for React components
    const subscribe = (subscriber: () => void) => {
        subscribers.add(subscriber);
        return () => subscribers.delete(subscriber);
    };

    // Return state with additional utility methods
    return {
        ...state,
        getState,
        subscribe
    } as T & { getState: () => T };
}

