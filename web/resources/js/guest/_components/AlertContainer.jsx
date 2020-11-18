import React from 'react';
import { useSelector } from 'react-redux';

function AlertContainer() {
    const alertItems = useSelector(state => state.alert.items);

    if (!alertItems || !alertItems.length) {
        return null;
    }
    console.log('alertItems', alertItems);
    return (
        <div className="fixed-top pt-3 pr-2" style={{left: 'auto'}}>
            {alertItems.map((item) =>
                <div
                    key={item.id}
                    className={
                        'toast show font-weight-500 border-0 shadow-btn-1 text-white ' +
                        (item.alertType === 'success' ? 'bg-success' : '') +
                        (item.alertType === 'info' ? 'bg-info' : '') +
                        (item.alertType === 'error' ? 'bg-danger' : '')
                    }
                    role="alert" aria-live="assertive" aria-atomic="true"
                    >
                    <div
                        className="toast-body"
                        dangerouslySetInnerHTML={{
                            __html: item.message
                        }}
                        ></div>
                </div>
            )}
        </div>
    );
}

export { AlertContainer };
