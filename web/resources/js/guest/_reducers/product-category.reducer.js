import { productCategoryConstants } from '../_constants';

const initialState = {
  current: {
      loading: false,
      error: false,
      data: null,
  },
};

function current(state = initialState.current, action) {
    switch (action.type) {
        case productCategoryConstants.GETBYID_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case productCategoryConstants.GETBYID_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case productCategoryConstants.GETBYID_FAILURE:
            return {
                loading: false,
                error: action.error,
                data: null,
            };
        default:
            return state;
    }
}

export function productCategory(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                current: current(state.current, action),
            };
    }
}
