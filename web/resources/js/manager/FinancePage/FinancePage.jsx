import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { Header, LoadingCommon } from '../_components';
import { financeActions } from '../_actions';

const SortableItem = ({value}) => {
    const user = useSelector(state => state.authentication.user);

    return (
        <div className="card-manager-product-category rounded-065rem bg-light mb-3 shadow-btn-3 text-primary p-3">
            <div className="">
                <h5>{value.title}</h5>
                <div>{t('Кол-во:')+' '+value.count}</div>
                <div>{t('Всего заказов на:')+' '+fMoney(value.amount, user.place.currency)}</div>
                <div>{t('Средний чек:')+' '+fMoney((value.amount / value.count) || 0, user.place.currency)}</div>
                <div>{t('Даты:')+' '+(value.dates.join(' - '))}</div>
            </div>
        </div>
    );
};

const SortableList = ({items, disabled}) => {
    return (
        <div className="card-manager-product-category">
            {items.map((value, index) => (
                <SortableItem key={value.title} index={index} disabled={disabled} value={value} />
            ))}
        </div>
    );
};

function FinancePage() {
    const financeAll = useSelector(state => state.finance.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(financeActions.index());
    }, []);

    return (
        <div className="home-page">
            <Header
                headingTop={t('Финансы')}
                routeBack={routes.home}
                />
            <div className="content-wrapper">
                {financeAll.loading && <LoadingCommon />}
                {financeAll.data && financeAll.data.length !== 0 &&
                    <Fragment>
                        <SortableList
                            items={financeAll.data}
                            />
                    </Fragment>
                }
            </div>
        </div>
    );
}

export { FinancePage };
