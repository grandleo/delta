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
    const [showErrors, setShowErrors] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // TODO: check if logged in
        // dispatch(userActions.logout());
    }, []);

    useEffect(() => {
        if (!submitted) return;

        let valRes = null;
        for (const name in user) {
            if (valRes = validate(name, user[name])) break;
        }
        if (!valRes) {
            dispatch(userActions.register(user, history));
        } else {
            setSubmitted(false);
        }
    }, [submitted]);

    function validate(name) {
        if (!showErrors) return null;
        const value = user[name];
        switch(name) {
            case 'full_name':
                if (!value) return t('ФИО не заполнено');
                if (value.length < 4) return t('ФИО не заполнено полностью');
            case 'place_name':
                if (!value) return t('Название заведения не заполнено');
                if (value.length < 4) return t('Название должно быть миниму 4 символа');
                break;
            case 'email':
                if (!value) return t('Email не заполнен');
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return t('Невалидный Email');
                break;
            case 'username':
                if (!value) return t('Логин не заполнен');
                if (value.length < 3) return t('Логин должен быть миниму 3 символа');
                break;
            case 'password':
                if (!value) return t('Пароль не заполнен');
                if (value.length < 8) return t('Пароль должен быть миниму 8 символов');
                break;
            case 'password_confirmation':
                if (value !== user.password) return t('Пароли не совпадают');
                break;
        }
        return null;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        setShowErrors(true);
    }

    return (
        <div className="register-page logo-wrapper text-center">
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
                        className={'form-control' + (validate('full_name') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.full_name">{t('ФИО')}</label>
                    {validate('full_name') &&
                        <div className="invalid-feedback text-right">{validate('full_name')}</div>
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
                        className={'form-control' + (validate('place_name') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.place_name">{t('Название заведения')}</label>
                    {validate('place_name') &&
                        <div className="invalid-feedback text-right">{validate('place_name')}</div>
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
                        className={'form-control' + (validate('email') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.email">{t('Email')}</label>
                    {validate('email') &&
                        <div className="invalid-feedback text-right">{validate('email')}</div>
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
                        className={'form-control' + (validate('username') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.username">{t('Логин')}</label>
                    {validate('username') &&
                        <div className="invalid-feedback text-right">{validate('username')}</div>
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
                        className={'form-control' + (validate('password') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.password">{t('Пароль')}</label>
                    {validate('password') &&
                        <div className="invalid-feedback text-right">{validate('password')}</div>
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
                        className={'form-control' + (validate('password_confirmation') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.password_confirmation">{t('Подтвердите пароль')}</label>
                    {validate('password_confirmation') &&
                        <div className="invalid-feedback text-right">{validate('password_confirmation')}</div>
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
