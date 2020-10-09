import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { Header, ListSubheader, LoadingCommon } from '../_components';
import { orderActions } from '../_actions';

const SortableItem = ({value}) => {
    return (
        <div className="mb-4 px-3 py-3 bg-white rounded-065rem">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h5 className="h5 font-weight-600 line-height-1">
                        {t('Заказ')} #{value.id}
                    </h5>
                    <p className="m-0 small">{t('создан')+' '+value.created_at}</p>
                </div>
                <span className="badge badge-warning text-white px-2 py-1 font-weight-500">{t('Обрабатывается')}</span>
            </div>
            <div className="mt-1">
                <span className="font-weight-600 mr-2">{value.table_name}</span>
                {t('Гость: №')+value.guest_id}
            </div>
            <div className="mt-1">
                {t('Официант: ')} <span className="font-weight-600">{value.worker_name}</span>
            </div>
            <div className="mt-2 line-height-1 text-right">
                <big>{fMoney(value.amount, value.currency)}</big>
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
        dispatch(orderActions.index());
    }, []);

    useEffect(() => {
        if (!orderAll.data) {
            return;
        }
        setItems((items) => [...orderAll.data]);
    }, [orderAll.data]);

    function getFilteredItems() {
        if (!filterMode || !filter.search) {
            return items;
        }
        return items.filter((v) => {
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

    return (
        <div className="home-page">
            <Header
                headingTop={t('Заказы')}
                routeBack={routes.home}
                />
            <div className="content-wrapper">
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
            </div>
        </div>
    );
}

export { OrderPage };
