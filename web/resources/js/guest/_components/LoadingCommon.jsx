import React from 'react';
import { t } from '../_helpers/strings';

function LoadingCommon() {
    const colors = ['danger', 'success', 'primary', 'warning', 'info'];
    const color = colors[Math.floor(Math.random() * colors.length)]
    return (
        <div className="text-center">
            <div className={'spinner-border m-5 text-'+color} role="status">
                <span className="sr-only">{t('Загрузка...')}</span>
            </div>
        </div>
    );
}

export { LoadingCommon };
