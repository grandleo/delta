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
