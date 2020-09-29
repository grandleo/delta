import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, AlertContainer } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { PlacePage } from '../PlacePage';
import { ProductCategoryPage } from '../ProductCategoryPage';
import { CartPage, CartCheckoutPage } from '../CartPage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.itemsClear());
        });
    }, []);

    return (
        <>
        <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.placeCartCheckout} component={CartCheckoutPage} />
            <Route path={routes.placeCart} component={CartPage} />
            <Route path={routes.placeProductCategory} component={ProductCategoryPage} />
            <Route path={routes.login} component={LoginPage} />
            <Route path={routes.place} component={PlacePage} />
            <Redirect from="*" to={routes.home} />
        </Switch>
        <AlertContainer />
        </>
    );
}

export { App };
