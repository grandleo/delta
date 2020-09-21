import React from 'react';

function ServiceBuyButton({ serviceId }) {

    function handleClick(e) {
        e.preventDefault();
    }

    return (
        <a href="#" className="btn-service-add btn-danger" onClick={handleClick}>
            <img src="/images/icon/plus.svg" alt="icon" />
        </a>
    );
}

export { ServiceBuyButton };
