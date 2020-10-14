import React from 'react';
import { NavLink } from 'react-router-dom';

function NavScroller({ links, children }) {

    return (
        <div className="nav-scroller shadow-input-1">
            <nav className="nav">
                {links && links.map((link) =>
                    <NavLink
                        key={link.key}
                        to={link.to}
                        className="nav-link"
                        >
                        {link.text}
                    </NavLink>
                )}
                {children}
            </nav>
        </div>
    );
}

export { NavScroller };
