import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, condition, redirectTo, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!condition) {
                return <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };
