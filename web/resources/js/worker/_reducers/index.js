import { combineReducers } from 'redux';

import { alert } from '../../guest/_reducers/alert.reducer';
import { authentication } from '../../guest/_reducers/authentication.reducer';
import { order } from './order.reducer';
import { notif } from './notif.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    order,
    notif,
});

export default rootReducer;
