import { cartConstants } from '../_constants';

const initialState = {
    places: {},
    // places: {
    //     placeId_1: {
    //         productId_1: { qty, price },
    //         productId_2: { qty, price },
    //     }
    // }
    current: {
        loading: false,
        error: false,
        data: null,
        params: {
            cutlery_qty: 1,
        },
    },
    checkout: {
        loading: false,
        error: false,
        data: null,
    },
};

function placeProducts(state = {}, action) {
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            const { productId, changeQty, price } = action;
            return {
                ...state,
                [productId]: {
                    qty: Math.max((state[productId] ? state[productId].qty : 0) + changeQty, 0),
                    price,
                },
            };
        default:
            return state;
    }
}

function places(state = initialState.places, action) {
    const { placeId } = action;
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            return {
                ...state,
                [placeId]: placeProducts(state[placeId], action),
            };

        case cartConstants.CHECKOUT_CLEAR:
            return {
                ...state,
                [placeId]: {},
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case cartConstants.GETBYID_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                data: null,
            };
        case cartConstants.GETBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case cartConstants.GETBYID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: null,
            };

        case cartConstants.PARAMS_CHANGE:
            const { name, value } = action;
            return {
                ...state,
                params: { ...state.params, [name]: value },
            };

        default:
            return state;
    }
}

function checkout(state = initialState.checkout, action) {
    switch (action.type) {
        case cartConstants.CHECKOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                data: null,
            };
        case cartConstants.CHECKOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case cartConstants.CHECKOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: null,
            };

        case cartConstants.CHECKOUT_SETGUESTID_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
            };

        case cartConstants.CHECKOUT_CLEAR:
            return initialState.checkout;

        default:
            return state;
    }
}

export function cart(state = {}, action) {
    switch (action.type) {
        default:
            return {
                places: places(state.places, action),
                current: current(state.current, action),
                checkout: checkout(state.checkout, action),
            };
    }
}
