import { lsGetItem, lsLoadState, store, echoInit, notifInit } from './';
import { userActions, notifActions, orderActions } from '../_actions';

const token = lsGetItem('token');

if (token) {
    initUser();
}

export function initUser(userId = null) {
    echoInit();
    notifInit();

    const { dispatch } = store;

    dispatch(notifActions.itemsFetch());

    const preloadedState = lsLoadState();
    let uId = userId;
    if (preloadedState.authentication.user && preloadedState.authentication.user.id) {
        uId = preloadedState.authentication.user.id;
    }
    if (!uId) {
        dispatch(userActions.logout());
        return;
    }
    window.echo.private(`manager.${uId}`)
        .notification((notif) => {
            dispatch(notifActions.itemAdd(notif));

            dispatch(orderActions.indexFilterSet({
                fake: Date.now(),
            }, true));

            if (!notif.c_type) return;

            const curState = store.getState();

            switch (notif.c_type) {
                case 'message-new':
                    if (curState.order.current && curState.order.current.data
                        && curState.order.current.data.id == notif.order_id) {
                        dispatch(orderActions.messageAddDirect(notif.order_id, notif.message));
                    }
                    break;
                case 'status-new':
                    if (curState.order.current && curState.order.current.data
                        && curState.order.current.data.id == notif.order_id) {
                        dispatch(orderActions.show(notif.order_id));
                    }
                    break;
            }
        });
}
