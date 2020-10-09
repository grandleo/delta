import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { Header, ListSubheader, LoadingCommon } from '../_components';
import { tableActions } from '../_actions';
import { tableService } from '../_services';

const SortableItem = ({value}) => {
    const dispatch = useDispatch();

    function handleDelete(id) {
        if (!confirm(t('Вы уверены что хотите удалить этот стол?'))) return;
        tableService.destroy(id)
            .then((res) => {
                dispatch(tableActions.index());
            });
    }

    return (
        <div className="card-manager-product-category d-flex align-items-center rounded-065rem bg-light btn-block mb-3 shadow-btn-3 text-primary py-3 px-2">
            <div className="position-relative mr-3 pr-3">
                <span className={'status ' + (value.active ? 'text-success' : 'text-black-50')}>{'\u25CF'}</span>
            </div>
            <div className="">
                <h5 className="h5 m-0">
                    {value.name}
                </h5>
            </div>
            <div className="ml-auto">
                <Link
                    to={routes.makeRoute('tableEdit', [value.id])}
                    className="btn btn-light btn-sm btn-sm-control mr-1"
                    >
                    <img src="/images/icon/pencil.svg" alt="edit" />
                </Link>
                <button
                    onClick={(e) => handleDelete(value.id)}
                    className="btn btn-light btn-sm btn-sm-control"
                    >
                    <img src="/images/icon/trash.svg" alt="delete" />
                </button>
            </div>
        </div>
    );
};

const SortableList = ({items, disabled}) => {
    return (
        <div className="card-manager-product-category">
            {items.map((value, index) => (
                <SortableItem key={value.id} index={index} disabled={disabled} value={value} />
            ))}
        </div>
    );
};

function TablePage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [filterMode, setFilterMode] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const tableAll = useSelector(state => state.table.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tableActions.index());
    }, []);

    useEffect(() => {
        if (!tableAll.data) {
            return;
        }
        setItems((items) => [...tableAll.data]);
    }, [tableAll.data]);

    function getFilteredItems() {
        if (!filterMode || !filter.search) {
            return items;
        }
        return items.filter((v) => {
            return v.name.indexOf(filter.search) > -1;
        });
    }

    function handleFilterInputChange(e) {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? +e.target.checked : e.target.value;
        setFilter(filter => ({ ...filter, [name]: value }));
    }

    function handleFilterModeSwitch(e) {
        setFilterMode(filterMode => (!filterMode));
    }

    return (
        <div className="home-page">
            <Header
                headingTop={t('Столы')}
                routeBack={routes.home}
                />
            <ListSubheader
                addNewRoute={routes.makeRoute('tableEdit', [0])}
                addNewText={t('Добавить стол')}
                filter={filter}
                filterMode={filterMode}
                handleFilterInputChange={handleFilterInputChange}
                handleFilterModeSwitch={handleFilterModeSwitch}
                />
            <div className="content-wrapper">
                {tableAll.loading && <LoadingCommon />}
                {tableAll.data &&
                    <Fragment>
                        {tableAll.data.length ?
                            <SortableList
                                items={getFilteredItems()}
                                />
                            : <span className="text-primary">{t('Столов пока нет.')}</span>
                        }
                    </Fragment>
                }
            </div>
        </div>
    );
}

export { TablePage };
