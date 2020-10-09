import { productConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        saving: false,
        error: false,
        data: null,
        productCategory: null,
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
        case productConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case productConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
                productCategory: action.payload.productCategory,
            };
        case productConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case productConstants.SHOW_REQUEST:
            return {
                loading: true,
            };
        case productConstants.SHOW_SUCCESS:
            return {
                data: action.payload.data,
                form: action.payload.form,
            };
        case productConstants.SHOW_FAILURE:
            return {
                error: action.error,
            };

        case productConstants.UPDATE_REQUEST:
            return {
                ...state,
                saving: true,
            };
        case productConstants.UPDATE_SUCCESS:
            return {
                ...state,
                saving: false,
            };
        case productConstants.UPDATE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.error,
            };

        default:
            return state;
    }
}

export function product(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
                current: current(state.current, action),
            };
    }
}
