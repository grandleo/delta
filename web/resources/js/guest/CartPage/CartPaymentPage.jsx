import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { placeActions } from '../_actions';
import { Header } from '../_components';

function CartPaymentPage() {
    const { placeSlug } = useParams();
    const user = useSelector(state => state.authentication.user);
    const placeCurrent = useSelector(state => state.place.current);
    const cartCheckout = useSelector(state => state.cart.checkout);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push(routes.makeRoute('placeCartCheckout', [placeSlug]));
        }
        if (!cartCheckout.data) {
            history.push(routes.makeRoute('place', [placeSlug]));
        }
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug));
        } else if (placeCurrent.data && placeCurrent.data.id !== cartCheckout.data.place_id) {
            history.push(routes.makeRoute('place', [placeSlug]));
        }
    }, [placeCurrent.data]);

    function handleClickPay(e) {
        e.preventDefault();
        //
    }

    return (
        <div className="home-page">
            <Header
                routeBack={routes.makeRoute('place', [placeCurrent.data ? placeCurrent.data.slug : ''])}
                headingTop={placeCurrent.data ? placeCurrent.data.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
                />
            <div className="content-wrapper">
                <div className="">
                    <h2>{t(`Вы авторизованы как ${user.name} (email: ${user.email}).`)}</h2>
                </div>

                <div className="text-center mt-5">
                    <h3 className="h5 line-height-1 font-weight-600">{`${t('Заказ')} №${cartCheckout.data.id}`}</h3>
                    <p className="h5 line-height-1 font-weight-normal">{t('ожидает оплаты')}</p>
                </div>

                <div className="mt-5 mb-3 mx-4">
                    <button
                        className="btn btn-block btn-lg btn-success btn-inset-border text-white rounded-pill d-flex justify-content-between"
                        onClick={handleClickPay}
                        >
                        <b>{t('Оплатить онлайн')}</b>
                        <span>{fMoney(cartCheckout.data.amount, cartCheckout.data.currency)}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export { CartPaymentPage };
