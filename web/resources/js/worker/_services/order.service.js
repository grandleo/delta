import { fetchClient } from '../_helpers';

export const orderService = {
    index,
    show,

    takeOrder,
    setOrderStatus,
    sendMessage,
};

function index() {
    const requestOptions = {
        url: 'orders',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function show(orderId) {
    const requestOptions = {
        url: 'orders/'+orderId,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function takeOrder(orderId) {
    const requestOptions = {
        url: 'orders/'+orderId+'/takeOrder',
        method: 'POST',
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function setOrderStatus(orderId, orderStatusId) {
    const requestOptions = {
        url: 'orders/'+orderId+'/setOrderStatus',
        method: 'POST',
        data: {
            order_status_id: orderStatusId,
        },
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function sendMessage(orderId, message) {
    const requestOptions = {
        url: 'orders/'+orderId+'/message',
        method: 'POST',
        data: message,
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
