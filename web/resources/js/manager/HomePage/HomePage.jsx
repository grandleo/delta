import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { Header } from '../_components';
import { userActions } from '../_actions';

const links = [
    {to: routes.orderList, icon: 'orders.svg', text: t('Заказы')},
    {to: routes.finances, icon: 'dollar-sign.svg', text: t('Финансы')},
    {to: routes.tableList, icon: 'tables.svg', text: t('Столы')},
    {to: routes.prodCatList, icon: 'menu.svg', text: t('Меню')},
    {to: routes.workerList, icon: 'users.svg', text: t('Официанты')},
    {to: routes.guestList, icon: 'users.svg', text: t('Клиенты')},
    {to: routes.settings, icon: 'settings.svg', text: t('Настройки заведения')},
];

function HomePage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    function handleLogoutClick(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <div className="home-page">
            <Header
                headingTop={user.name_full}
                headingBottom={t('Менеджер')+' \u00A0 | \u00A0 '+user.place.name}
                routeBack={null}
                />
            <div className="content-wrapper">
                <div className="">
                    {links.map(link =>
                        <Link key={link.to} to={link.to} className="btn btn-xlg btn-light btn-block mb-3 text-left shadow-btn-3 text-primary">
                            <img className="mr-2" src={`/images/icon/${link.icon}`} alt="icon" />
                            {link.text}
                        </Link>
                    )}
                </div>
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

export { HomePage };
