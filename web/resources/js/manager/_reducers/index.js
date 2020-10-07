import { combineReducers } from 'redux';

import { authentication } from '../../guest/_reducers/authentication.reducer';
import { registration } from '../../guest/_reducers/registration.reducer';
import { users } from './users.reducer';
import { settings } from './settings.reducer';
import { alert } from '../../guest/_reducers/alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    settings,
    alert,
});

export default rootReducer;
