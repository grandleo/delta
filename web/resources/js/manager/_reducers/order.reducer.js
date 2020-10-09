import { orderConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case orderConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case orderConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
            };
        case orderConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

export function order(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
            };
    }
}
