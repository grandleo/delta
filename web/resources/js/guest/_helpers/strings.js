export function t(string) {
    // may be used for localization
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


const fDate_d = new Date();
fDate_d.setMinutes(fDate_d.getMinutes() - fDate_d.getTimezoneOffset());
const [fDate_date, fDate_time] = fDate_d.toJSON().substr(0, 16).replace('T',' ').split(' ');
const fDate_date_split = fDate_date.split('-');

export function fDateGetCurrent() {
    const fDate_d = new Date();
    fDate_d.setMinutes(fDate_d.getMinutes() - fDate_d.getTimezoneOffset());
    return fDate_d.toJSON().substr(0, 16).replace('T',' ');
}

export function fDate(stringIsoTime, beforeTimeStr = '') {
    const [dateStr, timeStr] = stringIsoTime.substr(0, 16).replace('T',' ').split(' ');

    if (dateStr === fDate_date) {
        return beforeTimeStr + timeStr;
    }

    const dateStr_split = dateStr.split('-');

    let resStr = '';
    if (dateStr_split[2] !== fDate_date_split[2] || dateStr_split[1] !== fDate_date_split[1]) {
        resStr += dateStr_split[2]+'.'+dateStr_split[1];
    } else if (dateStr_split[0] !== fDate_date_split[0]) {
        resStr += dateStr_split[2]+'.'+dateStr_split[1]+'.'+fDate_date_split[0];
    }

    return resStr + ' ' + beforeTimeStr + timeStr;
}

export const validators = {
    length(value, min, max = null) {
        return (''+value).trim().length >= min && (!max || (''+value).trim().length <= max);
    },
    email(value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    },
}

const storagePrefix = '/storage/';
export function fileSrc(path) {
    return storagePrefix + path;
}

export function msgGroupedFn(initMessages, uid) {
    const resMessages = [];

    let resI = 0;
    initMessages.forEach((v) => {
        const { is_system, owner_uid, created_at } = v;
        const is_owner = !is_system && uid === owner_uid;
        const is_worker = !is_system && !is_owner && owner_uid.indexOf('w') > -1;
        const is_guest = !is_system && !is_owner && owner_uid.indexOf('g') > -1;
        const key = '' + is_system + owner_uid + created_at.substr(0, 16);
        const found = resMessages.find((v1) => v1.key === key)
        const is_row = resMessages[resI-1] && resMessages[resI-1].owner_uid === owner_uid;
        if (found) {
            found.items.push(v);
        } else {
            resMessages.push({
                key,
                is_owner,
                is_worker,
                is_guest,
                is_system,
                is_row,
                owner_uid,
                created_at,
                items: [v],
            });
            resI += 1;
        }
    })
    return resMessages;
}
