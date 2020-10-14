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
        form: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case orderConstants.INDEX_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
            };
        case orderConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
                orderStatusPhases: action.payload.orderStatusPhases,
            };
        case orderConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case orderConstants.SHOW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case orderConstants.SHOW_SUCCESS:
            return {
                data: action.payload.data,
                form: action.payload.form,
            };
        case orderConstants.SHOW_FAILURE:
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
