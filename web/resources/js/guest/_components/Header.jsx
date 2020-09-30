import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { routes } from '../_helpers';

function Header(props) {
    const user = useSelector(state => state.authentication.user);
    const location = useLocation();
    const history = useHistory();

    let routeBack = props.routeBack;
    if (!routeBack && location.state) {
        ({ from: routeBack } = location.state);
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
            {!routeBack && history.length &&
                <button
                    className="btn btn-link mr-3"
                    onClick={(e) => history.goBack()}
                    >
                    <img src="/images/icon/arrow-left.svg" alt="back" />
                </button>
            }
            <hgroup>
                <h1 className="heading-h1 m-0">{props.headingTop}</h1>
                {props.headingBottom && <h2 className="heading-h2 m-0 mt-2">{props.headingBottom}</h2>}
            </hgroup>
            {user &&
                <>
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
                </>
            }
        </header>
    );
}

export { Header };
