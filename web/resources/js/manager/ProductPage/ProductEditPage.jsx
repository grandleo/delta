import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, validators, fileSrc, routes } from '../_helpers';
import { Header, LoadingCommon } from '../_components';
import { productActions } from '../_actions';
import { imageService } from '../_services';

const wMinutesOptions = [
    {key: 5, name: `5 ${t('минут')}`},
    {key: 10, name: `10 ${t('минут')}`},
    {key: 15, name: `15 ${t('минут')}`},
    {key: 20, name: `20 ${t('минут')}`},
    {key: 30, name: `30 ${t('минут')}`},
    {key: 45, name: `45 ${t('минут')}`},
];

function ProductEditPage() {
    const { prCatId, prId } = useParams();
    const [inputs, setInputs] = useState({
        image: '',
        name: '',
        descr_short: '',
        price: '',
        weight: '',
        kcal: '',
        waiting_minutes: 15,
        active: 0,
    });
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const productCurrent = useSelector(state => state.product.current);
    const dispatch = useDispatch();
    const history = useHistory();

    const isNew = prId === '0';

    useEffect(() => {
        dispatch(productActions.show(prCatId, prId));
    }, [prId]);

    useEffect(() => {
        if (isNew || !productCurrent.data) {
            return;
        }
        setInputs(inputs => ({
            ...productCurrent.data,
            price: productCurrent.data.price / 100,
        }));
    }, [productCurrent.data]);

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];

        switch(name) {
            case 'name': case 'descr_short':
                if (!validators.length(value, 0, 250)) return t('Максимальная длина 250 символов');
                break;
        }
        switch(name) {
            case 'name':
                if (!value) return t('Название не заполнено');
                if (!validators.length(value, 2)) return t('Название должно быть минимум 2 символа');
                break;
            case 'descr_short':
                if (value && !validators.length(value, 4))
                    return t('Краткое описание должно быть минимум 4 символа');
                break;
            case 'weight':
                if (!value) return t('Вес не указан');
                if (!validators.length(value, 0, 100)) return t('This is too much..');
                break;
            case 'price':
                if (!value) return t('Стоимость не указана');
                if (!validators.length(value, 0, 7)) return t('This is too much..');
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
            setInputs(inputs => ({ ...inputs, image: isNew ? '' : productCurrent.data.image }));
            return;
        }
        imageService.store('product_image', user.place.id, e.target.files)
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
                product_category_id: prCatId,
            };
            dispatch(productActions.update(prId, data, history));
        }

        setShowErrors(true);
    }

    return (
        <div className="home-page">
            <Header
                headingTop={isNew ? t('Создание блюда') : t('Редактирование блюда')}
                routeBack={routes.makeRoute('prodList', [prCatId])}
                />
            <div className="content-wrapper">
                {productCurrent.loading && <LoadingCommon />}
                {(productCurrent.data || productCurrent.form) &&
                    <form className="form-2" autoComplete="off" onSubmit={handleSubmit}>
                        <h3 className="h6 mb-3 font-weight-600 text-primary">
                            {t('Блюдо категории')}
                            <big className="ml-1">{productCurrent.form.productCategory.name}</big>
                        </h3>
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
                                    ><img src={fileSrc(inputs.image)} alt="image" className="img-fluid" /></label>
                            }
                            {!inputs.image &&
                                <label htmlFor="current-form.image"
                                    role="button"
                                    className="d-block m-0 py-4 text-center"
                                    >{t('+ Прикрепите изображение')}</label>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.name"
                                autoFocus={isNew}
                                name="name"
                                placeholder={t('Название блюда *')}
                                value={inputs.name}
                                onChange={handleChange}
                                className={'form-control' + (validate('name') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.name">{t('Название блюда *')}</label>
                            {validate('name') &&
                                <div className="invalid-feedback text-right">{validate('name')}</div>
                            }
                        </div>

                        <div className="form-group form-label-group">
                            <select
                                id="current-form.waiting_minutes"
                                name="waiting_minutes"
                                placeholder={t('Время приготовления *')}
                                value={inputs.waiting_minutes}
                                onChange={handleChange}
                                className="form-control"
                                >
                                {wMinutesOptions.map((wOpt) =>
                                    <option
                                        key={wOpt.key}
                                        value={wOpt.key}
                                        >{wOpt.name}</option>
                                )}
                            </select>
                            <label htmlFor="current-form.waiting_minutes">{t('Время приготовления *')}</label>
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.weight"
                                type="number"
                                min="0"
                                name="weight"
                                placeholder={t('Вес (в граммах) *')}
                                value={inputs.weight}
                                onChange={handleChange}
                                className={'form-control' + (validate('weight') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.weight">{t('Вес (в граммах) *')}</label>
                            {validate('weight') &&
                                <div className="invalid-feedback text-right">{validate('weight')}</div>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.kcal"
                                type="number"
                                min="0"
                                name="kcal"
                                placeholder={t('кКал')}
                                value={inputs.kcal}
                                onChange={handleChange}
                                className="form-control"
                                />
                            <label htmlFor="current-form.kcal">{t('кКал')}</label>
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.price"
                                type="number"
                                min="0"
                                name="price"
                                placeholder={t('Стоимость (в '+user.place.currency+') *')}
                                value={inputs.price}
                                onChange={handleChange}
                                className={'form-control' + (validate('price') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.price">{t('Стоимость (в '+user.place.currency+') *')}</label>
                            {validate('price') &&
                                <div className="invalid-feedback text-right">{validate('price')}</div>
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

                        <div className="form-group mt-4">
                            <div className="d-flex justify-content-between align-items-center line-height-1 px-3">
                                <div style={{width: 170}}>
                                    <label
                                        role="button"
                                        htmlFor="current-form.active"
                                        >{t('Доступность блюда для заказа')}</label>
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

                        <div className="form-group mt-4 pt-3 text-center">
                            <Link
                                to={routes.makeRoute('prodList', [prCatId])}
                                className="btn btn-lg btn-light rounded-pill letter-spacing-005em shadow-btn-1 mr-4"
                                >{t('Отменить')}</Link>
                            <button
                                className="text-white btn btn-lg btn-success rounded-pill letter-spacing-010em font-weight-600 shadow-btn-1"
                                disabled={productCurrent.saving}
                                >
                                {isNew ? t('Создать') : t('Применить')}
                                {productCurrent.saving && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export { ProductEditPage };
