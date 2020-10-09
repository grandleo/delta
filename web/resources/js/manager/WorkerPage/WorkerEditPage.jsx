import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, fileSrc, routes } from '../_helpers';
import { Header, LoadingCommon } from '../_components';
import { workerActions } from '../_actions';
import { imageService } from '../_services';

function WorkerEditPage() {
    const { workerId } = useParams();
    const [inputs, setInputs] = useState({
        image: '',
        name: '',
        name_full: '',
        email: '',
        phone: '',
        card_number: '',
        orders_see_all: 0,
        active: 1,

        password: '',
        password_confirmation: '',
    });
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const workerCurrent = useSelector(state => state.worker.current);
    const dispatch = useDispatch();
    const history = useHistory();

    const isNew = workerId === '0';

    useEffect(() => {
        if (!isNew) {
            dispatch(workerActions.show(workerId));
        }
    }, [workerId]);

    useEffect(() => {
        if (isNew || !workerCurrent.data) {
            return;
        }
        setInputs(inputs => ({
            ...workerCurrent.data,
            password: '',
            password_confirmation: '',
        }));
    }, [workerCurrent.data]);

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];

        switch(name) {
            case 'name': case 'name_full': case 'phone': case 'email':
                if (!validators.length(value, 0, 250)) return t('Максимальная длина 250 символов');
                break;
        }
        switch(name) {
            case 'name_full':
                if (!value) return t('ФИО не заполнено');
                if (!validators.length(value, 4)) return t('ФИО не заполнено полностью');
                break;
            case 'name':
                if (!value) return t('Краткое имя не заполнено');
                if (!validators.length(value, 2)) return t('Должно быть минимум 2 символа');
                break;

            case 'email':
                if (!value) return t('Email не заполнен');
                if (!validators.email(value)) return t('Невалидный Email');
                break;
            case 'password':
                if (isNew && !value) return t('Пароль не заполнен');
                if (value && !validators.length(value, 8))
                    return t('Пароль должен быть минимум 8 символов');
                break;
            case 'password_confirmation':
                if (inputs.password && value !== inputs.password)
                    return t('Пароли не совпадают');
                break;
        }
        return null;
    }

    function handleChange(e) {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? +e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleChangeImage(e) {
        if (!e.target.files.length) {
            setInputs(inputs => ({ ...inputs, image: isNew ? '' : workerCurrent.data.image }));
            return;
        }
        imageService.store('worker_image', user.place.id, e.target.files)
            .then((res) => {
                res && res[0] && setInputs(inputs => ({ ...inputs, image: res[0] }));
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        let valFailed = null;
        for (const name in inputs) {
            if (valFailed = validate(name, true)) break;
        }
        if (!valFailed) {
            const data = {
                ...inputs,
                place_id: user.place.id,
            };
            dispatch(workerActions.update(workerId, data, history));
        }

        setShowErrors(true);
    }

    return (
        <div className="home-page">
            <Header
                headingTop={isNew ? t('Новый официант') : t('Официант')}
                routeBack={routes.workerList}
                />
            <div className="content-wrapper">
                {!isNew && workerCurrent.loading && <LoadingCommon />}
                {(isNew || (!isNew && workerCurrent.data)) &&
                    <form className="form-2" autoComplete="off" onSubmit={handleSubmit}>
                        <h3 className="h6 mb-3 font-weight-600 text-primary">{t('Общая информация')}</h3>
                        <div className="form-group form-control-manager-image">
                            <input
                                id="current-form.image"
                                type="file"
                                name="image_new"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={handleChangeImage}
                                className="d-none"
                                />
                            {inputs.image &&
                                <label htmlFor="current-form.image"
                                    role="button"
                                    className="d-block m-0 py-2 text-center"
                                    ><img src={fileSrc(inputs.image)} alt="photo" /></label>
                            }
                            {!inputs.image &&
                                <label htmlFor="current-form.image"
                                    role="button"
                                    className="d-block m-0 py-4 text-center"
                                    >{t('+ Прикрепите фото')}</label>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.name_full"
                                type="text"
                                name="name_full"
                                placeholder={t('ФИО')}
                                value={inputs.name_full}
                                onChange={handleChange}
                                className={'form-control' + (validate('name_full') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.name_full">{t('ФИО')}</label>
                            {validate('name_full') &&
                                <div className="invalid-feedback text-right">{validate('name_full')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.name"
                                name="name"
                                placeholder={t('Краткое имя (для отображения в чате)')}
                                value={inputs.name}
                                onChange={handleChange}
                                className={'form-control' + (validate('name') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.name">{t('Краткое имя (для отображения в чате)')}</label>
                            {validate('name') &&
                                <div className="invalid-feedback text-right">{validate('name')}</div>
                            }
                        </div>

                        <h3 className="h6 mt-4 pt-2 mb-3 font-weight-600 text-primary">{t('Контактная информация')}</h3>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.phone"
                                type="text"
                                name="phone"
                                placeholder={t('Телефон')}
                                value={inputs.phone}
                                onChange={handleChange}
                                className={'form-control' + (validate('phone') ? ' is-invalid' : '')}
                                className="form-control"
                                />
                            <label htmlFor="current-form.phone">{t('Телефон')}</label>
                            {validate('phone') &&
                                <div className="invalid-feedback text-right">{validate('phone')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.card_number"
                                type="text"
                                name="card_number"
                                placeholder={t('Номер карты')}
                                value={inputs.card_number}
                                onChange={handleChange}
                                className="form-control"
                                />
                            <label htmlFor="current-form.phone">{t('Номер карты')}</label>
                        </div>

                        <h3 className="h6 mt-4 pt-2 mb-3 font-weight-600 text-primary">{t('Данные для авторизации')}</h3>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.email"
                                type="email"
                                name="email"
                                placeholder={t('Email')}
                                value={inputs.email}
                                onChange={handleChange}
                                className={'form-control' + (validate('email') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.email">{t('Email')}</label>
                            {validate('email') &&
                                <div className="invalid-feedback text-right">{validate('email')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.password"
                                autoComplete="new-password"
                                type="password"
                                name="password"
                                placeholder={isNew ? t('Пароль') : t('Новый пароль')}
                                value={inputs.password}
                                onChange={handleChange}
                                className={'form-control' + (validate('password') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.password">{isNew ? t('Пароль') : t('Новый пароль')}</label>
                            {validate('password') &&
                                <div className="invalid-feedback text-right">{validate('password')}</div>
                            }
                        </div>
                        {(isNew || inputs.password) &&
                            <div className="form-group form-label-group">
                                <input
                                    id="current-form.password_confirmation"
                                    autoComplete="new-password"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder={t('Повторите пароль')}
                                    value={inputs.password_confirmation}
                                    onChange={handleChange}
                                    className={'form-control' + (validate('password_confirmation') ? ' is-invalid' : '')}
                                    />
                                <label htmlFor="current-form.password_confirmation">{t('Повторите пароль')}</label>
                                {validate('password_confirmation') &&
                                    <div className="invalid-feedback text-right">{validate('password_confirmation')}</div>
                                }
                            </div>
                        }

                        <div className="form-group mt-4">
                            <div className="d-flex justify-content-between align-items-center line-height-1 px-3">
                                <div style={{width: 170}}>
                                    <label
                                        role="button"
                                        htmlFor="current-form.active"
                                        >{t('Возможность авторизоваться')}</label>
                                </div>
                                <div className="form-control-switch-checkbox custom-control custom-switch">
                                    <input
                                        id="current-form.active"
                                        type="checkbox"
                                        name="active"
                                        checked={inputs.active}
                                        onChange={handleChange}
                                        className="custom-control-input"
                                        />
                                    <label
                                        role="button"
                                        htmlFor="current-form.active"
                                        className="custom-control-label"
                                        ></label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex justify-content-between align-items-center line-height-1 px-3">
                                <div style={{width: 170}}>
                                    <label
                                        role="button"
                                        htmlFor="current-form.orders_see_all"
                                        >{t('Все заказы')}</label>
                                </div>
                                <div className="form-control-switch-checkbox custom-control custom-switch">
                                    <input
                                        id="current-form.orders_see_all"
                                        type="checkbox"
                                        name="orders_see_all"
                                        checked={inputs.orders_see_all}
                                        onChange={handleChange}
                                        className="custom-control-input"
                                        />
                                    <label
                                        role="button"
                                        htmlFor="current-form.orders_see_all"
                                        className="custom-control-label"
                                        ></label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mt-4 pt-3 text-center">
                            <Link
                                to={routes.workerList}
                                className="btn btn-lg btn-light rounded-pill letter-spacing-005em shadow-btn-1 mr-4"
                                >{t('Отменить')}</Link>
                            <button
                                className="text-white btn btn-lg btn-success rounded-pill letter-spacing-010em font-weight-600 shadow-btn-1"
                                disabled={workerCurrent.saving}
                                >
                                {isNew ? t('Создать') : t('Применить')}
                                {workerCurrent.saving && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export { WorkerEditPage };
