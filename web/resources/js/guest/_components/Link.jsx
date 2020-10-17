import React from 'react';
import { Link as RouteLink, useLocation } from 'react-router-dom';

function Link(props) {
    const location = useLocation();

    const to = (typeof props.to === 'string')
        ? {
            pathname: props.to,
            state: { from: location.pathname },
        }
        : {
            pathname: '',
            state: { from: location.pathname },
            ...props.to,
        };

    return (
        <RouteLink
            {...props}
            to={to}
            >{props.children}</RouteLink>
    );
}

export { Link };
