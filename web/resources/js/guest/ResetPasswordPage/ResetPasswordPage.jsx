import React, { useState, useEffect } from 'react';
import { Link, useHistory , useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, routes } from '../_helpers';
import { userActions } from '../_actions';

function ResetPasswordPage() {
    const [inputs, setInputs] = useState({
        email: ''
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
                if (!validators.email(value)) return t('Невалидный Email');
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
            dispatch(userActions.resetPassword(inputs));
        }

        setShowErrors(true);
    }

    return (
        <div className="reset-password-page logo-wrapper text-center">
            <img src="/images/logo-delta.svg" className="logo-img"/>
            <hgroup>
                <h1 className="heading-h1 text-uppercase m-0">{t('Delta-order')}</h1>
                <h2 className="heading-h2 m-0">{t('Система быстрых заказов')}</h2>
            </hgroup>
            <form className="form-1 text-left" onSubmit={handleSubmit}>
                <p className="text-center">
                    {t('Введите электронную почту вашего аккаунта, вам будет выслана ссылка для восстановления пароля.')}
                </p>
                <div className="form-group form-label-group">
                    <input
                        id="login-form.email"
                        autoFocus
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
                <div className="form-group mt-4">
                    <button
                        className="login-button text-white btn btn-lg btn-success btn-block rounded-pill"
                        disabled={loading}
                        >
                        {t('Выслать ссылку')}
                        {loading && <span className="spinner-border spinner-border-sm ml-1"></span>}
                    </button>
                </div>
                <div className="form-group mt-5 text-center">
                    <Link
                        to={routes.login}
                        className="text-black-50"
                        >
                        {t('назад')}
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { ResetPasswordPage };
