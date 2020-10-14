import React from 'react';

import { t } from '../_helpers';

const wTimeOptions = [];
const d1 = new Date('1991-01-01T00:00:00');
while (d1.getDate() != 2) {
    const timeStr = ('0' + d1.getHours()).slice(-2)+':'+
        ('0' + d1.getMinutes()).slice(-2);
    wTimeOptions.push(timeStr);
    d1.setMinutes(d1.getMinutes()+30);
}

function SettingsWorkerShift({ prefix, value, index, validate, handleChange, handleDelete }) {

    return (
        <div className="form-group row mb-4">
            <div className="col-12 pb-3">
                <div className="form-label-group">
                    <input
                        id={`${prefix+index}.name`}
                        name="name"
                        placeholder={t('Название смены *')}
                        value={value.name}
                        onChange={handleChange.bind(this, index)}
                        className="form-control"
                        required="required"
                        />
                    <label htmlFor={`${prefix+index}.name`}>{t('Название смены *')}</label>
                </div>
            </div>
            <div className="col">
                <div className="form-label-group">
                    <select
                        id={`${prefix+index}.from`}
                        name="from"
                        placeholder={t('Начало смены')}
                        value={value.from}
                        onChange={handleChange.bind(this, index)}
                        className="form-control"
                        >
                        {wTimeOptions.map((wTimeOpt) =>
                            <option
                                key={wTimeOpt}
                                value={wTimeOpt}
                                >{wTimeOpt}</option>
                        )}
                    </select>
                    <label htmlFor={`${prefix+index}.from`}>{t('Начало смены')}</label>
                </div>
            </div>
            <div className="col">
                <div className="form-label-group">
                    <select
                        id={`${prefix+index}.until`}
                        name="until"
                        placeholder={t('Конец смены')}
                        value={value.until}
                        onChange={handleChange.bind(this, index)}
                        className="form-control"
                        >
                        {wTimeOptions.map((wTimeOpt) =>
                            <option
                                key={wTimeOpt}
                                value={wTimeOpt}
                                >{wTimeOpt}</option>
                        )}
                    </select>
                    <label htmlFor={`${prefix+index}.until`}>{t('Конец смены')}</label>
                </div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-end">
                <button
                    type="button"
                    onClick={handleDelete.bind(this, index)}
                    className="btn btn-light btn-sm btn-sm-control"
                    >
                    <img src="/images/icon/trash.svg" alt="delete" />
                </button>
            </div>
        </div>
    );
}

export { SettingsWorkerShift };
