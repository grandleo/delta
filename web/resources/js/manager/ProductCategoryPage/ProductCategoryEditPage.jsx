import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, fileSrc, routes } from '../_helpers';
import { Header } from '../_components';
import { productCategoryActions, alertActions } from '../_actions';
import { Constants } from '../_constants';
import { imageService } from '../_services';

function ProductCategoryEditPage() {
    const { prCatId } = useParams();
    const [inputs, setInputs] = useState({
        image: '',
        name: '',
        descr_short: '',
        active: 0,
    });
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const productCategoryCurrent = useSelector(state => state.productCategory.current);
    const dispatch = useDispatch();
    const history = useHistory();

    const isNew = prCatId === '0';

    useEffect(() => {
        if (!isNew) {
            dispatch(productCategoryActions.show(user.place.id, prCatId));
        }
    }, []);

    useEffect(() => {
        if (isNew || !productCategoryCurrent.data) {
            return;
        }
        setInputs(inputs => ({
            ...productCategoryCurrent.data,
        }));
    }, [productCategoryCurrent.data]);

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
                if (!validators.length(value, 2)) return t('Название должно быть миниму 2 символа');
                break;
            case 'descr_short':
                if (value && !validators.length(value, 4))
                    return t('Краткое описание должно быть миниму 4 символа');
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
            setInputs(inputs => ({ ...inputs, image: isNew ? '' : productCategoryCurrent.data.image }));
            return;
        }
        imageService.store('productCategory_image', user.place.id, e.target.files)
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
            dispatch(productCategoryActions.update(user.place.id, prCatId, data, history));
        }

        setShowErrors(true);
    }

    return (
        <div className="home-page">
            <Header
                headingTop={isNew ? t('Создание категории меню') : t('Редактирование категории меню')}
                routeBack={routes.prodCatList}
            />
            <div className="content-wrapper">
                {!isNew && productCategoryCurrent.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {(isNew || (!isNew && productCategoryCurrent.data)) &&
                    <form className="form-2" autoComplete="off" onSubmit={handleSubmit}>
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
                                    >{t('+ Прикрепите изображение')}</label>
                            }
                        </div>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.name"
                                name="name"
                                placeholder={t('Название категории')}
                                value={inputs.name}
                                onChange={handleChange}
                                className={'form-control' + (validate('name') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.name">{t('Название категории')}</label>
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

                        <div className="form-group mt-4">
                            <div className="d-flex justify-content-between align-items-center line-height-1 px-3">
                                <div style={{width: 170}}>
                                    <label
                                        role="button"
                                        htmlFor="current-form.active"
                                        >{t('Доступность категории для заказа')}</label>
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
                                to={routes.prodCatList}
                                className="btn btn-lg btn-light rounded-pill letter-spacing-005em shadow-btn-1 mr-4"
                                >{t('Отменить')}</Link>
                            <button
                                className="text-white btn btn-lg btn-success rounded-pill letter-spacing-010em font-weight-600 shadow-btn-1"
                                disabled={productCategoryCurrent.saving}
                                >
                                {isNew ? t('Создать') : t('Применить')}
                                {productCategoryCurrent.saving && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export { ProductCategoryEditPage };
