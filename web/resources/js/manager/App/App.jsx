import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../_helpers';
import { PrivateRoute, AlertContainer } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { SettingsPage } from '../SettingsPage';
import { ProductCategoryPage, ProductCategoryEditPage } from '../ProductCategoryPage';
import { ProductPage, ProductEditPage } from '../ProductPage';
import { TablePage, TableEditPage } from '../TablePage';
import { WorkerPage, WorkerEditPage } from '../WorkerPage';
import { OrderPage } from '../OrderPage';
import { GuestPage } from '../GuestPage';

function App() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Fragment>
        <Switch>
            <PrivateRoute
                exact
                path={routes.home}
                component={HomePage}
                condition={user}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.guestList}
                component={GuestPage}
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
                path={routes.workerEdit}
                component={WorkerEditPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />
            <PrivateRoute
                path={routes.workerList}
                component={WorkerPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.tableEdit}
                component={TableEditPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />
            <PrivateRoute
                path={routes.tableList}
                component={TablePage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.prodList}
                component={ProductPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />
            <PrivateRoute
                path={routes.prodEdit}
                component={ProductEditPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.prodCatEdit}
                component={ProductCategoryEditPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />
            <PrivateRoute
                path={routes.prodCatList}
                component={ProductCategoryPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.settings}
                component={SettingsPage}
                condition={user && user.place && user.place.id}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.login}
                component={LoginPage}
                condition={!user}
                redirectTo={routes.home}
                />
            <PrivateRoute
                path={routes.register}
                component={RegisterPage}
                condition={!user}
                redirectTo={routes.home}
                />

            <Redirect from="*" to={routes.home} />
        </Switch>
        <AlertContainer />
        </Fragment>
    );
}

export { App };
