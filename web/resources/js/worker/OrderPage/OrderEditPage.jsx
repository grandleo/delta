import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes, echo, scroll } from '../_helpers';
import { orderActions } from '../_actions';
import { orderService } from '../_services';
import { Header, LoadingCommon } from '../_components';

function OrderEditPage() {
    const [messageText, setMessageText] = useState('');
    const [quickAnswers, setQuickAnswers] = useState([
        {text: 'Здравствуйте!'},
        {text: 'Заказ скоро будет передан на кухню'},
        {text: 'Небольшая задержка'},
    ]);
    const { orderId } = useParams();
    const user = useSelector(state => state.authentication.user);
    const orderCurrent = useSelector(state => state.order.current);
    const dispatch = useDispatch();

    const owner_uid = 'w'+user.id;

    const order = orderCurrent.data && orderId == orderCurrent.data.id
        ? orderCurrent.data : null;

    useEffect(() => {
        dispatch(orderActions.show(orderId));

        echo.private('order.' + orderId)
            .listen('message-new', (e) => {
                recievedNewMessage(e.message);
            });

        return () => {
            echo.leave('order.' + orderId);
        }
    }, []);

    useEffect(() => {
        if (!order) return;
        setQuickAnswers(quickAnswers => quickAnswers.filter(v => {
            return order.messages.findIndex(v1 => v.text == v1.text) < 0
        }));
        if (order.orderStatus_phase_id) {
            dispatch(orderActions.indexFilterSet({
                orderStatusPhaseId: order.orderStatus_phase_id,
            }));
        }
    }, [order]);

    function recievedNewMessage(message) {
        if (message.is_system) {
            dispatch(orderActions.show(orderId))
                .then(() => {
                    scroll.getPercent() > 60 && scroll.goDown();
                })
        } else {
            dispatch(orderActions.messageAddDirect(orderId, message));
            scroll.getPercent() > 60 && scroll.goDown();
        }
    }

    function sendMessage(message) {
        orderService.sendMessage(orderId, message);
    }

    function handleChangeMessageText(e) {
        setMessageText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!(messageText.trim())) return;
        sendMessage({text: messageText});
        setMessageText('');
    }

    function handleClickStatus(orderStatusId, e) {
        orderService.setOrderStatus(orderId, orderStatusId);
    }

    return (
        <div className="d-flex flex-column home-page">
            <Header
                routeBack={routes.orderList}
                headingTop={t('Заказ')+' #'+orderId}
                />
            <div className="pt-4 d-flex flex-grow-1">
                {!order && orderCurrent.loading && <div className="w-100"><LoadingCommon /></div>}
                {orderCurrent.error && <span className="text-danger">{t('Ошибка')}: {orderCurrent.error}</span>}
                {order &&
                    <div className="px-3 pb-5 bg-white w-100 rounded-xl">
                        <div className="text-right pr-2" style={{marginTop:-12}}>
                            <span
                                className={'badge badge-primary px-2 py-1 font-weight-500 badge-' + order.orderStatus_color}
                                >
                                {order.orderStatus_name || t('Ожидает обработки')}
                            </span>
                        </div>
                        <div className="mt-2">
                            <h5 className="h5 font-weight-600 line-height-1">
                                <b>{order.table_name}</b> / {t('Заказ')} #{order.id}
                            </h5>
                            <p className="m-0 small">{t('создан')+' '+order.created_at}</p>
                        </div>
                        <div className="mt-2">
                            {order.orderProducts.map((orderProduct) =>
                                <div
                                    key={orderProduct.id}
                                    className="d-flex justify-content-between"
                                    >
                                    <span className="mr-3 text-nowrap font-weight-500">{orderProduct.qty} x</span>
                                    <span className="font-weight-500">{orderProduct.name}</span>
                                    <small className="ml-auto">{fMoney(orderProduct.price * orderProduct.qty, order.currency)}</small>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 text-right">
                            <b>{t('Итого:')} {fMoney(order.amount, order.currency)}</b>
                        </div>
                        <hr />
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light mr-3"
                                style={{ minWidth: 40, width: 40, height: 40 }}>
                                {order.worker_image &&
                                    <img src={fileSrc(order.worker_image)} alt="img" className="img-fluid rounded-circle" />
                                }
                            </div>
                            <div>
                                <small>{t('Ваш официант')}</small>
                                <div>{order.worker_name || t('Ожидается')}</div>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex flex-column align-items-start">
                            {order.messages.map((message) =>
                                <div key={message.id}
                                    className={
                                        'mb-3 px-3 py-1'
                                        + (message.is_system ? ' align-self-center bg-info text-white ml-5' : ' bg-light')
                                        + (message.owner_uid.indexOf('m') === 0 || message.owner_uid === owner_uid ? ' align-self-end ml-5' : ' mr-5')
                                        + (message.owner_uid.indexOf('m') === 0 ? ' border border-purple' : '')
                                    }
                                    >
                                    {message.text}
                                </div>
                            )}
                        </div>
                        <div className="my-3 p-3 bg-dark text-white">
                            {quickAnswers.length > 0 &&
                                <div className="mb-2">
                                    <h6 className="text-warning">{t('Быстрые ответы:')}</h6>
                                    {quickAnswers.map((qAnswer) =>
                                        <a href="#"
                                            key={qAnswer.text}
                                            className="text-white mr-4"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sendMessage({text: qAnswer.text});
                                                setQuickAnswers((quickAnswers) => quickAnswers.filter((v) => v.text !== qAnswer.text));
                                            }}
                                            >
                                            [{qAnswer.text}]
                                        </a>
                                    )}
                                </div>
                            }
                            {orderCurrent.form.orderStatuses.length > 0 &&
                                <div className="mb-2">
                                    <h6 className="text-info">{t('Статусы:')}</h6>
                                    {orderCurrent.form.orderStatuses.map((oStatus) =>
                                        <button
                                            key={oStatus.id}
                                            className={
                                                'btn btn-sm px-1 py-1 line-height-1 mr-4 mb-2 btn-'
                                                + oStatus.color
                                            }
                                            onClick={handleClickStatus.bind(this, oStatus.id)}
                                            >
                                            {oStatus.name}
                                        </button>
                                    )}
                                </div>
                            }
                        </div>
                        <div className="fixed-bottom">
                            <form
                                className="position-relative global-wrapper shadow-btn-1 overflow-hidden"
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                >
                                <textarea
                                    value={messageText}
                                    name="message"
                                    placeholder={t('Введите текст сообщения...')}
                                    className="form-control border-0 rounded-0 pt-3 pl-3 w-100"
                                    onChange={handleChangeMessageText}
                                    style={{height: 50, resize:'none', paddingRight: 100}}
                                    />
                                <button
                                    className="position-absolute btn btn-sm btn-purple"
                                    style={{zIndex: 1, top: 12.5, right:15 }}
                                    >{t('Отправить')}</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export { OrderEditPage };
