import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fDate, fileSrc, msgGroupedFn, routes, scroll } from '../_helpers';
import { orderActions } from '../_actions';
import { orderService } from '../_services';
import { Link, Header, LoadingCommon } from '../_components';

function OrderPage() {
    const [submitting, setSubmitting] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messagesGrouped, setMessagesGrouped] = useState([]);
    const { orderId } = useParams();
    const user = useSelector(state => state.authentication.user);
    const orderCurrent = useSelector(state => state.order.current);
    const dispatch = useDispatch();

    const owner_uid = 'g'+user.id;

    const order = orderCurrent.data && orderId == orderCurrent.data.id
        ? orderCurrent.data : null;

    useEffect(() => {
        dispatch(orderActions.getById(orderId));
    }, [orderId]);

    useEffect(() => {
        if (!order) return;
        if (order.orderStatus_phase_id) {
            dispatch(orderActions.indexFilterSet({
                orderStatusPhaseId: order.orderStatus_phase_id,
            }));
        }
    }, [order]);

    const messages = order ? order.messages : null;
    useEffect(() => {
        condScrollDown();
        setMessagesGrouped(msgGroupedFn(messages || [], owner_uid));
    }, [messages]);

    function condScrollDown() {
        scroll.getPercent() > 60 && scroll.goDown();
    }

    function handleChangeMessageText(e) {
        setMessageText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!(messageText.trim()) || submitting) return;
        setSubmitting(true);
        const message = {
            text: messageText,
            owner_uid,
        };
        orderService.sendMessage(orderId, message)
            .then((response) => {
                dispatch(orderActions.messageAdd(orderId, message));
                setMessageText('');
                condScrollDown();
                setSubmitting(false);
            });
    }

    return (
        <div className="d-flex flex-column order-page">
            <Header
                routeBack={routes.orders}
                headingTop={t('Заказ')+' #'+orderId}
                />
            {order &&
                <div className="d-flex justify-content-center">
                    <Link
                        to={routes.makeRoute('place', [order.place_slug])}
                        className="btn btn-order-new btn-danger rounded-circle d-flex justify-content-center"
                        >
                        <img src="/images/icon/plus.svg" alt="icon" />
                    </Link>
                </div>
            }
            <div className="pt-3 d-flex flex-grow-1">
                {!order && orderCurrent.loading && <div className="w-100"><LoadingCommon /></div>}
                {orderCurrent.error && <span className="text-danger">{t('Ошибка')}: {orderCurrent.error}</span>}
                {order &&
                    <div className="px-3 py-4 pb-5 bg-white w-100 rounded-xl">
                        <div className="d-flex justify-content-between align-items-start">
                            <h2 className="h4 font-weight-bold line-height-1">{t('Заказ')} #{order.id}</h2>
                            <span
                                className={'badge badge-primary px-2 py-1 font-weight-500 badge-' + order.orderStatus_color}
                                >
                                {order.orderStatus_name || t('Ожидает обработки')}
                            </span>
                        </div>
                        <div className="font-weight-500">
                            <span className="mr-1 text-black-50">{order.placeCategory_name}:</span>
                            <Link
                                to={routes.makeRoute('place', [order.place_slug])}
                                >{order.place_name}</Link>
                        </div>
                        <hr />
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
                        {order.worker_id && <hr />}
                        {order.worker_id &&
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
                                <div className="ml-auto mr-1">
                                    <img src="/images/icon/messages.svg" alt="img" />
                                </div>
                            </div>
                        }
                        <hr />
                        <div className="d-flex flex-column align-items-start pb-3">
                            {messagesGrouped.map((msgGroup) =>
                                <div key={msgGroup.key}
                                    className={
                                        'msgGroup'
                                        + (msgGroup.is_system ? ' msgGroup_system'
                                            : msgGroup.is_owner ? ' msgGroup_self' : ' msgGroup_other')
                                        + (msgGroup.is_system ? ' align-self-center my-2'
                                            : msgGroup.is_owner ? ' align-self-end ml-5' : ' mr-5')
                                    }
                                    >
                                    <div className="msgGroup-header mb-1">
                                        {!msgGroup.is_system && msgGroup.is_owner &&
                                            <div className="position-relative pr-4 mb-1">
                                                {!msgGroup.is_row &&
                                                    <Fragment>
                                                        <span className="font-weight-600 text-primary mt-1">{t('Вы')}</span>
                                                        <span className="text-success msgGroup-status">{'\u25CF'}</span>
                                                    </Fragment>
                                                }
                                                <p className="m-0 small text-muted">{fDate(msgGroup.created_at)}</p>
                                            </div>
                                        }
                                        {!msgGroup.is_system && !msgGroup.is_owner &&
                                            <div className="position-relative pl-4 mb-1">
                                                {!msgGroup.is_row &&
                                                    <Fragment>
                                                        <span className="font-weight-600 text-primary mt-1">{msgGroup.is_worker && order.worker_id ? order.worker_name : order.place_name}</span>
                                                        <span className="text-warning msgGroup-status">{'\u25CF'}</span>
                                                    </Fragment>
                                                }
                                                <p className="m-0 small text-muted">{fDate(msgGroup.created_at)}</p>
                                            </div>
                                        }
                                        {msgGroup.is_system &&
                                            <div className="mb-1">
                                                <p className="m-0 small text-muted">{fDate(msgGroup.created_at)}</p>
                                            </div>
                                        }
                                    </div>
                                    <div
                                        className={
                                            'msgGroup-content'
                                            +( !msgGroup.is_system && msgGroup.is_owner ? ' mr-4' : '')
                                            +( !msgGroup.is_system && !msgGroup.is_owner ? ' ml-4' : '')
                                        }
                                        >
                                        {msgGroup.items.map((message) =>
                                            <div key={message.id}
                                                className={
                                                    'mb-2 px-3 py-1 pre-line'
                                                    + (message.is_system ? ' bg-info text-white' : ' bg-light')
                                                }
                                                >{message.text}</div>
                                        )}
                                    </div>
                                </div>
                            )}
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
                                    aria-label={t('Отправить')}
                                    className="position-absolute btn btn-sm"
                                    style={{zIndex: 1, top: 8, right:12 }}
                                    ><img src="/images/icon/send-message.svg" alt="img" /></button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export { OrderPage };
