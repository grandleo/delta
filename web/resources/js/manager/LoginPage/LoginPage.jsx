import React, { useState, useEffect } from 'react';
import { Link, useHistory , useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { userActions } from '../_actions';

// import SiteLogoSrc from '../../../../public/images/logo-delta.svg';

function LoginPage() {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

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
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(user, history, from));
        } else {
            setSubmitted(false);
        }
    }, [submitted]);

    function validate(name) {
        if (!showErrors) return null;
        const value = user[name];
        switch(name) {
            case 'username':
                if (!value) return t('Логин не заполнен');
                if (value.length < 3) return t('Логин не может быть меньше 3 символов');
                break;
            case 'password':
                if (!value) return t('Пароль не заполнен');
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
        <div className="login-page logo-wrapper text-center">
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
                        value={user.username}
                        onChange={handleChange}
                        className={'form-control' + (validate('username') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="login-form.username">{t('Логин')}</label>
                    {validate('username') &&
                        <div className="invalid-feedback text-right">{validate('username')}</div>
                    }
                </div>
                <div className="form-group form-label-group">
                    <input
                        id="login-form.password"
                        type="password"
                        name="password"
                        placeholder={t('Пароль')}
                        value={user.password}
                        onChange={handleChange}
                        className={'form-control' + (validate('password') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="login-form.password">{t('Пароль')}</label>
                    {validate('password') &&
                        <div className="invalid-feedback text-right">{validate('password')}</div>
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
            <div className="mt-5">
                <a className="text-black-50" href="/">{t('Главная')}</a>
            </div>
        </div>
    );
}

export { LoginPage };
