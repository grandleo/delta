import { userConstants } from '../_constants';
import { userService } from '../_services';
import { initUser } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    resetPassword,

    update,
};

function login(inputs, history, from) {
    return dispatch => {
        dispatch(request());

        userService.login(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push(from);
                    initUser(payload.data.id);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(payload) { return { type: userConstants.LOGIN_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function resetPassword(inputs) {
    return dispatch => {
        dispatch(request());

        userService.resetPassword(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.RESET_PASSWORD_REQUEST } }
    function success(payload) { return { type: userConstants.RESET_PASSWORD_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function register(inputs, history, from) {
    return dispatch => {
        dispatch(request());

        userService.register(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push(from);
                    initUser(payload.data.id);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(payload) { return { type: userConstants.REGISTER_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(inputs) {
    return dispatch => {
        return userService.update(inputs)
            .then(
                payload => dispatch(success(payload))
            );
    };

    function success(payload) { return { type: userConstants.UPDATE_SUCCESS, payload } }
}
