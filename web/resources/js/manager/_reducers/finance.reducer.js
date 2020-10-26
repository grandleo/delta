import { financeConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case financeConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case financeConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
            };
        case financeConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

export function finance(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
            };
    }
}
