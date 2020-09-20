import React, { useState, useEffect } from 'react';
import { Link, useHistory , useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { userActions } from '../_actions';

// import SiteLogoSrc from '../../../../public/images/logo-delta.svg';

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, history, from));
        }
    }

    return (
        <div className="login-page text-center">
            <img src="/images/logo-delta.svg" className="logo-img"/>
            <hgroup>
                <h1 className="heading-h1 text-uppercase m-0">{t('Delta-order')}</h1>
                <h2 className="heading-h2 m-0">{t('Система быстрых заказов')}</h2>
            </hgroup>
            <form className="form-1 text-left" onSubmit={handleSubmit}>
                <div className="form-group form-label-group">
                    <input
                        id="login-form.username"
                        type="text"
                        name="username"
                        placeholder={t('Логин')}
                        value={username}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !username ? ' is-invalid' : '')}
                    />
                    <label htmlFor="login-form.username">{t('Логин')}</label>
                    {submitted && !username &&
                        <div className="invalid-feedback text-right">{t('Логин не заполнен')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="login-form.password"
                        type="password"
                        name="password"
                        placeholder={t('Пароль')}
                        value={password}
                        onChange={handleChange}
                        className={'form-control' + (submitted && !password ? ' is-invalid' : '')}
                    />
                    <label htmlFor="login-form.password">{t('Пароль')}</label>
                    {submitted && !password &&
                        <div className="invalid-feedback text-right">{t('Пароль не заполнен')}</div>
                    }
                </div>
                <div className="form-group mt-4">
                    <button className="login-button text-white btn btn-lg btn-success btn-block rounded-pill">
                        {t('Войти')}
                        {loggingIn && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                    </button>
                </div>
                <div className="form-group">
                    <Link to={routes.register} className="register-button btn btn-lg btn-light btn-block rounded-pill">
                        {t('Зарегистрироваться')}
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };
