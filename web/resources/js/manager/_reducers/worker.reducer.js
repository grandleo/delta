import { workerConstants } from '../_constants';

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
        case workerConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case workerConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
            };
        case workerConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case workerConstants.SHOW_REQUEST:
            return {
                loading: true,
            };
        case workerConstants.SHOW_SUCCESS:
            return {
                data: action.payload.data,
                form: action.payload.form,
            };
        case workerConstants.SHOW_FAILURE:
            return {
                error: action.error,
            };

        case workerConstants.UPDATE_REQUEST:
            return {
                ...state,
                saving: true,
            };
        case workerConstants.UPDATE_SUCCESS:
            return {
                ...state,
                saving: false,
            };
        case workerConstants.UPDATE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.error,
            };

        default:
            return state;
    }
}

export function worker(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
                current: current(state.current, action),
            };
    }
}
