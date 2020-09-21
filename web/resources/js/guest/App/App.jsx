import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { PlacePage, PlaceServiceCategoryPage } from '../PlacePage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.placeServiceCategory} component={PlaceServiceCategoryPage} />
            <Route path={routes.place} component={PlacePage} />
            <Redirect from="*" to={routes.home} />
        </Switch>
    );
}

export { App };
