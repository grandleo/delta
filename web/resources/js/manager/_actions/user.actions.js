import { userConstants } from '../_constants';
import { userService } from '../_services';
import {initUser} from "../../guest/_helpers";

export const userActions = {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,

    show,
};

function login(inputs, history, from) {
    return dispatch => {
        dispatch(request());

        return userService.login(inputs)
            .then(
                payload => {
                    if (payload && !payload.is_worker) {
                        dispatch(success(payload));
                        history.push(from);
                    } else {
                        dispatch(failure(''));
                    }
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


function resetPassword(inputs, history, from) {
  return dispatch => {
    dispatch(request());

    userService.resetPassword(inputs)
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

  function request() { return { type: userConstants.RESET_PASSWORD_REQUEST } }
  function success(payload) { return { type: userConstants.RESET_PASSWORD_SUCCESS, payload } }
  function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function forgotPassword(inputs) {
  return dispatch => {
    dispatch(request());

    userService.forgotPassword(inputs)
      .then(
        payload => {
          dispatch(success(payload));
        },
        error => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request() { return { type: userConstants.FORGET_PASSWORD_REQUEST } }
  function success(payload) { return { type: userConstants.FORGET_PASSWORD_SUCCESS, payload } }
  function failure(error) { return { type: userConstants.FORGET_PASSWORD_FAILURE, error } }
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

function show() {
    return dispatch => {
        dispatch(request());

        return userService.show()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.SHOW_REQUEST } }
    function success(payload) { return { type: userConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.SHOW_FAILURE, error } }
}
