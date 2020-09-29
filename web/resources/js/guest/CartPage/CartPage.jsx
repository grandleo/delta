import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes, store } from '../_helpers';
import { placeActions, cartActions } from '../_actions';
import { Header, NavScroller } from '../_components';
import { QtyChanger } from './QtyChanger';

function CartPage() {
    const { placeSlug } = useParams();
    const placeCurrent = useSelector(state => state.place.current);
    const cartCurrent = useSelector(state => state.cart.current);
    const cartCheckout = useSelector(state => state.cart.checkout);
    const cartPlaces = useSelector(state => state.cart.places);
    const dispatch = useDispatch();
    const history = useHistory();

    const placeId = placeCurrent.data ? placeCurrent.data.id : null;
    const tableId = null;
    const productIds = [];

    let totalProducts = 0;
    let totalSum = 0;

    const cartPlaceCurrent = placeId ? cartPlaces[placeId] : null;
    if (cartPlaceCurrent) {
        for (const productId in cartPlaceCurrent) {
            if (cartPlaceCurrent[productId] && cartPlaceCurrent[productId].qty) {
                productIds.push(productId);
                totalProducts += 1;
                totalSum += cartPlaceCurrent[productId].qty * cartPlaceCurrent[productId].price;
            }
        }
    }

    useEffect(() => {
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug));
        } else if (productIds.length) {
            dispatch(cartActions.getCurrent(placeId, productIds));
        }
    }, [placeCurrent.data]);

    function handleClickCheckout(e) {
        e.preventDefault();
        const products = productIds.map((productId) => ({
            id: +productId,
            qty: cartPlaceCurrent[productId].qty,
        }));
        dispatch(cartActions.checkout(placeId, tableId, products, cartCurrent.params))
            .then(() => {
                if (store.getState().cart.checkout.data) {
                    history.push(routes.makeRoute('placeCartCheckout', [placeSlug]));
                }
            });
    }

    return (
        <div className="home-page bg-light-1">
            <Header
                routeBack={routes.makeRoute('place', [placeCurrent.data ? placeCurrent.data.slug : ''])}
                headingTop={placeCurrent.data ? placeCurrent.data.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
                />
            <div className="content-wrapper">
                <h2 className="h5 d-block mb-4 font-weight-600 text-center text-primary">{t('Корзина')}</h2>

                {placeCurrent.data && !cartCurrent.data && totalProducts === 0 &&
                    <span className="text-primary">{t('Здесь пока ничего нет.')}</span>
                }

                {(cartCurrent.loading || cartCheckout.loading) &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {cartCurrent.error && <span className="text-danger">{t('Ошибка')}: {cartCurrent.error}</span>}
                {cartCheckout.error && <span className="d-block mb-3 text-danger">{t('Ошибка')}: {cartCheckout.error}</span>}
                {!cartCheckout.loading && cartPlaceCurrent && placeCurrent.data && cartCurrent.data && cartCurrent.data.length &&
                    <>
                        <h3 className="h5 mb-3">{`${t('Ваш заказ')} (${totalProducts})`}</h3>
                        <ul className="card-cart-product-list list-unstyled">
                            {cartCurrent.data.map((product) => cartPlaceCurrent[product.id] &&
                                <li
                                    key={product.id}
                                    className="media card-cart-product card-product"
                                    >
                                    <img
                                        src={product.image}
                                        className="card-img-top rounded-circle align-self-center mr-3"
                                        alt={product.name}
                                        />
                                    <div className="media-body pr-1">
                                        <h5 className="card-title mb-2 text-primary">{product.name}</h5>
                                        <p className="descr card-text mb-2">{product.descr_short}</p>
                                        <p className="card-text font-weight-600 line-height-1">
                                            {fMoney(product.price, placeCurrent.data.currency)}
                                            /
                                            {product.weight} гр.
                                        </p>
                                    </div>
                                    <QtyChanger
                                        qty={cartPlaceCurrent[product.id].qty}
                                        handleChange={(changeQty) => {
                                            dispatch(cartActions.addToCart(placeCurrent.data.id, product.id, product.price, changeQty));
                                        }}
                                    />
                                </li>
                            )}
                        </ul>

                        <h3 className="h5">{t('Приборы')}</h3>
                        <ul className="card-cart-product-list list-unstyled">
                            <li className="media card-cart-product card-product">
                                <div className="d-flex bg-light rounded-circle align-self-center justify-content-center mr-3">
                                    <img
                                        src="/images/icon/users.svg"
                                        alt="icon"
                                        />
                                </div>
                                <div className="media-body pr-1">
                                    <h5 className="card-title mt-3 mb-2 text-primary">{t('Кол-во персон')}</h5>
                                </div>
                                <QtyChanger
                                    qty={cartCurrent.params.cutlery_qty}
                                    handleChange={(changeQty) => {
                                        dispatch(cartActions.paramsChange('cutlery_qty', Math.max((cartCurrent.params.cutlery_qty + changeQty), 1)));
                                    }}
                                />
                            </li>
                        </ul>
                    </>
                }
            </div>
            {placeCurrent.data && totalSum > 0 &&
                <div className="cart-info-fixed">
                    <div className="global-wrapper fixed-bottom">
                        <button
                            className="btn btn-block btn-lg btn-success btn-inset-border text-white rounded-pill d-flex justify-content-between"
                            onClick={handleClickCheckout}
                            >
                            <b>{t('Оплатить онлайн')}</b>
                            <span>{fMoney(totalSum, placeCurrent.data.currency)}</span>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export { CartPage };
