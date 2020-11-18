import {paymentConstants} from '../_constants';

const initialState = {
    cards: {
        loading: false,
        error: false,
        data: null,
    }
};

function cardsList(state = initialState, action) {
    switch (action.type) {
        case paymentConstants.CARDS_LIST_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case paymentConstants.CARDS_LIST_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case paymentConstants.CARDS_LIST_FAILURE:
            return {
                loading: false,
                error: action.error,
                data: null,
            };
        default:
            return state;
    }
}

export function payment(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                cards: cardsList(state.cards, action),
            };
    }
}
