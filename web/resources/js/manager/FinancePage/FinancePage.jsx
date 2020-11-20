import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, routes } from '../_helpers';
import { Header, LoadingCommon } from '../_components';
import {financeActions, tableActions} from '../_actions';
import {Link} from "react-router-dom";
import {tableService} from "../_services";

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

function handleDelete(id) {
    if (!confirm(t('Вы уверены что хотите удалить этот card?'))) return;
}

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
            <div className="content-wrapper finance-page">
                {financeAll.loading && <LoadingCommon />}
                {financeAll.data && financeAll.data.length !== 0 &&
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="finance-page__total-price-title">{t('Ваш баланс')}</p>
                        <p className="finance-page__total-price">15 002 Р</p>
                    </div>

                    <div className="col-6 finance-page__total-result">
                        <p className="finance-page__total-result__title">{t('Поступления')}</p>
                        <p className="d-flex">
                            <span className="finance-page__total-result__status">
                                <img src="/images/icon/arrow-top.svg" alt=""/>
                            </span>
                            <span className="finance-page__total-result__price ml-2">5 002 Р</span>
                        </p>
                    </div>
                    <div className="col-6 finance-page__total-result">
                        <p className="finance-page__total-result__title">{t('Выведено средств')}</p>
                        <p className="d-flex">
                            <span className="finance-page__total-result__status">
                                <img src="/images/icon/arrow-down.svg" alt=""/>
                            </span>
                            <span className="finance-page__total-result__price ml-2">5 002 Р</span>
                        </p>
                    </div>
                    <div className="col-12 text-center finance-page__see-all-statistics">
                        <a href="">{t('смотреть всю статистику')}</a>
                    </div>

                    <div className="col-12 text-center form-group mt-4">
                        <a className="shadow-btn-3 btn btn-lg btn-light btn-block rounded-pill"
                           href="/manager/register">запросить вывод средств</a>
                        <p className="finance-page__info">1 бесплатный вывод средств в неделю, далее по 50 Р за каждый новый запрос</p>
                    </div>

                    <div className="col-12 text-center finance-page__service-info">
                       <div className="d-flex bg-white finance-page__service-info__content">
                           <div className="w-100">
                               <p>Процент экваиринга</p>
                               <h5>5%</h5>
                           </div>
                           <div className="w-100">
                               <p>Процент сервиса</p>
                               <h5>5%</h5>
                           </div>
                       </div>
                    </div>
                    <div className="col-12 text-center finance-page__card-list">
                        <div className='finance-page__card-list__item'>
                            <div>
                                <p>Шаблон для вывода средств</p>
                            </div>
                            <div className="d-flex">
                                <div className="finance-page__card-list__item__info">
                                    <p className="finance-page__card-list__item__info__card-code">4747  .... ....  4747</p>
                                    <p className="finance-page__card-list__item__info__card-name">alexandra Smith</p>
                                </div>
                                <div className="ml-auto text-nowrap">
                                    <a
                                      className="btn btn-light btn-sm btn-sm-control mr-1"
                                    >
                                        <img src="/images/icon/pencil.svg" alt="edit" />
                                    </a>
                                    <button
                                      onClick={(e) => handleDelete()}
                                      className="btn btn-light btn-sm btn-sm-control"
                                    >
                                        <img src="/images/icon/trash.svg" alt="delete" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export { FinancePage };
