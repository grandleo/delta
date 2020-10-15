import { alertConstants } from '../_constants/alert.constants';

export const alertActions = {
    itemAdd,
    itemAddDirect,
    itemRemove,
    itemsClear,
};

function itemAdd(alertType, message, timeout = 2000) {
    return dispatch => {
        const item = {
            id: Date.now(),
            alertType,
            message,
        };

        // add
        dispatch(itemAddDirect(item));
        // remove after timeout
        if (timeout) {
            setTimeout(() => {
                dispatch(itemRemove(item.id));
            }, timeout);
        }
    };
}

function itemAddDirect(item) {
    return { type: alertConstants.ITEM_ADD, item };
}

function itemRemove(id) {
    return { type: alertConstants.ITEM_REMOVE, id };
}

function itemsClear() {
    return { type: alertConstants.ITEMS_CLEAR };
}
