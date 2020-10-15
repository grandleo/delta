import { alertConstants } from '../_constants/alert.constants';

const initialState = {
    items: [],
};

function items(state = initialState.items, action) {
    switch (action.type) {
        case alertConstants.ITEM_ADD:
            return [
                ...state,
                action.item
            ];
        case alertConstants.ITEM_REMOVE:
            return state.filter((val) => val.id !== action.id);
        case alertConstants.ITEMS_CLEAR:
            return initialState.items;
        default:
            return state;
    }
}

export function alert(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                items: items(state.items, action),
            };
    }
}
