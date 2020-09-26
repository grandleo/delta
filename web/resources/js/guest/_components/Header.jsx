import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header-main">
            {props.routeBack &&
                <Link
                    to={props.routeBack}
                    className="btn btn-link mr-3"
                    >
                    <img src="/images/icon/arrow-left.svg" alt="back" />
                </Link>
            }
            <hgroup>
                <h1 className="heading-h1">{props.headingTop}</h1>
                <h2 className="heading-h2 m-0">{props.headingBottom}</h2>
            </hgroup>
        </header>
    );
}

export { Header };
