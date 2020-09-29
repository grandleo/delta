import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { placeActions, cartActions } from '../_actions';
import { Header, NavScroller } from '../_components';

function CartCheckoutPage() {
    const { placeSlug } = useParams();
    const user = useSelector(state => state.authentication.user);
    const placeCurrent = useSelector(state => state.place.current);
    const cartCheckout = useSelector(state => state.cart.checkout);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!cartCheckout.data) {
            history.push(routes.makeRoute('place', [placeSlug]));
        }
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug));
        } else if (placeCurrent.data && placeCurrent.data.id !== cartCheckout.data.place_id) {
            history.push(routes.makeRoute('place', [placeSlug]));
        }
        if (cartCheckout.data && placeCurrent.data.id !== cartCheckout.data.place_id && user) {
            setTimeout(() => {
                history.push(routes.makeRoute('placeCartPayment', [placeSlug]));
            }, 1000);
        }
    }, [placeCurrent.data]);

    return (
        <div className="home-page">
            <Header
                routeBack={routes.makeRoute('place', [placeCurrent.data ? placeCurrent.data.slug : ''])}
                headingTop={placeCurrent.data ? placeCurrent.data.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
                />
            <div className="content-wrapper">
                <div
                    className="card-cart-checkout-person d-flex mx-auto mt-5 align-items-center justify-content-center"
                    >
                    <img src="/images/checkout-person.svg" className="img-free" alt="icon" />
                </div>

                {cartCheckout.data &&
                    <div className="text-center mt-5">
                        <h3 className="h5 line-height-1 font-weight-600">{`${t('Заказ')} №${cartCheckout.data.id}`}</h3>
                        <p className="h5 line-height-1 font-weight-normal">{t('успешно оформлен')}</p>
                    </div>
                }

                {!user &&
                    <div className="mt-5 mb-3 mx-4">
                        <Link
                            className="btn btn-lg btn-success btn-block rounded-pill text-white"
                            to={routes.login}
                            >
                            {t('Войти и оплатить')}
                        </Link>
                        <Link
                            className="btn btn-lg btn-light btn-block rounded-pill"
                            to={routes.register}
                            >
                            {t('Создать аккаунт')}
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

export { CartCheckoutPage };
