import { cartConstants } from '../_constants';
import { cartService } from '../_services';

export const cartActions = {
    addToCart,
    paramsChange,
    getCurrent,
};

function addToCart(placeId, productId, price, changeQty) {
    return { type: cartConstants.ADD_ITEM, placeId, productId, price, changeQty };
}

function paramsChange(name, value) {
    return { type: cartConstants.PARAMS_CHANGE, name, value };
}

function getCurrent(placeId, productIds) {
    return dispatch => {
        dispatch(request());

        cartService.getCurrent(placeId, productIds)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: cartConstants.GETBYID_REQUEST } }
    function success(payload) { return { type: cartConstants.GETBYID_SUCCESS, payload } }
    function failure(error) { return { type: cartConstants.GETBYID_FAILURE, error } }
}


/*
import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
*/
