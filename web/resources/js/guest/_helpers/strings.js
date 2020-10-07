import { config } from './';

export function t(string) {
    return string;
}

export function fMoney(amount, currency) {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        // maximumFractionDigits: 0,
    });

    // amount is stored int so 1 -> 100
    return formatter.format(amount / 100);
}

export const validators = {
    length(value, min, max = null) {
        return (value.trim()).length >= min && (!max || (value.trim()).length <= max);
    },
    email(value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    },
}

export function fileSrc(path) {
    return config.storagePrefix + path;
}
