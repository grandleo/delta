import { cartConstants } from '../_constants';

export const alertActions = {
    addItem
};

function addItem(serviceId, status) {
    return { type: cartConstants.ADD_ITEM, serviceId, status };
}
