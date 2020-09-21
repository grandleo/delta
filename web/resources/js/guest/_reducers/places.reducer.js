import { placeConstants } from '../_constants';

export function places(state = {}, action) {
    switch (action.type) {
        case placeConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case placeConstants.GETALL_SUCCESS:
            return {
                items: action.items
            };
        case placeConstants.GETALL_FAILURE:
            return {
                items: null,
                error: action.error
            };

        case placeConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case placeConstants.GETBYID_SUCCESS:
            return {
                current: action.current
            };
        case placeConstants.GETBYID_FAILURE:
            return {
                current: null,
                error: action.error
            };

        case placeConstants.GETSERVICES_REQUEST:
            return {
                loading: true
            };
        case placeConstants.GETSERVICES_SUCCESS:
            return {
                currentServiceCategory: action.currentServiceCategory
            };
        case placeConstants.GETSERVICES_FAILURE:
            return {
                currentServiceCategory: null,
                error: action.error
            };
        default:
            return state
    }
}
