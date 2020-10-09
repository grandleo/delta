import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { Header, ListSubheader, LoadingCommon } from '../_components';
import { guestActions } from '../_actions';

const SortableItem = ({value}) => {
    const user = useSelector(state => state.authentication.user);

    return (
        <div className="card-manager-product-category d-flex align-items-center rounded-065rem bg-light btn-block mb-3 shadow-btn-3 text-primary py-3 px-2">
            <div className="img-free-holder ml-2 mr-3 align-self-start rounded-circle bg-white">
                {value.image && <img src={fileSrc(value.image)} alt="image" className="img-fluid rounded-circle" />}
            </div>
            <div className="">
                <h5 className="h5">
                    {t('№')+value.id} - {value.name_full}
                </h5>
                <div>{t('Средний чек:')+' '+fMoney(value.orders_amount_avg, user.place.currency)}</div>
                <div>{t('Последний заказ:')+' '+value.orders_last_at}</div>
                <div>{t('Всего заказов:')+' '+value.orders_count}</div>
                <div>{t('Всего заказов на:')+' '+fMoney(value.orders_amount_sum, user.place.currency)}</div>
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

function GuestPage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [filterMode, setFilterMode] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const guestAll = useSelector(state => state.guest.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guestActions.index());
    }, []);

    useEffect(() => {
        if (!guestAll.data) {
            return;
        }
        setItems((items) => [...guestAll.data]);
    }, [guestAll.data]);

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
                headingTop={t('Клиенты')}
                routeBack={routes.home}
                />
            <div className="content-wrapper">
                {guestAll.loading && <LoadingCommon />}
                {guestAll.data &&
                    <Fragment>
                        {guestAll.data.length ?
                            <SortableList
                                items={getFilteredItems()}
                                />
                            : <span className="text-primary">{t('Клиентов пока нет.')}</span>
                        }
                    </Fragment>
                }
            </div>
        </div>
    );
}

export { GuestPage };
