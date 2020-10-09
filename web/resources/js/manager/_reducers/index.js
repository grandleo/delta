import { combineReducers } from 'redux';

import { alert } from '../../guest/_reducers/alert.reducer';
import { authentication } from '../../guest/_reducers/authentication.reducer';
import { registration } from '../../guest/_reducers/registration.reducer';
import { users } from './users.reducer';
import { settings } from './settings.reducer';
import { productCategory } from './product-category.reducer';
import { product } from './product.reducer';
import { table } from './table.reducer';
import { worker } from './worker.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    registration,
    users,
    settings,
    productCategory,
    product,
    table,
    worker,
});

export default rootReducer;
