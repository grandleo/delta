import { userConstants } from '../_constants/user.constants';

const initialState = {
    loading: false,
    error: false,
    user: null,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
        case userConstants.FORGET_PASSWORD_REQUEST:
            return {
                loading: true,
            };
        case userConstants.LOGIN_SUCCESS:
        case userConstants.REGISTER_SUCCESS:
        case userConstants.SHOW_SUCCESS:
        case userConstants.UPDATE_SUCCESS:
        case userConstants.RESET_PASSWORD_SUCCESS:
            return {
                user: action.payload.data,
            };
        case userConstants.LOGIN_FAILURE:
        case userConstants.FORGET_PASSWORD_FAILURE:
            return {
                error: action.error,
            };

        case userConstants.LOGOUT:
            return initialState;

        case userConstants.FORGET_PASSWORD_SUCCESS:
            return {
                loading: false,
            };

        default:
            return state;
    }
}
