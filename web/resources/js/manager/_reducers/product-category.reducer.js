import { productCategoryConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        saving: false,
        error: false,
        data: null,
    },
    current: {
        loading: false,
        saving: false,
        error: false,
        data: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case productCategoryConstants.INDEX_REQUEST:
            return {
                loading: true,
            };
        case productCategoryConstants.INDEX_SUCCESS:
            return {
                data: action.payload.data,
            };
        case productCategoryConstants.INDEX_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case productCategoryConstants.SHOW_REQUEST:
            return {
                loading: true,
            };
        case productCategoryConstants.SHOW_SUCCESS:
            return {
                data: action.payload.data,
            };
        case productCategoryConstants.SHOW_FAILURE:
            return {
                error: action.error,
            };

        case productCategoryConstants.UPDATE_REQUEST:
            return {
                ...state,
                saving: true,
            };
        case productCategoryConstants.UPDATE_SUCCESS:
            return {
                ...state,
                saving: false,
            };
        case productCategoryConstants.UPDATE_FAILURE:
            return {
                ...state,
                saving: false,
                error: action.error,
            };

        default:
            return state;
    }
}

export function productCategory(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
                current: current(state.current, action),
            };
    }
}
