import React, { Fragment } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { Link } from './Link';
import { t, routes } from '../_helpers';

function Header(props) {
    const user = useSelector(state => state.authentication.user);
    const placeCurrent = useSelector(state => state.place.current);
    const location = useLocation();
    const history = useHistory();

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
        routeBack = routes.makeRoute('place', [placeCurrent.data.id]);
    }

    if (routeBack === null) {
        routeBack = routes.home;
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
                        className="btn btn-link mr-1 ml-auto"
                        >
                        <img src="/images/icon/bell.svg" alt="notifs" />
                    </button>
                    <Link
                        to={routes.profile}
                        className="btn btn-link"
                        >
                        <img src="/images/icon/user.svg" alt="profile" />
                    </Link>
                </Fragment>
            }
        </header>
    );
}

export { Header };
