import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { userActions } from '../_actions';
import { Header } from '../_components';

const links = [
    {to: routes.orders, icon: 'orders.svg', text: t('Заказы')},
    {to: routes.finances, icon: 'dollar-sign.svg', text: t('Финансы')},
    {to: routes.rooms, icon: 'tables.svg', text: t('Столы')},
    {to: routes.menus, icon: 'menu.svg', text: t('Меню')},
    {to: routes.personal, icon: 'users.svg', text: t('Официанты')},
    {to: routes.guests, icon: 'users.svg', text: t('Клиенты')},
    {to: routes.settings, icon: 'settings.svg', text: t('Настройка заведения')},
];

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="home-page">
            <Header
                headingTop="Казаков Евгений"
                headingBottom="Казачий курень   |   Администратор"
            />
            <div className="content-wrapper">
                {links.map(link =>
                    <Link to={link.to} className="btn btn-xlg btn-light btn-block mb-3 text-left shadow-btn-3 text-primary">
                        <img className="mr-2" src={`/images/icon/${link.icon}`} alt="icon" />
                        {link.text}
                    </Link>
                )}
            </div>

            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to={routes.login}>Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };
