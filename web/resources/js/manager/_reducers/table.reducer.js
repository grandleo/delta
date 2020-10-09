import { tableConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
    },
    current: {
        loading: false,
        saving: false,
        error: false,
        data: null,
        form: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case tableConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case tableConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
            };
        case tableConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case tableConstants.SHOW_REQUEST:
            return {
                loading: true,
            };
        case tableConstants.SHOW_SUCCESS:
            return {
                data: action.payload.data,
                form: action.payload.form,
            };
        case tableConstants.SHOW_FAILURE:
            return {
                error: action.error,
            };

        case tableConstants.UPDATE_REQUEST:
            return {
                ...state,
                saving: true,
            };
        case tableConstants.UPDATE_SUCCESS:
            return {
                ...state,
                saving: false,
            };
        case tableConstants.UPDATE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.error,
            };

        default:
            return state;
    }
}

export function table(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
                current: current(state.current, action),
            };
    }
}
