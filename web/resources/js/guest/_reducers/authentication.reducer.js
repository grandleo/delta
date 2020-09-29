import { lsGetItem } from '../_helpers';
import { userConstants } from '../_constants';

let user;
try {
    user = JSON.parse(lsGetItem('user'));
} catch (err) {
    user = null;
}

const initialState = {
    loading: false,
    error: false,
    user,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loading: true,
                user: null,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                user: action.data
            };
        case userConstants.LOGIN_FAILURE:
            return {
                error: action.error,
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
