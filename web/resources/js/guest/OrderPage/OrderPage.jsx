import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { orderActions } from '../_actions';
import { Header, LoadingCommon } from '../_components';

function OrderPage() {
    const { orderId } = useParams();
    const orderCurrent = useSelector(state => state.order.current);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!orderCurrent.data || orderCurrent.data.id !== orderId) {
            dispatch(orderActions.getById(orderId));
        }
    }, []);

    return (
        <div className="home-page">
            <Header
                routeBack={routes.orders}
                headingTop={t('Заказ')+' #'+orderId}
                />
            <div className="pt-4">
                {orderCurrent.loading && <LoadingCommon />}
                {orderCurrent.error && <span className="text-danger">{t('Ошибка')}: {orderCurrent.error}</span>}
                {orderCurrent.data &&
                    <div className="px-3 py-4 bg-white rounded-xl">
                        <div className="d-flex justify-content-between align-items-start">
                            <h2 className="h4 font-weight-bold line-height-1">{t('Заказ')} #{orderCurrent.data.id}</h2>
                            <span className="badge badge-warning text-white px-2 py-1 font-weight-500">{t('Обрабатывается')}</span>
                        </div>
                        <div className="mt-2">
                            {orderCurrent.data.orderProducts.map((orderProduct) =>
                                <div
                                    key={orderProduct.id}
                                    className="d-flex justify-content-between"
                                    >
                                    <span className="mr-3 text-nowrap font-weight-500">{orderProduct.qty} x</span>
                                    <span className="font-weight-500">{orderProduct.name}</span>
                                    <small className="ml-auto">{fMoney(orderProduct.price * orderProduct.qty, orderCurrent.data.currency)}</small>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 text-right">
                            <b>{t('Итого:')} {fMoney(orderCurrent.data.amount, orderCurrent.data.currency)}</b>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export { OrderPage };
