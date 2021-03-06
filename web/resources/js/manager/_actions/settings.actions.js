import { settingsConstants } from '../_constants';
import { settingsService } from '../_services';
import { userActions } from './';
import { routes } from '../_helpers';

export const settingsActions = {
    show,
    update,
};

function show(placeId) {
    return dispatch => {
        dispatch(request());

        return settingsService.show(placeId)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: settingsConstants.SHOW_REQUEST } }
    function success(payload) { return { type: settingsConstants.SHOW_SUCCESS, payload } }
    function failure(error) { return { type: settingsConstants.SHOW_FAILURE, error } }
}

function update(placeId, data, history) {
    return dispatch => {
        dispatch(request());

        return settingsService.update(placeId, data)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(userActions.show());
                    history.push({
                        pathname: routes.home,
                        state: {from: routes.settings},
                    });
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: settingsConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: settingsConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: settingsConstants.UPDATE_FAILURE, error } }
}
