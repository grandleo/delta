import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fDate, fileSrc, msgGroupedFn, routes, scroll } from '../_helpers';
import { orderActions } from '../_actions';
import { orderService } from '../_services';
import { Header, LoadingCommon } from '../_components';

function OrderEditPage() {
    const [submitting, setSubmitting] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messagesGrouped, setMessagesGrouped] = useState([]);
    const [quickAnswers, setQuickAnswers] = useState([
        {text: 'Здравствуйте!'},
        {text: 'Заказ скоро будет передан на кухню'},
        {text: 'Небольшая задержка'},
    ]);
    const { orderId } = useParams();
    const user = useSelector(state => state.authentication.user);
    const orderCurrent = useSelector(state => state.order.current);
    const dispatch = useDispatch();

    const owner_uid = 'm'+user.id;

    const order = orderCurrent.data && orderId == orderCurrent.data.id
        ? orderCurrent.data : null;

    useEffect(() => {
        dispatch(orderActions.show(orderId));
    }, [orderId]);

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

    const messages = order ? order.messages : null;
    useEffect(() => {
        condScrollDown();
        setMessagesGrouped(msgGroupedFn(messages || [], owner_uid));
    }, [messages]);

    function condScrollDown() {
        scroll.getPercent() > 60 && scroll.goDown();
    }

    function sendMessage(message) {
        if (submitting) return;
        setSubmitting(true);
        orderService.sendMessage(orderId, message)
            .then((response) => {
                dispatch(orderActions.messageAdd(orderId, message));
                condScrollDown();
            })
            .then(() => {
                setSubmitting(false);
            });
    }

    function handleChangeMessageText(e) {
        setMessageText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!(messageText.trim())) return;
        const message = {
            text: messageText,
            owner_uid,
        };
        sendMessage(message);
        setMessageText('');
    }

    function handleClickStatus(orderStatusId, e) {
        if (submitting) return;
        setSubmitting(true);
        orderService.setOrderStatus(orderId, orderStatusId)
            .then(() => {
                setSubmitting(false);
            });
    }

    function handleClickQuickMessage(qAnswer, e) {
        e.preventDefault();
        if (submitting) return;
        sendMessage({text: qAnswer.text, owner_uid});
        setQuickAnswers((quickAnswers) => quickAnswers.filter((v) => v.text !== qAnswer.text));
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
                            <p className="m-0 small">{t('создан')+' '+fDate(order.created_at, 'в ')}</p>
                            <p className="m-0 mt-1">{t('Официант:')} <span className="font-weight-600">{order.worker_name}</span></p>
                            <p className="m-0">{t('Персон:')} <span className="font-weight-600">{order.cutlery_qty}</span></p>
                        </div>
                        <hr className="mt-2" />
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
                        <hr className="mb-2" />
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light mr-3"
                                style={{ minWidth: 30, width: 30, height: 30 }}>
                                {order.guest_image &&
                                    <img src={fileSrc(order.guest_image)} alt="img" className="img-fluid rounded-circle" />
                                }
                            </div>
                            <div>
                                {t('Гость №')+order.guest_id+' \u00A0 / \u00A0 '+order.guest_name}
                            </div>
                            <div className="ml-auto mr-1">
                                <img src="/images/icon/messages.svg" alt="img" />
                            </div>
                        </div>
                        <hr className="mt-2" />
                        <div className="d-flex flex-column align-items-start pb-3">
                            {messagesGrouped.map((msgGroup) =>
                                <div key={msgGroup.key}
                                    className={
                                        'msgGroup'
                                        + (msgGroup.is_system ? ' msgGroup_system'
                                            : msgGroup.is_owner || !msgGroup.is_guest ? ' msgGroup_self' : ' msgGroup_other')
                                        + (msgGroup.is_system ? ' align-self-center my-2'
                                            : msgGroup.is_owner || !msgGroup.is_guest ? ' align-self-end ml-5' : ' mr-5')
                                    }
                                    >
                                    <div className="msgGroup-header mb-1">
                                        {!msgGroup.is_system && !!msgGroup.is_owner &&
                                            <div className="position-relative pr-4 mb-1">
                                                {!msgGroup.is_row &&
                                                    <Fragment>
                                                        <div className="font-weight-600 text-primary mt-1">{t('Вы')}</div>
                                                        <span className="text-success msgGroup-status">{'\u25CF'}</span>
                                                    </Fragment>
                                                }
                                                <p className="m-0 small text-muted">{fDate(msgGroup.created_at)}</p>
                                            </div>
                                        }
                                        {!msgGroup.is_system && !msgGroup.is_owner && !msgGroup.is_guest &&
                                            <div className="position-relative pr-4 mb-1">
                                                {!msgGroup.is_row &&
                                                    <Fragment>
                                                        <div className="font-weight-600 text-primary mt-1">{t('Официант')}</div>
                                                        <span className="text-info msgGroup-status">{'\u25CF'}</span>
                                                    </Fragment>
                                                }
                                                <p className="m-0 small text-muted">{fDate(msgGroup.created_at)}</p>
                                            </div>
                                        }
                                        {!msgGroup.is_system && !msgGroup.is_owner && !!msgGroup.is_guest &&
                                            <div className="position-relative pl-4 mb-1">
                                                {!msgGroup.is_row &&
                                                    <Fragment>
                                                        <div className="font-weight-600 text-primary mt-1">{t('Гость №')+order.guest_id+' \u00A0 / \u00A0 '+order.guest_name}</div>
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
                                            +( !msgGroup.is_system && (msgGroup.is_owner || !msgGroup.is_guest) ? ' mr-4' : '')
                                            +( !msgGroup.is_system && !msgGroup.is_owner ? ' ml-4' : '')
                                        }
                                        >
                                        {msgGroup.items.map((message) =>
                                            <div key={message.id}
                                                className={
                                                    'msgGroup-text mb-2 px-3 py-2 pre-line'
                                                    + (message.is_system ? ' bg-info text-white' : ' bg-light')
                                                }
                                                >{message.text}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb-3 p-3 bg-dark text-white">
                            {quickAnswers.length > 0 &&
                                <div className="mb-2">
                                    <h6 className="text-warning">{t('Быстрые ответы:')}</h6>
                                    {quickAnswers.map((qAnswer) =>
                                        <a href="#"
                                            key={qAnswer.text}
                                            className="text-white mr-4"
                                            onClick={handleClickQuickMessage.bind(this, qAnswer)}
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

export { OrderEditPage };
