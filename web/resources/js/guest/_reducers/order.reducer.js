import { orderConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
        orderStatusPhases: null,
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
                ...state,
                loading: true,
                data: null,
            };
        case orderConstants.GETALL_SUCCESS:
            return {
                data: action.payload.data,
                orderStatusPhases: action.payload.orderStatusPhases,
            };
        case orderConstants.GETALL_FAILURE:
            return {
                error: action.error,
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
            };
        case orderConstants.GETBYID_SUCCESS:
            return {
                data: action.payload.data,
            };
        case orderConstants.GETBYID_FAILURE:
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
                current: current(state.current, action),
            };
    }
}
