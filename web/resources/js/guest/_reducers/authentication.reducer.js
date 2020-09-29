import { lsGetItem } from '../_helpers';
import { userConstants } from '../_constants';

const initialState = {
    loading: false,
    error: false,
    user: null,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loading: true,
                user: null,
            };
        case userConstants.LOGIN_SUCCESS:
        case userConstants.REGISTER_SUCCESS:
            return {
                user: action.payload.data,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                error: action.error,
            };

        case userConstants.LOGOUT:
            return initialState;

        default:
            return state;
    }
}
