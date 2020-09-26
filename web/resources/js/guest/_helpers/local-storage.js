import { config } from './';

export function lsGetItem(name) {
    return localStorage.getItem(`${config.localStoragePrefix}_${name}`);
}

export function lsSetItem(name, value) {
    return localStorage.setItem(`${config.localStoragePrefix}_${name}`, value);
}

export function lsLoadState() {
    try {
        const serializedState = lsGetItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export function lsSaveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        lsSetItem('state', serializedState);
    } catch {
        // ignore write errors
    }
}
