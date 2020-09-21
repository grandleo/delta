import { cartConstants } from '../_constants';

const initialState = {
    items: []
};

export function cart(state = {}, action) {
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            return state
        default:
            return state
    }
}
