import { guestConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case guestConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case guestConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
            };
        case guestConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

export function guest(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
            };
    }
}
