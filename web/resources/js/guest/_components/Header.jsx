import React from 'react';

function Header(props) {
    return (
        <header className="header-main">
            <hgroup>
                <h1 className="heading-h1">{props.headingTop}</h1>
                <h2 className="heading-h2 m-0">{props.headingBottom}</h2>
            </hgroup>
        </header>
    );
}

export { Header };
