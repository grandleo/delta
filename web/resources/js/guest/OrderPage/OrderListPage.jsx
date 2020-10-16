import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { orderActions } from '../_actions';
import { Header, NavScroller, LoadingCommon } from '../_components';

const productDisplayLimit = 4;

function OrderListItem({ order }) {
    return (
        <div
            className="mb-4 px-4 py-4 bg-white rounded-xl"
            >
            <div className="font-weight-500">
                <span className="mr-1 text-black-50">{order.placeCategory_name}:</span>
                <Link
                    to={routes.makeRoute('place', [order.place_slug])}
                    >{order.place_name}</Link>
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
            {(order.table_name || order.worker_name) &&
                <p className="m-0 mt-1">
                    {order.table_name ? order.table_name + ' / ' : ''}
                    {order.worker_name ? t('Официант: ')+' '+order.worker_name : ''}
                </p>
            }
            <p className="m-0 mt-1 small">{t('Кол-во сообщений: ')+' '+order.messages_count}</p>
            <hr />
            <div className="mt-3">
                {order.orderProducts.slice(0, productDisplayLimit).map((orderProduct) =>
                    <div
                        key={orderProduct.id}
                        className="d-flex justify-content-between"
                        >
                        <span className="mr-3 text-nowrap font-weight-500">{orderProduct.qty} x</span>
                        <span className="font-weight-500">{orderProduct.name}</span>
                        <small className="ml-auto">{fMoney(orderProduct.price * orderProduct.qty, order.currency)}</small>
                    </div>
                )}
                {order.orderProducts.length > productDisplayLimit &&
                    <div className="text-center small">
                        {t('и ещё')+' '+(order.orderProducts.length-productDisplayLimit)+t(' других')}
                    </div>
                }
            </div>
            <div className="mt-2 text-right">
                <b>{t('Итого:')} {fMoney(order.amount, order.currency)}</b>
            </div>
            <hr />
            <div className="mt-4 text-center">
                <Link
                    to={routes.makeRoute('order', [order.id])}
                    className="btn btn btn-light px-5"
                    >{t('Перейти к заказу')}</Link>
            </div>
        </div>
    );
}

function OrderListPage() {
    const orderAll = useSelector(state => state.order.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderActions.getAll());
    }, []);

    useEffect(() => {
        if ((!orderAll.filter || !orderAll.filter.orderStatusPhaseId)
            && orderAll.orderStatusPhases && orderAll.orderStatusPhases.length) {
            dispatch(orderActions.indexFilterSet({
                orderStatusPhaseId: orderAll.orderStatusPhases[0].id,
            }));
        }
    }, [orderAll.orderStatusPhases]);

    function getFilteredItems(items) {
        let _items = orderAll.filter && orderAll.filter.orderStatusPhaseId
            ? items.filter((v) => {
                return v.orderStatus_phase_id == orderAll.filter.orderStatusPhaseId
            })
            : items;
        return _items;
    }

    function handleClickNavItem(id, e) {
        e.preventDefault();
        dispatch(orderActions.indexFilterSet({
            orderStatusPhaseId: id,
        }));
    }

    return (
        <div className="home-page">
            <Header
                routeBack={routes.home}
                headingTop={t('Все заказы')}
                />
            <NavScroller>
                {orderAll.orderStatusPhases && orderAll.orderStatusPhases.map((item) => (
                    <a href="#"
                        key={item.id}
                        className={'nav-link '+ (orderAll.filter && item.id == orderAll.filter.orderStatusPhaseId ? 'active text-'+item.color : '')}
                        onClick={handleClickNavItem.bind(this, item.id)}
                        >{item.name+(item.orders_count ? ` (${item.orders_count})` : '')}</a>
                ))}
            </NavScroller>
            <div className="content-wrapper">
                {orderAll.loading && <LoadingCommon />}
                {orderAll.error && <span className="text-danger">{t('Ошибка')}: {orderAll.error}</span>}
                {orderAll.data && (orderAll.data.length ?
                    <div className="">
                        {getFilteredItems(orderAll.data).map((order) =>
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
