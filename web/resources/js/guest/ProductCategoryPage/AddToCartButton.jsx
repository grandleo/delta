import React from 'react';

function AddToCartButton({ placeId, productId }) {

    function handleClick(e) {
        e.preventDefault();
        console.log('placeId, productId', placeId, productId);
    }

    return (
        <a href="#" className="btn-product-add btn-danger" onClick={handleClick}>
            <img src="/images/icon/plus.svg" alt="icon" />
        </a>
    );
}

export { AddToCartButton };
