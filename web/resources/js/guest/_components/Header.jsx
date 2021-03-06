import React, { Fragment, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import { Link } from './Link';
import { t, fDate, routes } from '../_helpers';
import { notifActions } from '../_actions';

function Header(props) {
    const [notifsOpen, setNotifsOpen] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const placeCurrent = useSelector(state => state.place.current);
    const notifItems = useSelector(state => state.notif.items);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    let { headingTop, headingBottom, routeBack } = props;

    if (!headingTop) {
        headingTop = placeCurrent.data ? placeCurrent.data.name : t('Загрузка...');
    }

    if (!headingBottom && placeCurrent.data && headingTop === placeCurrent.data.name) {
        headingBottom = t('Предзаказ')
            + (
                placeCurrent.data && placeCurrent.data.table_name
                    ? ' \u00A0 | \u00A0 '+placeCurrent.data.table_name
                    : ''
            );
    }

    if (routeBack === null && location.state && location.state.from && location.state.from !== location.pathname) {
        routeBack = location.state.from;
    }

    if (routeBack === null && placeCurrent.data) {
        routeBack = routes.makeRoute('place', [placeCurrent.data.slug]);
    }

    if (routeBack === null) {
        routeBack = routes.home;
    }

    function getNotifItemsUnread() {
        return notifItems.filter(v => !v.read_at);
    }

    function handleClickNotifOpener(e) {
        setNotifsOpen(notifsOpen => !notifsOpen);
        if (getNotifItemsUnread().length) {
            setTimeout(() => dispatch(notifActions.itemsMarkRead()), 2000);
        }
    }

    return (
        <header className="header-main">
            {routeBack &&
                <Link
                    to={routeBack}
                    className="btn btn-link mr-3"
                    >
                    <img src="/images/icon/arrow-left.svg" alt="back" />
                </Link>
            }
            {routeBack === null && history.length &&
                <button
                    className="btn btn-link mr-3"
                    onClick={(e) => history.goBack()}
                    >
                    <img src="/images/icon/arrow-left.svg" alt="back" />
                </button>
            }
            <hgroup>
                <h1 className="heading-h1 m-0">{headingTop}</h1>
                {headingBottom && <h2 className="heading-h2 m-0 mt-2">{headingBottom}</h2>}
            </hgroup>
            {user &&
                <Fragment>
                    <button
                        className="btn btn-link mr-1 ml-auto position-relative"
                        onClick={handleClickNotifOpener}
                        >
                        <img src="/images/icon/bell.svg" alt="notifs" />
                        {getNotifItemsUnread().length !== 0 &&
                            <span className="status text-warning spinner-grow"></span>
                        }
                    </button>
                    <Link
                        to={routes.profile}
                        className="btn btn-link"
                        >
                        <img src="/images/icon/user.svg" alt="profile" />
                    </Link>
                </Fragment>
            }
            {notifsOpen &&
                <div className="header-notifs">
                    <div className="header-notifs-inner rounded-lg shadow-btn-1 bg-light">
                        <div className="header-notifs-top text-center p-2 bg-primary text-white">
                            <h5 className="m-0">{''+notifItems.length+' '+t('последних')}</h5>
                            <div className="opacity-08">{t('уведомлений')}</div>
                        </div>
                        <div className="header-notifs-body">
                            {notifItems.length > 0 &&
                                <ul className="list-unstyled">
                                {notifItems.map(notif =>
                                    <li
                                        key={notif.id}
                                        className="header-notifs-item"
                                        role="button"
                                        >
                                        {notif.c_type === 'message-new' &&
                                            <Link
                                                to={routes.makeRoute('order', [notif.order_id])}
                                                className="d-flex"
                                                onClick={handleClickNotifOpener}
                                                >
                                                <span className="header-notifs-icon mt-1 ml-1">
                                                    <img src="/images/icon/messages.svg" alt="img" />
                                                </span>
                                                <div className="header-notifs-content ml-2 pl-1">
                                                    <div>
                                                        <small className="float-right text-nowrap mt-1">{fDate(notif.created_at)}</small>
                                                        <div className="font-weight-500 text-primary text-truncate mr-4">
                                                            {`Заказ №${notif.order_id}`}
                                                            <span
                                                                className={'header-notifs-status text-warning ml-2 fade'
                                                                    +(notif.read_at === 0 ? ' show' : '')
                                                                }
                                                                >{'\u25CF'}</span>
                                                        </div>
                                                    </div>
                                                    <small className="d-block text-truncate mr-3">{`Новое сообщение: ${notif.message.text}`}</small>
                                                </div>
                                            </Link>
                                        }
                                        {notif.c_type === 'status-new' &&
                                            <Link
                                                to={routes.makeRoute('order', [notif.order_id])}
                                                className="d-flex"
                                                onClick={handleClickNotifOpener}
                                                >
                                                <span className="header-notifs-icon mt-1 ml-1">
                                                    <img src="/images/icon/orders.svg" alt="img" />
                                                </span>
                                                <div className="header-notifs-content ml-2 pl-1">
                                                    <div>
                                                        <small className="float-right text-nowrap mt-1">{fDate(notif.created_at)}</small>
                                                        <div className="font-weight-500 text-primary text-truncate mr-4">
                                                            {`Заказ №${notif.order_id}`}
                                                            <span
                                                                className={'header-notifs-status text-warning ml-2 fade'
                                                                    +(notif.read_at === 0 ? ' show' : '')
                                                                }
                                                                >{'\u25CF'}</span>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={'badge badge-primary px-2 py-1 font-weight-500 badge-' + notif.orderStatus.color}
                                                        >{notif.orderStatus.name}</span>
                                                </div>
                                            </Link>
                                        }
                                    </li>
                                )}
                                </ul>
                            }
                            {!notifItems.length &&
                                <div className="py-3 text-center">{t('Пока нет уведомлений')}</div>
                            }
                        </div>
                    </div>
                    <div className="header-notifs-after"></div>
                </div>
            }
            {notifsOpen &&
                <div className="header-notifs-overlay fixed-top"
                    role="button"
                    onClick={handleClickNotifOpener}></div>
            }
        </header>
    );
}

export { Header };
