import React, { useState, useEffect } from 'react';
import {Link, useHistory, useLocation, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, routes } from '../_helpers';
import { userActions } from '../_actions';

function ResetPasswordPage() {
    const [inputs, setInputs] = useState({
        password: '',
        password_confirmation: '',
    });
    const { token } = useParams();
    const [showErrors, setShowErrors] = useState(false);
    const loading = useSelector(state => state.authentication.loading);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const { from: locationFrom } = location.state || { from: { pathname: routes.home } };

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];

        switch(name) {
            case 'password':
                if (!value) return t('Пароль не заполнен');
                if (!validators.length(value, 8)) return t('Пароль должен быть минимум 8 символов');
                break;
            case 'password_confirmation':
                if (value !== inputs.password) return t('Пароли не совпадают');
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
            inputs.token = token
            dispatch(userActions.resetPassword(inputs, history, locationFrom));
        }

        setShowErrors(true);
    }

    useEffect(() => {
        if (loading === false) {
            setInputs({
                password: '',
                password_confirmation: '',
            })
            setShowErrors(false)
        }
    }, [loading]);

    return (
        <div className="reset-password-page logo-wrapper text-center">
            <img src="/images/logo-delta.svg" className="logo-img"/>
            <hgroup>
                <h1 className="heading-h1 text-uppercase m-0">{t('Delta-order')}</h1>
                <h2 className="heading-h2 m-0">{t('Система быстрых заказов')}</h2>
            </hgroup>
            <form className="form-1 text-left" onSubmit={handleSubmit}>
                <div className="form-group form-label-group">
                    <input
                      id="register-form.password"
                      type="password"
                      name="password"
                      placeholder={t('Пароль')}
                      value={inputs.password}
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
                      value={inputs.password_confirmation}
                      onChange={handleChange}
                      className={'form-control' + (validate('password_confirmation') ? ' is-invalid' : '')}
                    />
                    <label htmlFor="register-form.password_confirmation">{t('Подтвердите пароль')}</label>
                    {validate('password_confirmation') &&
                    <div className="invalid-feedback text-right">{validate('password_confirmation')}</div>
                    }
                </div>
                <div className="form-group mt-4">
                    <button
                        className="login-button text-white btn btn-lg btn-success btn-block rounded-pill"
                        disabled={loading}
                        >
                        {t('сбросить пароль')}

                        {loading && <span className="spinner-border spinner-border-sm ml-1"></span>}
                    </button>
                </div>
                <div className="form-group mt-5 text-center">
                    <Link
                        to={routes.login}
                        className="text-black-50"
                        >
                        {t('Назад')}
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { ResetPasswordPage };
