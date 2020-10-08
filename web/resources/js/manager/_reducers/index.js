import { combineReducers } from 'redux';

import { alert } from '../../guest/_reducers/alert.reducer';
import { authentication } from '../../guest/_reducers/authentication.reducer';
import { registration } from '../../guest/_reducers/registration.reducer';
import { users } from './users.reducer';
import { settings } from './settings.reducer';
import { productCategory } from './product-category.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    registration,
    users,
    settings,
    productCategory,
});

export default rootReducer;
