import { notifConstants } from '../_constants/notif.constants';

const initialState = {
    items: [],
};

function items(state = initialState.items, action) {
    switch (action.type) {
        case notifConstants.ITEM_ADD:
            return [
                action.item,
                ...state,
            ];
        case notifConstants.ITEM_REMOVE:
            return state.filter((val) => val.id !== action.id);
        case notifConstants.ITEMS_CLEAR:
            return initialState.items;

        case notifConstants.ITEMS_SET:
            return action.payload.data;

        case notifConstants.ITEMS_MARK_READ:
            return state.map((val) => {
                val.read_at = 1;
                return val;
            });

        default:
            return state;
    }
}

export function notif(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                items: items(state.items, action),
            };
    }
}
