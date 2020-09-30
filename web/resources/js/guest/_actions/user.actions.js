import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register,
};

function login(inputs, history, from) {
    return dispatch => {
        dispatch(request());

        userService.login(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.itemAdd('error', error.toString()));
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

        userService.register(inputs)
            .then(
                payload => {
                    dispatch(success(payload));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.itemAdd('error', error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(payload) { return { type: userConstants.REGISTER_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}