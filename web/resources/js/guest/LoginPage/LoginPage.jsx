import React, { useState, useEffect } from 'react';
import { Link, useHistory , useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { userActions } from '../_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [showErrors, setShowErrors] = useState(false);
    const loading = useSelector(state => state.authentication.loading);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const { from: locationFrom } = location.state || { from: { pathname: routes.home } };

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];
        switch(name) {
            case 'email':
                if (!value) return t('Email не заполнен');
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return t('Невалидный Email');
                break;
            case 'password':
                if (!value) return t('Пароль не заполнен');
                break;
        }
        return null;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        let valFailed = null;
        for (const name in inputs) {
            if (valFailed = validate(name, true)) break;
        }
        if (!valFailed) {
            dispatch(userActions.login(inputs, history, locationFrom));
        }

        setShowErrors(true);
    }

    return (
        <div className="login-page logo-wrapper text-center">
            <img src="/images/logo-delta.svg" className="logo-img"/>
            <hgroup>
                <h1 className="heading-h1 text-uppercase m-0">{t('Delta-order')}</h1>
                <h2 className="heading-h2 m-0">{t('Система быстрых заказов')}</h2>
            </hgroup>
            <form className="form-1 text-left" onSubmit={handleSubmit}>
                <div className="form-group form-label-group">
                    <input
                        id="login-form.email"
                        type="email"
                        name="email"
                        placeholder={t('Email')}
                        value={inputs.email}
                        onChange={handleChange}
                        className={'form-control' + (validate('email') ? ' is-invalid' : '')}
                        />
                    <label htmlFor="login-form.email">{t('Email')}</label>
                    {validate('email') &&
                        <div className="invalid-feedback text-right">{validate('email')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="login-form.password"
                        type="password"
                        name="password"
                        placeholder={t('Пароль')}
                        value={inputs.password}
                        onChange={handleChange}
                        className={'form-control' + (validate('password') ? ' is-invalid' : '')}
                        />
                    <label htmlFor="login-form.password">{t('Пароль')}</label>
                    {validate('password') &&
                        <div className="invalid-feedback text-right">{validate('password')}</div>
                    }
                </div>
                <div className="form-group mt-4">
                    <button
                        className="login-button text-white btn btn-lg btn-success btn-block rounded-pill"
                        disabled={loading}
                        >
                        {t('Войти')}
                        {loading && <span className="spinner-border spinner-border-sm ml-1"></span>}
                    </button>
                </div>
                <div className="form-group">
                    <Link
                        to={{
                            pathname: routes.register,
                            state: { from: locationFrom }
                        }}
                        className="register-button btn btn-lg btn-light btn-block rounded-pill"
                        >
                        {t('Зарегистрироваться')}
                    </Link>
                </div>
                <div className="form-group mt-5 text-center">
                    <Link
                        to={routes.home}
                        className="text-black-50"
                        >
                        {t('назад')}
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };
