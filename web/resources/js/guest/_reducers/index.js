import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { place } from './place.reducer';
import { productCategory } from './product-category.reducer';
import { product } from './product.reducer';
import { cart } from './cart.reducer';
import { order } from './order.reducer';
import { alert } from './alert.reducer';
import { notif } from './notif.reducer';
import { payment } from './payment.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    place,
    productCategory,
    product,
    cart,
    order,
    alert,
    payment,
    notif,
});

export default rootReducer;
