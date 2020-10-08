import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '../_helpers';

function ListSubheader(props) {

    if (props.filterMode) {
        return (
            <div className="d-flex justify-content-between p-2 text-white bg-dark">
                <div className="col-10 p-0 pl-1">
                    <input
                        autoComplete="off"
                        name="search"
                        placeholder={t('Слово для поиска')}
                        value={props.filter.search}
                        onChange={props.handleFilterInputChange}
                        className="form-control"
                        />
                </div>
                <button className="btn pb-2" onClick={props.handleFilterModeSwitch}>
                    <img src="/images/icon/arrow-left.svg" alt="done" className="transform-rotate-180deg" />
                </button>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-between p-2 text-white bg-dark">
            <Link to={props.addNewRoute}
                className="d-flex align-items-center m-0 text-white">
                <span className="btn mr-2 pb-2">
                    <img src="/images/icon/plus.svg" alt="plus" />
                </span>
                {props.addNewText}
            </Link>
            <button className="btn" onClick={props.handleFilterModeSwitch}>
                <img src="/images/icon/search.svg" alt="search" />
            </button>
        </div>
    );
}

export { ListSubheader };
