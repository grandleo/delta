import { routes } from './';

export function notifInit() {
    if ("Notification" in window && Notification.permission === "default") {
        notifyMe('Спасибо', {
            body: 'Уведомления будут приходить если вкладка открыта, но неактивна',
        });
    }
}

export function notifyFromNotif(notif) {
    // for help see _components/Header
    if (!notif || !notif.c_type) return;

    switch (notif.c_type) {
        case 'message-new':
            return notifyMe(`Заказ №${notif.order_id} новое сообщение`, {
                body: notif.message.text,
                data: routes.makeRoute('order', [notif.order_id]),
            });
        case 'status-new':
            return notifyMe(`Заказ №${notif.order_id} смена статуса`, {
                body: `Статус изменён на "${notif.orderStatus.name}"`,
                data: routes.makeRoute('order', [notif.order_id]),
            });
    }
}

export function notifyMe(title, options = {}) {
    if (!("Notification" in window)) {
        return;
    } else if (Notification.permission === "granted") {
        createNotification(title, options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                createNotification(title, options);
            }
        });
    }
}

function createNotification(title, options) {
    const optionsFinal = {
        icon: "/favicon-60.png",
        ...options,
    };
    const notification = new Notification(title, optionsFinal);
}
