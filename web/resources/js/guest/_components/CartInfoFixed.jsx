import React from 'react';
import { useSelector } from 'react-redux';

import { routes, t, fMoney } from '../_helpers';
import { Link } from '../_components/Link';

function CartInfoFixed() {
    const placeCurrent = useSelector(state => state.place.current);
    const cartPlaces = useSelector(state => state.cart.places);

    if (!placeCurrent.data) {
        return null;
    }

    const cartPlaceCurrent = cartPlaces[placeCurrent.data.id];
    if (!cartPlaceCurrent) {
        return null;
    }

    let totalProducts = 0;
    let totalSum = 0;
    for (const productId in cartPlaceCurrent) {
        if (cartPlaceCurrent[productId] && cartPlaceCurrent[productId].qty) {
            totalProducts += 1;
            totalSum += cartPlaceCurrent[productId].qty * cartPlaceCurrent[productId].price;
        }
    }

    if (!totalProducts) {
        return null;
    }

    return (
        <div className="cart-info-fixed">
            <div className="global-wrapper fixed-bottom">
                <Link
                    to={routes.makeRoute('placeCart', [placeCurrent.data.slug])}
                    className="btn btn-block btn-lg btn-purple text-white rounded-pill d-flex justify-content-between"
                    >
                    <span>{totalProducts} {t('items')}</span>
                    <b>{t('В корзину')}</b>
                    <span>{fMoney(totalSum, placeCurrent.data.currency)}</span>
                </Link>
            </div>
        </div>
    );
}

export { CartInfoFixed };
