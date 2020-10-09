import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../_helpers';
import { PrivateRoute, AlertContainer } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { PlacePage } from '../PlacePage';
import { ProductCategoryPage } from '../ProductCategoryPage';
import { CartPage, CartCheckoutPage, CartPaymentPage } from '../CartPage';
import { ProfilePage, ProfileCardsPage } from '../ProfilePage';
import { OrderPage, OrderListPage } from '../OrderPage';

function App() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Fragment>
        <Switch>
            <Route exact path={routes.home} component={HomePage} />

            <Route path={routes.placeCartPayment} component={CartPaymentPage} />
            <Route path={routes.placeCartCheckout} component={CartCheckoutPage} />
            <Route path={routes.placeCart} component={CartPage} />

            <PrivateRoute
                path={routes.orders}
                component={OrderListPage}
                condition={user}
                redirectTo={routes.login}
                />
            <PrivateRoute
                path={routes.order}
                component={OrderPage}
                condition={user}
                redirectTo={routes.login}
                />

            <PrivateRoute
                path={routes.profile}
                component={ProfilePage}
                condition={user}
                redirectTo={routes.login}
                />
            <PrivateRoute
                path={routes.profileCards}
                component={ProfileCardsPage}
                condition={user}
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

            <Route path={routes.placeProductCategory} component={ProductCategoryPage} />
            <Route path={routes.place} component={PlacePage} />
            <Redirect from="*" to={routes.home} />
        </Switch>
        <AlertContainer />
        </Fragment>
    );
}

export { App };
