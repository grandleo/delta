import { combineReducers } from 'redux';

import { alert } from '../../guest/_reducers/alert.reducer';
import { authentication } from '../../guest/_reducers/authentication.reducer';
import { order } from './order.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    order,
});

export default rootReducer;
