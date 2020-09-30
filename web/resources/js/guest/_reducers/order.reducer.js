import { orderConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
    },
    current: {
        loading: false,
        error: false,
        data: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case orderConstants.GETALL_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case orderConstants.GETALL_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case orderConstants.GETALL_FAILURE:
            return {
                loading: false,
                error: action.error,
                data: null,
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case orderConstants.GETBYID_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case orderConstants.GETBYID_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case orderConstants.GETBYID_FAILURE:
            return {
                loading: false,
                error: action.error,
                data: null,
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
                current: current(state.current, action),
            };
    }
}
