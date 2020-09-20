import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { routes } from '../_helpers';

function PrivateRoute({ component: Component, condition, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!condition) {
                return <Redirect to={{ pathname: routes.login, state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };
