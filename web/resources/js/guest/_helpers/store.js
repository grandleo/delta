import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import throttle from 'lodash/throttle';
import rootReducer from '../_reducers';
import { lsLoadState, lsSaveState } from './';

const loggerMiddleware = createLogger({
    collapsed: true,
});

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

const preloadedState = lsLoadState();

const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
);

store.subscribe(throttle(() => {
    lsSaveState({
        authentication: store.getState().authentication,
        cart: {
            places: store.getState().cart.places,
            placesTableId: store.getState().cart.placesTableId,
            checkout: store.getState().cart.checkout,
        },
    });
}, 1000));

export { store };
