import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {t, fMoney, routes, fetchClient} from '../_helpers';
import { placeActions, cartActions, paymentActions } from '../_actions';
import { Header } from '../_components';

function CartPaymentPage() {
    const { placeSlug } = useParams();
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const placeCurrent = useSelector(state => state.place.current);
    const cartPlacesTableId = useSelector(state => state.cart.placesTableId);
    const cartCheckout = useSelector(state => state.cart.checkout);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let searchParams =  new URLSearchParams(window.location.search);
        if (searchParams.get('success-payment') == 'true') {
            setCompleted(true)
            setTimeout(() => {
                const orderId = cartCheckout.data.id;
                dispatch(cartActions.checkoutClear(cartCheckout.data.place_id));
                history.push(routes.makeRoute('order', [orderId]));
            }, 3000)
        }

        if (!user) {
            history.push(routes.makeRoute('placeCartCheckout', [placeSlug]));
            return;
        }
        if (!cartCheckout.data) {
            history.push(routes.makeRoute('place', [placeSlug]));
            return;
        }
        if (cartCheckout.data && user &&
            cartCheckout.data.guest_id && cartCheckout.data.guest_id !== user.id) {
            dispatch(cartActions.checkoutClear(cartCheckout.data.place_id));
            history.push(routes.makeRoute('place', [placeSlug]));
            return;
        }
        if (cartCheckout.data && !cartCheckout.data.guest_id) {
            dispatch(cartActions.checkoutSetGuestId(cartCheckout.data.id));
        }
    }, []);

    useEffect(() => {
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug, {table_id: cartPlacesTableId[placeSlug]}));
        } else if (placeCurrent.data && placeCurrent.data.id !== cartCheckout.data.place_id) {
            history.push(routes.makeRoute('place', [placeSlug]));
        }
    }, [placeCurrent.data]);

    function handleClickPay(e) {
        e.preventDefault();
        setProcessing(true);
        const orderId = cartCheckout.data.id;
        const requestOptions = {
            url: 'payment/init/' + orderId,
        };
        return fetchClient()(requestOptions).then(res => {
            if(res.data.data && res.data.data.Success) {
                window.location.href = res.data.data.PaymentURL;
            }
        });
    }

    function handleClickCancel(e) {
        e.preventDefault();

        dispatch(cartActions.checkoutClear(cartCheckout.data.place_id));
        history.push(routes.makeRoute('place', [placeSlug]));
    }

    return (
        <div className="home-page">
            <Header
                routeBack={routes.makeRoute('place', [placeCurrent.data ? placeCurrent.data.slug : ''])}
                />
            {cartCheckout.data &&
                <div className="content-wrapper">
                    <div>
                        <p className="h5">{t('Вы авторизованы как')}</p>
                        <h4>{user.name_full}</h4>
                    </div>

                    <div className="text-center mt-5">
                        <h3 className="h5 line-height-1 font-weight-600">{`${t('Заказ')} №${cartCheckout.data.id}`}</h3>
                        <p className="h5 line-height-1 font-weight-normal">{t('ожидает оплаты')}</p>
                    </div>

                    {!completed && cartCheckout.data &&
                        <div className="mt-5 mb-3 mx-4">
                            <button
                                className="btn btn-block btn-lg btn-success btn-inset-border text-white rounded-pill d-flex justify-content-between"
                                onClick={handleClickPay}
                                disabled={!cartCheckout.data.guest_id || processing}
                                >
                                <b>{t('Оплатить онлайн')}</b>
                                {!processing && <span>{fMoney(cartCheckout.data.amount, cartCheckout.data.currency)}</span>}
                                {processing && <span className="spinner-border spinner-border-sm ml-1 mt-1"></span>}
                            </button>
                            <button
                                className="d-block btn btn-link text-black-50 mx-auto mt-5"
                                onClick={handleClickCancel}
                                disabled={!cartCheckout.data.guest_id || processing}
                                >
                                {t('отменить заказ')}
                            </button>
                        </div>
                    }
                    {completed &&
                        <div className="mt-5 mb-3 text-success text-center">
                            <h3>
                                {t('Оплата прошла успешно!')}
                            </h3>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export { CartPaymentPage };
