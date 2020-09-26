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
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            const { placeId } = action;
            return {
                ...state,
                [placeId]: placeProducts(state[placeId], action),
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

export function cart(state = {}, action) {
    switch (action.type) {
        default:
            return {
                places: places(state.places, action),
                current: current(state.current, action),
            };
    }
}

/*
import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
*/
