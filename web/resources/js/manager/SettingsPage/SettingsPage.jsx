import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, fileSrc, routes } from '../_helpers';
import { Header, LoadingCommon } from '../_components';
import { settingsActions } from '../_actions';
import { imageService } from '../_services';

const wTimeOptions = [];
const d1 = new Date('1991-01-01T00:00:00');
while (d1.getDate() != 2) {
    const timeStr = ('0' + d1.getHours()).slice(-2)+':'+
        ('0' + d1.getMinutes()).slice(-2);
    wTimeOptions.push(timeStr);
    d1.setMinutes(d1.getMinutes()+30);
}

const wDaysOptions = [t('Пн'), t('Вт'), t('Ср'), t('Чт'), t('Пт'), t('Сб'), t('Вс')];

function SettingsPage() {
    const [inputs, setInputs] = useState({
        //
    });
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(settingsActions.show(user.place.id));
    }, []);

    useEffect(() => {
        if (!settings.data) {
            return;
        }
        const {params} = settings.data;
        setInputs(inputs => ({
            ...settings.data,
            params: undefined,
            'params.works_from': params.works_from,
            'params.works_until': params.works_until,
            'params.works_weekdays': params.works_weekdays,
            'user.name_full': user.name_full,
            'user.email': user.email,
            'user.password': '',
            'user.password_confirmation': '',
        }));
    }, [settings.data]);

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];

        switch(name) {
            case 'name': case 'descr_short': case 'user.name_full': case 'user.email':
                if (!validators.length(value, 0, 250)) return t('Максимальная длина 250 символов');
                break;
        }
        switch(name) {
            case 'place_category_id':
                if (!value) return t('Тип заведения не выбран');
                break;
            case 'name':
                if (!value) return t('Название заведения не заполнено');
                if (!validators.length(value, 3)) return t('Название должно быть минимум 3 символа');
                break;
            case 'descr_short':
                if (value && !validators.length(value, 4))
                    return t('Краткое описание должно быть минимум 4 символа');
                break;

            case 'params.works_weekdays':
                if (inputs['params.works_weekdays'].reduce((pv, cv) => (pv + cv)) <= 0)
                    return t('Выберите хотя бы один рабочий день');
                break;

            case 'user.name_full':
                if (!value) return t('ФИО не заполнено');
                if (!validators.length(value, 4)) return t('ФИО не заполнено полностью');
                break;
            case 'user.email':
                if (!value) return t('Email не заполнен');
                if (!validators.email(value)) return t('Невалидный Email');
                break;
            case 'user.password':
                if (value && !validators.length(value, 8))
                    return t('Новый пароль должен быть минимум 8 символов');
                break;
            case 'user.password_confirmation':
                if (inputs['user.password'] && value !== inputs['user.password'])
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
            setInputs(inputs => ({ ...inputs, image: settings.data.image }));
            return;
        }
        imageService.store('place_image', user.place.id, e.target.files)
            .then((res) => {
                res && res[0] && setInputs(inputs => ({ ...inputs, image: res[0] }));
            });
    }

    function handleChangeCheckbox(e, wIndex) {
        const { name } = e.target;
        const value = +e.target.checked;
        setInputs((inputs) => ({
            ...inputs,
            [name]: inputs[name]
                .map((v, i) => (i !== wIndex ? v : value)),
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        let valFailed = null;
        for (const name in inputs) {
            if (valFailed = validate(name, true)) break;
        }
        if (!valFailed) {
            const {image, name, descr_short, place_category_id} = inputs;
            const data = {
                image, name, descr_short, place_category_id,
                params: {
                    works_from: inputs['params.works_from'],
                    works_until: inputs['params.works_until'],
                    works_weekdays: inputs['params.works_weekdays'],
                },
                user: {
                    name_full: inputs['user.name_full'],
                    email: inputs['user.email'],
                    password: inputs['user.password'],
                    password_confirmation: inputs['user.password_confirmation'],
                },
            };
            dispatch(settingsActions.update(user.place.id, data, history));
        }

        setShowErrors(true);
    }

    return (
        <div className="home-page">
            <Header
                headingTop={t('Настройки заведения')}
                routeBack={routes.home}
                />
            <div className="content-wrapper">
                {settings.loading && <LoadingCommon />}
                {settings.data && inputs['params.works_weekdays'] &&
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
                                    ><img src={fileSrc(inputs.image)} alt="logo" /></label>
                            }
                            {!inputs.image &&
                                <label htmlFor="current-form.image"
                                    role="button"
                                    className="d-block m-0 py-4 text-center"
                                    >{t('+ Прикрепите лого')}</label>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <select
                                id="current-form.place_category_id"
                                name="place_category_id"
                                placeholder={t('Тип заведения')}
                                value={inputs.place_category_id}
                                onChange={handleChange}
                                className={'form-control' + (validate('place_category_id') ? ' is-invalid' : '')}
                                >
                                {settings.form.placeCategories.map((pCat) =>
                                    <option
                                        key={pCat.id}
                                        value={pCat.id}
                                        >{pCat.name}</option>
                                )}
                            </select>
                            <label htmlFor="current-form.place_category_id">{t('Тип заведения')}</label>
                            {validate('place_category_id') &&
                                <div className="invalid-feedback text-right">{validate('place_category_id')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.name"
                                name="name"
                                placeholder={t('Название заведения')}
                                value={inputs.name}
                                onChange={handleChange}
                                className={'form-control' + (validate('name') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.name">{t('Название заведения')}</label>
                            {validate('name') &&
                                <div className="invalid-feedback text-right">{validate('name')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <textarea
                                id="current-form.descr_short"
                                name="descr_short"
                                placeholder={t('Краткое описание')}
                                value={inputs.descr_short}
                                onChange={handleChange}
                                className={'form-control' + (validate('descr_short') ? ' is-invalid' : '')}
                                style={{height:'95px',resize:'none'}}
                                />
                            <label htmlFor="current-form.descr_short">{t('Краткое описание')}</label>
                            {validate('descr_short') &&
                                <div className="invalid-feedback text-right">{validate('descr_short')}</div>
                            }
                        </div>

                        <h3 className="h6 mt-4 pt-2 mb-3 font-weight-600 text-primary">{t('Режим работы')}</h3>
                        <div className="form-group">
                            <div className="d-flex justify-content-between">
                                {wDaysOptions.map((wDay, wIndex) =>
                                    <div key={wIndex} className="form-control-weekday-checkbox">
                                        <input
                                            id={'current-form.params.works_weekdays['+wIndex+']'}
                                            type="checkbox"
                                            name="params.works_weekdays"
                                            checked={inputs['params.works_weekdays'][wIndex]}
                                            onChange={(e) => handleChangeCheckbox(e, wIndex)}
                                            className="custom-control-input"
                                            />
                                        <label
                                            role="button"
                                            htmlFor={'current-form.params.works_weekdays['+wIndex+']'}
                                            >{wDay}</label>
                                    </div>
                                )}
                            </div>
                            {validate('params.works_weekdays') &&
                                <div className="d-block invalid-feedback text-right">{validate('params.works_weekdays')}</div>
                            }
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <div className="form-label-group">
                                    <select
                                        id="current-form.params.works_from"
                                        name="params.works_from"
                                        placeholder={t('Начало дня')}
                                        value={inputs['params.works_from']}
                                        onChange={handleChange}
                                        className="form-control"
                                        >
                                        {wTimeOptions.map((wTimeOpt) =>
                                            <option
                                                key={wTimeOpt}
                                                value={wTimeOpt}
                                                >{wTimeOpt}</option>
                                        )}
                                    </select>
                                    <label htmlFor="current-form.params.works_from">{t('Начало дня')}</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-label-group">
                                    <select
                                        id="current-form.params.works_until"
                                        name="params.works_until"
                                        placeholder={t('Конец дня')}
                                        value={inputs['params.works_until']}
                                        onChange={handleChange}
                                        className="form-control"
                                        >
                                        {wTimeOptions.map((wTimeOpt) =>
                                            <option
                                                key={wTimeOpt}
                                                value={wTimeOpt}
                                                >{wTimeOpt}</option>
                                        )}
                                    </select>
                                    <label htmlFor="current-form.params.works_until">{t('Конец дня')}</label>
                                </div>
                            </div>
                        </div>

                        <h3 className="h6 mt-4 pt-2 mb-3 font-weight-600 text-primary">{t('Данные для авторизации')}</h3>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.user.name_full"
                                type="text"
                                name="user.name_full"
                                placeholder={t('ФИО')}
                                value={inputs['user.name_full']}
                                onChange={handleChange}
                                className={'form-control' + (validate('user.name_full') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.user.name_full">{t('ФИО')}</label>
                            {validate('user.name_full') &&
                                <div className="invalid-feedback text-right">{validate('user.name_full')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.user.email"
                                type="email"
                                name="user.email"
                                placeholder={t('Email')}
                                value={inputs['user.email']}
                                onChange={handleChange}
                                className={'form-control' + (validate('user.email') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.email">{t('Email')}</label>
                            {validate('user.email') &&
                                <div className="invalid-feedback text-right">{validate('user.email')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.user.password"
                                type="password"
                                name="user.password"
                                placeholder={t('Новый пароль')}
                                value={inputs['user.password']}
                                onChange={handleChange}
                                className={'form-control' + (validate('user.password') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.user.password">{t('Новый пароль')}</label>
                            {validate('user.password') &&
                                <div className="invalid-feedback text-right">{validate('user.password')}</div>
                            }
                        </div>
                        {inputs['user.password'] &&
                            <div className="form-group form-label-group">
                                <input
                                    id="current-form.user.password_confirmation"
                                    type="password"
                                    name="user.password_confirmation"
                                    placeholder={t('Повторите пароль')}
                                    value={inputs['user.password_confirmation']}
                                    onChange={handleChange}
                                    className={'form-control' + (validate('user.password_confirmation') ? ' is-invalid' : '')}
                                    />
                                <label htmlFor="current-form.user.password_confirmation">{t('Повторите пароль')}</label>
                                {validate('user.password_confirmation') &&
                                    <div className="invalid-feedback text-right">{validate('user.password_confirmation')}</div>
                                }
                            </div>
                        }

                        <div className="form-group mt-4 pt-3 text-center">
                            <Link
                                to={routes.home}
                                className="btn btn-lg btn-light rounded-pill letter-spacing-005em shadow-btn-1 mr-4"
                                >{t('Отменить')}</Link>
                            <button
                                className="text-white btn btn-lg btn-success rounded-pill letter-spacing-010em font-weight-600 shadow-btn-1"
                                disabled={settings.saving}
                                >
                                {t('Применить')}
                                {settings.saving && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export { SettingsPage };
