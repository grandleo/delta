import { notifConstants } from '../_constants/notif.constants';
import { notifService } from '../_services';
import { notifyFromNotif, fDateGetCurrent } from '../_helpers';

export const notifActions = {
    itemAdd,
    itemRemove,
    itemsClear,

    itemsFetch,
    itemsMarkRead,
};

function itemAdd(itemOrig) {
    const item = {
        created_at: fDateGetCurrent(),
        read_at: 0,
        ...itemOrig,
    };
    document.hidden && notifyFromNotif(item);
    return { type: notifConstants.ITEM_ADD, item };
}

function itemRemove(id) {
    return { type: notifConstants.ITEM_REMOVE, id };
}

function itemsClear() {
    return { type: notifConstants.ITEMS_CLEAR };
}

function itemsFetch() {
    return dispatch => {
        notifService.itemsFetch()
            .then(
                payload => dispatch(success(payload))
            );
    };

    function success(payload) { return { type: notifConstants.ITEMS_SET, payload } }
}

function itemsMarkRead() {
    notifService.markRead();
    return { type: notifConstants.ITEMS_MARK_READ };
}
