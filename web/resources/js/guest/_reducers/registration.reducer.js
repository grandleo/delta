import { userConstants } from '../_constants';

const initialState = {
    loading: false,
    error: false,
};

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                loading: true,
            };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state
    }
}
