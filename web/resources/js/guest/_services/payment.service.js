import { fetchClient } from '../_helpers';

export const paymentService = {
  getCards,
  paymentInit,
};

function getCards() {
  const requestOptions = {
    url: 'payment/cards',
  };

  return fetchClient()(requestOptions).then(handleResponse);
}

function paymentInit(orderId) {
  const requestOptions = {
    url: 'payment/init/' + orderId,
  };

  return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.data;
}
