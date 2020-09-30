import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { orderActions } from '../_actions';
import { Header } from '../_components';

function OrderListPage() {
    const ordersAll = useSelector(state => state.order.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderActions.getAll());
    }, []);

    return (
        <div className="home-page">
            <Header
                routeBack={routes.home}
                headingTop={t('Все заказы')}
                />
            <div className="content-wrapper">
                {ordersAll.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {ordersAll.error && <span className="text-danger">{t('Ошибка')}: {ordersAll.error}</span>}
                {ordersAll.data &&
                    <div className="">
                        {ordersAll.data.map((order) =>
                            <div
                                key={order.id}
                                className="mb-4 px-4 py-4 bg-white rounded-xl"
                                >
                                <div className="font-weight-500">
                                    <span className="mr-1 text-black-50">{order.placeCategory_name}:</span> {order.place_name}
                                </div>
                                <div className="mt-3 d-flex justify-content-between align-items-start">
                                    <div>
                                        <Link
                                            to={routes.makeRoute('order', [order.id])}
                                            className="h5 font-weight-600 line-height-1"
                                            >
                                            {t('Заказ')} #{order.id}
                                        </Link>
                                        <p className="m-0 small">{t('создан')+' '+order.created_at}</p>
                                    </div>
                                    <span className="badge badge-warning text-white px-2 py-1 font-weight-500">{t('Обрабатывается')}</span>
                                </div>
                                <div className="mt-3">
                                    {order.orderProducts.map((orderProduct) =>
                                        <div
                                            key={orderProduct.id}
                                            className="d-flex justify-content-between"
                                            >
                                            <span className="mr-3 text-nowrap font-weight-500">{orderProduct.qty} x</span>
                                            <span className="font-weight-500">{orderProduct.name}</span>
                                            <small className="ml-auto">{fMoney(orderProduct.price * orderProduct.qty, order.currency)}</small>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 text-right">
                                    <b>{t('Итого:')} {fMoney(order.amount, order.currency)}</b>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export { OrderListPage };
