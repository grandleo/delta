import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        full_name: '',
        place_name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const history = useHistory();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.full_name && user.place_name && user.email && user.username && user.password && user.password === user.password_confirmation) {
            dispatch(userActions.register(user, history));
        }
    }

    return (
        <div className="register-page text-center">
            <hgroup>
                <h1 className="heading-h1 text-uppercase m-0">{t('Delta-order')}</h1>
                <h2 className="heading-h2 m-0">{t('Система быстрых заказов')}</h2>
            </hgroup>
            <form className="form-1 text-left" onSubmit={handleSubmit}>
                <div className="form-group form-label-group">
                    <input
                        id="register-form.full_name"
                        type="text"
                        name="full_name"
                        placeholder={t('ФИО')}
                        value={user.full_name}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.full_name ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.full_name">{t('ФИО')}</label>
                    {submitted && !user.full_name &&
                        <div className="invalid-feedback text-right">{t('ФИО не заполнено')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="register-form.place_name"
                        type="text"
                        name="place_name"
                        placeholder={t('Название заведения')}
                        value={user.place_name}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.place_name ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.place_name">{t('Название заведения')}</label>
                    {submitted && !user.place_name &&
                        <div className="invalid-feedback text-right">{t('Название заведения не заполнено')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="register-form.email"
                        type="email"
                        name="email"
                        placeholder={t('Email')}
                        value={user.email}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.email">{t('Email')}</label>
                    {submitted && !user.email &&
                        <div className="invalid-feedback text-right">{t('Email не заполнен')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="register-form.username"
                        type="text"
                        name="username"
                        placeholder={t('Логин')}
                        value={user.username}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.username">{t('Логин')}</label>
                    {submitted && !user.username &&
                        <div className="invalid-feedback text-right">{t('Логин не заполнен')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="register-form.password"
                        type="password"
                        name="password"
                        placeholder={t('Пароль')}
                        value={user.password}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.password">{t('Пароль')}</label>
                    {submitted && !user.password &&
                        <div className="invalid-feedback text-right">{t('Пароль не заполнен')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="register-form.password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder={t('Подтвердите пароль')}
                        value={user.password_confirmation}
                        onChange={handleChange}
                        className={'form-control' + (submitted && user.password !== user.password_confirmation ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.password_confirmation">{t('Подтвердите пароль')}</label>
                    {submitted && user.password !== user.password_confirmation &&
                        <div className="invalid-feedback text-right">{t('Пароли не совпадают')}</div>
                    }
                </div>
                <div className="form-group mt-4">
                    <button className="login-button text-white btn btn-lg btn-success btn-block rounded-pill">
                        {t('Зарегистрироваться')}
                        {registering && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                    </button>
                </div>
                <div className="form-group">
                    <Link to={routes.login} className="register-button btn btn-lg btn-light btn-block rounded-pill">
                        {t('Назад')}
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };
