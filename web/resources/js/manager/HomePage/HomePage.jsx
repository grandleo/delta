import React from 'react';
import { Link } from 'react-router-dom';

import { t, routes } from '../_helpers';
import { Header } from '../_components';

const links = [
    {to: routes.orders, icon: 'orders.svg', text: t('Заказы')},
    {to: routes.finances, icon: 'dollar-sign.svg', text: t('Финансы')},
    {to: routes.rooms, icon: 'tables.svg', text: t('Столы')},
    {to: routes.menus, icon: 'menu.svg', text: t('Меню')},
    {to: routes.workers, icon: 'users.svg', text: t('Официанты')},
    {to: routes.guests, icon: 'users.svg', text: t('Клиенты')},
    {to: routes.settings, icon: 'settings.svg', text: t('Настройка заведения')},
];

function HomePage() {
    return (
        <div className="home-page">
            <Header
                headingTop="Казаков Евгений"
                headingBottom="Казачий курень   |   Администратор"
            />
            <div className="content-wrapper">
                {links.map(link =>
                    <Link key={link.to} to={link.to} className="btn btn-xlg btn-light btn-block mb-3 text-left shadow-btn-3 text-primary">
                        <img className="mr-2" src={`/images/icon/${link.icon}`} alt="icon" />
                        {link.text}
                    </Link>
                )}
                <div className="mt-5 text-center">
                    <a href="/" className="text-black-50">{t('Главная')}</a>
                </div>
            </div>
        </div>
    );
}

export { HomePage };
