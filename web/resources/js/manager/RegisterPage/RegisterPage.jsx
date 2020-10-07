import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, routes } from '../_helpers';
import { userActions } from '../_actions';

function RegisterPage() {
    const [inputs, setInputs] = useState({
        full_name: '',
        place_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [showErrors, setShowErrors] = useState(false);
    const loading = useSelector(state => state.registration.loading);
    const dispatch = useDispatch();
    const history = useHistory();

    const { from: locationFrom } = location.state || { from: { pathname: routes.home } };

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];

        switch(name) {
            case 'full_name': case 'place_name': case 'email':
                if (!validators.length(value, 0, 250)) return t('Максимальная длина 250 символов');
                break;
        }
        switch(name) {
            case 'full_name':
                if (!value) return t('ФИО не заполнено');
                if (!validators.length(value, 4)) return t('ФИО не заполнено полностью');
                break;
            case 'place_name':
                if (!value) return t('Название заведения не заполнено');
                if (!validators.length(value, 3)) return t('Название должно быть миниму 3 символа');
                break;
            case 'email':
                if (!value) return t('Email не заполнен');
                if (!validators.email(value)) return t('Невалидный Email');
                break;
            case 'password':
                if (!value) return t('Пароль не заполнен');
                if (!validators.length(value, 8)) return t('Пароль должен быть миниму 8 символов');
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
            dispatch(userActions.register(inputs, history, locationFrom));
        }

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
                        value={inputs.full_name}
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
                        value={inputs.place_name}
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
                        value={inputs.email}
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
                        {t('Зарегистрироваться')}
                        {loading && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                    </button>
                </div>
                <div className="form-group">
                    <Link
                        to={{
                            pathname: routes.login,
                            state: { from: locationFrom }
                        }}
                        className="register-button btn btn-lg btn-light btn-block rounded-pill"
                        >
                        {t('Назад')}
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };
