import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, validators, fileSrc, routes } from '../_helpers';
import { Header, LoadingCommon } from '../_components';
import { tableActions } from '../_actions';
import { imageService } from '../_services';

function TableEditPage() {
    const { tableId } = useParams();
    const [inputs, setInputs] = useState({
        name: t('Стол №'),
        active: 1,
    });
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const tableCurrent = useSelector(state => state.table.current);
    const dispatch = useDispatch();
    const history = useHistory();

    const isNew = tableId === '0';

    useEffect(() => {
        if (!isNew) {
            dispatch(tableActions.show(tableId));
        }
    }, [tableId]);

    useEffect(() => {
        if (isNew || !tableCurrent.data) {
            return;
        }
        setInputs(inputs => ({
            ...tableCurrent.data,
        }));
    }, [tableCurrent.data]);

    function validate(name, ignoreShowErrors = false) {
        if (!showErrors && !ignoreShowErrors) return null;
        const value = inputs[name];

        switch(name) {
            case 'name':
                if (!validators.length(value, 0, 250)) return t('Максимальная длина 250 символов');
                break;
        }
        switch(name) {
            case 'name':
                if (!value) return t('Название не заполнено');
                break;
        }
        return null;
    }

    function handleChange(e) {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? +e.target.checked : e.target.value;
        setInputs(inputs => ({ ...inputs, [name]: value }));
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
            dispatch(tableActions.update(tableId, data, history));
        }

        setShowErrors(true);
    }

    return (
        <div className="home-page">
            <Header
                headingTop={isNew ? t('Создание стола') : t('Редактирование стола')}
                routeBack={routes.tableList}
                />
            <div className="content-wrapper">
                {!isNew && tableCurrent.loading && <LoadingCommon />}
                {(isNew || (!isNew && tableCurrent.data)) &&
                    <form className="form-2" autoComplete="off" onSubmit={handleSubmit}>
                        <div className="form-group form-label-group">
                            <input
                                id="current-form.name"
                                autoFocus
                                name="name"
                                placeholder={t('Название')}
                                value={inputs.name}
                                onChange={handleChange}
                                className={'form-control' + (validate('name') ? ' is-invalid' : '')}
                                />
                            <label htmlFor="current-form.name">{t('Название')}</label>
                            {validate('name') &&
                                <div className="invalid-feedback text-right">{validate('name')}</div>
                            }
                        </div>

                        <div className="form-group mt-4">
                            <div className="d-flex justify-content-between align-items-center line-height-1 px-3">
                                <div style={{width: 170}}>
                                    <label
                                        role="button"
                                        htmlFor="current-form.active"
                                        >{t('Доступность стола для заказа')}</label>
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
                                to={routes.tableList}
                                className="btn btn-lg btn-light rounded-pill letter-spacing-005em shadow-btn-1 mr-4"
                                >{t('Отменить')}</Link>
                            <button
                                className="text-white btn btn-lg btn-success rounded-pill letter-spacing-010em font-weight-600 shadow-btn-1"
                                disabled={tableCurrent.saving}
                                >
                                {isNew ? t('Создать') : t('Применить')}
                                {tableCurrent.saving && <span className="spinner-border spinner-border-sm ml-1 mb-1"></span>}
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export { TableEditPage };
