import { settingsConstants } from '../_constants';

const initialState = {
    loading: false,
    saving: false,
    error: false,
    data: null,
    form: null,
};

export function settings(state = initialState, action) {
    switch (action.type) {
        case settingsConstants.SHOW_REQUEST:
            return {
                loading: true,
            };
        case settingsConstants.SHOW_SUCCESS:
            return {
                data: action.payload.data,
                form: action.payload.form,
            };
        case settingsConstants.SHOW_FAILURE:
            return {
                error: action.error,
            };

        case settingsConstants.UPDATE_REQUEST:
            return {
                ...state,
                error: false,
                saving: true,
            };
        case settingsConstants.UPDATE_SUCCESS:
            return {
                ...state,
                saving: false,
            };
        case settingsConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error,
                saving: false,
            };

        default:
            return state;
    }
}
