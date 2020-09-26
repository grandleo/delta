import { placeConstants } from '../_constants';

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
        case placeConstants.GETALL_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case placeConstants.GETALL_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case placeConstants.GETALL_FAILURE:
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
        case placeConstants.GETBYID_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case placeConstants.GETBYID_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case placeConstants.GETBYID_FAILURE:
            return {
                loading: false,
                error: action.error,
                data: null,
            };
        default:
            return state;
    }
}

export function place(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
                current: current(state.current, action),
            };
    }
}
