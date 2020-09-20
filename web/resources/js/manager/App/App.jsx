import React, { useEffect } from 'react';
// import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Switch>
            <PrivateRoute exact path={routes.home} component={HomePage} condition={false} />
            <Route path={routes.login} component={LoginPage} />
            <Route path={routes.register} component={RegisterPage} />
            <Redirect from="*" to={routes.home} />
        </Switch>
    );
}

export { App };
