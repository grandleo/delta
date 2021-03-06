import { orderConstants } from '../_constants';

const initialState = {
    all: {
        loading: false,
        error: false,
        data: null,
        orderStatusPhases: null,
        filter: {
            orderStatusPhaseId: '',
            date: '',
        },
    },
    current: {
        loading: false,
        error: false,
        data: null,
    },
};

function all(state = initialState.all, action) {
    switch (action.type) {
        case orderConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                data: null,
            };
        case orderConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload.data,
                orderStatusPhases: action.payload.orderStatusPhases,
            };
        case orderConstants.GETALL_FAILURE:
            return {
                error: action.error,
            };

        case orderConstants.INDEX_FILTER_SET:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload,
                },
            };

        default:
            return state;
    }
}

function current(state = initialState.current, action) {
    switch (action.type) {
        case orderConstants.GETBYID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case orderConstants.GETBYID_SUCCESS:
            return {
                data: action.payload.data,
            };
        case orderConstants.GETBYID_FAILURE:
            return {
                error: action.error,
            };

        case orderConstants.MESSAGE_ADD:
            if (!state.data || action.payload.orderId != state.data.id) {
                return state;
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    messages: [
                        ...state.data.messages,
                        action.payload.message
                    ],
                },
            };

        default:
            return state;
    }
}

export function order(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                all: all(state.all, action),
                current: current(state.current, action),
            };
    }
}
