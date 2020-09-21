import React from 'react';
import { render } from 'react-dom';

render(
    <div className="home-page">
        <div className="content-wrapper">
            <h2 className="h5 mb-3">В разработке</h2>
            <a href="/">Назад</a>
        </div>
    </div>
    ,
    document.getElementById('app')
);
