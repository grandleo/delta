import React from 'react';
import { NavLink } from 'react-router-dom';

function NavScroller({ links }) {

    return (
        <div className="nav-scroller shadow-input-1">
            <nav className="nav">
                {links.map((link) =>
                    <NavLink
                        key={link.key}
                        to={link.to}
                        className="nav-link"
                        >
                        {link.text}
                    </NavLink>
                )}
            </nav>
        </div>
    );
}

export { NavScroller };
