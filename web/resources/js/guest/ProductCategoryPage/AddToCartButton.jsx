import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cartActions } from '../_actions';

function AddToCartButton({ placeId, productId, productPrice }) {
    const cartPlaces = useSelector(state => state.cart.places);
    const dispatch = useDispatch();

    const qtyInCart = placeId && productId && cartPlaces
            && cartPlaces[placeId] && cartPlaces[placeId][productId]
        ? cartPlaces[placeId][productId].qty
        : 0;

    function handleClick(e) {
        e.preventDefault();
        dispatch(cartActions.addToCart(placeId, productId, productPrice, 1));
    }

    if (qtyInCart) {
        return (
            <button className="btn btn-product-add btn-success" onClick={handleClick}>
                <img src="/images/icon/mark.svg" alt="icon" />
            </button>
        );
    }

    return (
        <button className="btn btn-product-add btn-danger" onClick={handleClick}>
            <img src="/images/icon/plus.svg" alt="icon" />
        </button>
    );
}

export { AddToCartButton };
