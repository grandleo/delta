import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { Header, NavScroller, LoadingCommon } from '../_components';
import { orderService } from '../_services';
import { orderActions, userActions } from '../_actions';

const productDisplayLimit = 2;

const SortableItem = ({value}) => {
    const history = useHistory();

    function handleClickTakeOrder(id, e) {
        orderService.takeOrder(id)
            .then((response) => {
                history.push(routes.makeRoute('orderEdit', [id]));
            });
    }

    return (
        <div className="mb-4 pt-2 px-3 pb-3 bg-white rounded-065rem">
            <div className="text-right">
                <span
                    className={'badge badge-primary px-2 py-1 font-weight-500 badge-' + value.orderStatus_color}
                    >
                    {value.orderStatus_name || t('Ожидает обработки')}
                </span>
            </div>
            <div className="mt-2">
                <h5 className="h5 font-weight-600 line-height-1">
                    <b>{value.table_name}</b> / {t('Заказ')} #{value.id}
                </h5>
                <p className="m-0 small">{t('создан')+' '+value.created_at}</p>
            </div>
            <div className="mt-1">
                {t('Гость №')+value.guest_id} /
                {t('Персон:')} <span className="font-weight-500">{value.cutlery_qty}</span> /
                {t('Чат:')} <span className="font-weight-500">{value.messages_count}</span>
            </div>
            <div className="mt-1">
                {t('Официант: ')} <span className="font-weight-600">{value.worker_name}</span>
            </div>
            <hr className="my-2" />
            <div className="mt-3">
                {value.orderProducts.slice(0, productDisplayLimit).map((orderProduct) =>
                    <div
                        key={orderProduct.id}
                        className="d-flex justify-content-between"
                        >
                        <span className="mr-3 text-nowrap font-weight-500">{orderProduct.qty} x</span>
                        <span className="font-weight-500">{orderProduct.name}</span>
                        <small className="ml-auto">{fMoney(orderProduct.price * orderProduct.qty, value.currency)}</small>
                    </div>
                )}
                {value.orderProducts.length > productDisplayLimit &&
                    <div className="text-center small">
                        {t('и ещё')+' '+(value.orderProducts.length-productDisplayLimit)+t(' других')}
                    </div>
                }
            </div>
            <div className="mt-2 text-right">
                <b>{t('Итого:')} {fMoney(value.amount, value.currency)}</b>
            </div>
            <hr className="mt-2" />
            <div className="text-center">
                {value.worker_id ?
                    <Link
                        to={routes.makeRoute('orderEdit', [value.id])}
                        className="btn btn-light px-5"
                        >{t('Перейти к заказу')}</Link>
                    :
                    <button
                        onClick={handleClickTakeOrder.bind(this, value.id)}
                        className="btn btn-success px-5 text-white rounded-pill"
                        >{t('Принять')}</button>
                }
            </div>
        </div>
    );
};

const SortableList = ({items, disabled}) => {
    return (
        <div className="card-manager-product-category">
            {items.map((value, index) => (
                <SortableItem key={value.id} index={index} disabled={disabled} value={value} />
            ))}
        </div>
    );
};

function OrderPage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [filterMode, setFilterMode] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const orderAll = useSelector(state => state.order.all);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = {
            date: orderAll.filter.date,
        };
        dispatch(orderActions.index(params));
    }, [orderAll.filter.date]);

    useEffect(() => {
        if ((!orderAll.filter.orderStatusPhaseId)
            && orderAll.orderStatusPhases && orderAll.orderStatusPhases.length) {
            dispatch(orderActions.indexFilterSet({
                orderStatusPhaseId: orderAll.orderStatusPhases[0].id,
            }));
        }
    }, [orderAll.orderStatusPhases]);

    useEffect(() => {
        if (!orderAll.data) {
            return;
        }
        setItems((items) => [...orderAll.data]);
    }, [orderAll.data]);

    function getFilteredItems() {
        let _items = orderAll.filter.orderStatusPhaseId
            ? items.filter((v) => {
                return v.orderStatus_phase_id == orderAll.filter.orderStatusPhaseId
            })
            : items;
        if (!filterMode || !filter.search) {
            return _items;
        }
        return _items.filter((v) => {
            return v.name.indexOf(filter.search) > -1;
        });
    }

    function handleFilterInputChange(e) {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? +e.target.checked : e.target.value;
        setFilter(filter => ({ ...filter, [name]: value }));
    }

    function handleFilterModeSwitch(e) {
        setFilterMode(filterMode => (!filterMode));
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

    function handleLogoutClick(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <div className="home-page">
            <Header
                headingTop={user.name_full}
                headingBottom={t('Официант')+' \u00A0 | \u00A0 '+user.place.name}
                routeBack={null}
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
                {orderAll.data &&
                    <Fragment>
                        {orderAll.data.length ?
                            <SortableList
                                items={getFilteredItems()}
                                />
                            : <span className="text-primary">{t('Заказов пока нет.')}</span>
                        }
                    </Fragment>
                }
                <div className="mt-5 text-center">
                    <a href="/" className="text-black-50">{t('Главная')}</a>
                </div>
                <div className="mt-4 text-center">
                    <button
                        className="btn btn-link text-black-50"
                        onClick={handleLogoutClick}
                        >
                        {t('Выйти')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export { OrderPage };
