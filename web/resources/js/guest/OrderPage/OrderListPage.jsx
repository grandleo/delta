import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { orderActions } from '../_actions';
import { Header, NavScroller, LoadingCommon } from '../_components';

function OrderListItem({ order }) {
    return (
        <div
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
                <span
                    className={'badge badge-primary px-2 py-1 font-weight-500 badge-' + order.orderStatus_color}
                    >
                    {order.orderStatus_name || t('Ожидает обработки')}
                </span>
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
    );
}

function OrderListPage() {
    const [orderStatusPhaseId, setOrderStatusPhaseId] = useState(0);
    const ordersAll = useSelector(state => state.order.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderActions.getAll());
    }, []);

    useEffect(() => {
        if (!orderStatusPhaseId && ordersAll.orderStatusPhases) {
            setOrderStatusPhaseId(ordersAll.orderStatusPhases[0].id);
        }
    }, [ordersAll.orderStatusPhases]);

    function handleClickNavItem(id, e) {
        e.preventDefault();
        setOrderStatusPhaseId(id);
    }

    return (
        <div className="home-page">
            <Header
                routeBack={routes.home}
                headingTop={t('Все заказы')}
                />
            <NavScroller>
                {ordersAll.orderStatusPhases && ordersAll.orderStatusPhases.map((item) => (
                    <a href="#"
                        key={item.id}
                        className={'nav-link '+ (item.id == orderStatusPhaseId ? 'active text-'+item.color : '')}
                        onClick={handleClickNavItem.bind(this, item.id)}
                        >{item.name+(item.orders_count ? ` (${item.orders_count})` : '')}</a>
                ))}
            </NavScroller>
            <div className="content-wrapper">
                {ordersAll.loading && <LoadingCommon />}
                {ordersAll.error && <span className="text-danger">{t('Ошибка')}: {ordersAll.error}</span>}
                {ordersAll.data && (ordersAll.data.length ?
                    <div className="">
                        {ordersAll.data
                            .filter((v) => (v.orderStatus_phase_id == orderStatusPhaseId))
                            .map((order) =>
                            <OrderListItem key={order.id} order={order} />
                        )}
                    </div>
                    :
                    <Fragment>
                        <span className="text-primary">{t('Здесь пока ничего нет.')}</span>
                        <div className="mt-5 text-center">
                            <Link
                                to={routes.home}
                                className="btn btn-lg btn-success text-white rounded-pill"
                                >
                                {t('Оформить первый заказ!')}
                            </Link>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export { OrderListPage };
