import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userActions = {
    login,
    logout,
    register,

    show,
};

function login(inputs, history, from) {
    return dispatch => {
        dispatch(request());

        return userService.login(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push(from);
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

function register(inputs, history, from) {
    return dispatch => {
        dispatch(request());

        return userService.register(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push(from);
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

function show(userId) {
    return dispatch => {
        dispatch(request());

        return userService.show(userId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.SHOW_REQUEST } }
    function success(payload) { return { type: userConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.SHOW_FAILURE, error } }
}
