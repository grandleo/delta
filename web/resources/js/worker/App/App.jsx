import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../_helpers';
import { PrivateRoute, AlertContainer } from '../_components';
import { LoginPage } from '../LoginPage';
import { OrderPage, OrderEditPage } from '../OrderPage';

function App() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Fragment>
        <Switch>

            <PrivateRoute
                path={routes.orderEdit}
                component={OrderEditPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.orderList}
                component={OrderPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.login}
                component={LoginPage}
                condition={!user}
                redirectTo={routes.orderList}
                />

            <Redirect from="*" to={routes.orderList} />
        </Switch>
        <AlertContainer />
        </Fragment>
    );
}

export { App };
