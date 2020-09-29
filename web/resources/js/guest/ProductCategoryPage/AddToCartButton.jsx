import React from 'react';
import { useDispatch } from 'react-redux';

import { cartActions } from '../_actions';

function AddToCartButton({ placeId, productId, productPrice }) {
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(cartActions.addToCart(placeId, productId, productPrice, 1));
    }

    return (
        <button className="btn btn-product-add btn-danger" onClick={handleClick}>
            <img src="/images/icon/plus.svg" alt="icon" />
        </button>
    );
}

export { AddToCartButton };
