import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t, fileSrc, routes } from '../_helpers';
import { Header, Link } from '../_components';
import { userActions } from '../_actions';

function ProfilePage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const links = [
        {to: routes.home, icon: 'orders.svg', text: t('В меню ресторана')},
        {to: routes.orders, icon: 'orders.svg', text: t('Заказы')},
        {to: routes.profileCards, icon: 'dollar-sign.svg', text: t('Платежные карты')},
    ];

    function handleLogoutClick(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <div className="home-page">
            <Header
                routeBack={null}
                headingTop={t('Профиль')}
                />
            <div className="content-wrapper">
                <div className="mt-4 text-center">
                    <img
                        src={fileSrc(user.image)}
                        alt="profile picture"
                        className="shadow-btn-3 rounded-circle"
                        style={{width: '117px', height: '117px'}}
                        />
                    <h5 className="mt-3 font-weight-bold">{user.name}</h5>
                    <Link
                        to={routes.profile}
                        className="text-info"
                        >
                        {t('изменить')}
                    </Link>
                </div>

                <div className="mt-5 text-center">
                    {links.map(link =>
                        <Link key={link.to} to={link.to} className="btn btn-xlg btn-light btn-block mb-3 text-left shadow-btn-3 text-primary">
                            <img className="mr-2" src={`/images/icon/${link.icon}`} alt="icon" />
                            {link.text}
                        </Link>
                    )}
                </div>

                <div className="mt-5 pt-3 text-center">
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

export { ProfilePage };
