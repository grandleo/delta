import { productConstants } from '../_constants';

const initialState = {
  current: {
      loading: false,
      error: false,
      data: null,
  },
};

function current(state = initialState.current, action) {
    switch (action.type) {
        case productConstants.SHOW_REQUEST:
            return {
                loading: true,
                error: false,
                data: null,
            };
        case productConstants.SHOW_SUCCESS:
            return {
                loading: false,
                error: false,
                data: action.payload.data,
            };
        case productConstants.SHOW_FAILURE:
            return {
                loading: false,
                error: action.error,
                data: null,
            };
        default:
            return state;
    }
}

export function product(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                current: current(state.current, action),
            };
    }
}
