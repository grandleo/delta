import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { orderActions } from '../_actions';
import { Link, Header, NavScroller, LoadingCommon } from '../_components';

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
                </div>
                <span
                    className={'badge badge-primary px-2 py-1 font-weight-500 badge-' + order.orderStatus_color}
                    >
                    {order.orderStatus_name || t('Ожидает обработки')}
                </span>
            </div>
            <small>{t('создан')+' '+order.created_at}</small>
            <div className="mt-1">
                {(order.table_name || order.worker_name) &&
                    <Fragment>
                        {order.table_name ? order.table_name + ' / ' : ''}
                        {order.worker_name ? t('Официант: ')+' '+order.worker_name+' / ' : ''}
                    </Fragment>
                }
                <img
                    src="/images/icon/messages.svg"
                    title={t('Кол-во сообщений')}
                    alt="img"
                    className="mr-2"
                    style={{height: 16,opacity: 0.7}}
                    />
                {order.messages_count}
            </div>
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
        const params = {
            date: orderAll.filter.date,
        };
        dispatch(orderActions.getAll(params));
    }, [orderAll.filter.date]);

    useEffect(() => {
        if ((!orderAll.filter.orderStatusPhaseId)
            && orderAll.orderStatusPhases && orderAll.orderStatusPhases.length) {
            dispatch(orderActions.indexFilterSet({
                orderStatusPhaseId: orderAll.orderStatusPhases[0].id,
            }));
        }
    }, [orderAll.orderStatusPhases]);

    function getFilteredItems(items) {
        let _items = orderAll.filter.orderStatusPhaseId
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

    function handleChangeDate(e) {
        const { name } = e.target;
        const value = e.target.value;
        dispatch(orderActions.indexFilterSet({
            date: value,
        }));
    }

    return (
        <div className="home-page">
            <Header
                routeBack={routes.profile}
                headingTop={t('Все заказы')}
                />
            <NavScroller>
                {orderAll.orderStatusPhases && orderAll.orderStatusPhases.map((item) => (
                    <a href="#"
                        key={item.id}
                        className={'nav-link '+ (item.id == orderAll.filter.orderStatusPhaseId ? 'active text-'+item.color : '')}
                        onClick={handleClickNavItem.bind(this, item.id)}
                        >{item.name+(item.orders_count ? ` (${item.orders_count})` : '')}</a>
                ))}
            </NavScroller>
            <div className="content-wrapper">
                <div className="form-group form-label-group">
                    <input
                        id="current-form.date"
                        type="date"
                        name="date"
                        placeholder={t('Дата')}
                        value={orderAll.filter.date}
                        onChange={handleChangeDate}
                        className="form-control"
                        />
                    <label htmlFor="current-form.date">{t('Дата')}</label>
                </div>
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
