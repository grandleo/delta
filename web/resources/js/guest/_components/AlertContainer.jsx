import React from 'react';
import { useSelector } from 'react-redux';

function AlertContainer() {
    const alertItems = useSelector(state => state.alert.items);

    if (!alertItems || !alertItems.length) {
        return null;
    }

    return (
        <div className="fixed-top pt-3 pr-2" style={{left: 'auto'}}>
            {alertItems.map((item) =>
                <div
                    key={item.id}
                    className="toast show"
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
