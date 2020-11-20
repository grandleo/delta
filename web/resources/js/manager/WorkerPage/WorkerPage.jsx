import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { Header, ListSubheader, LoadingCommon } from '../_components';
import { workerActions } from '../_actions';
import { workerService } from '../_services';

const SortableItem = ({value}) => {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    function handleDelete(id) {
        if (!confirm(t('Вы уверены что хотите удалить этого официанта?'))) return;
        workerService.destroy(id)
            .then((res) => {
                dispatch(workerActions.index());
            });
    }

    function handleRestore(id) {
        if (!confirm(t('Вы уверены что хотите восстановить этого официанта?'))) return;
        workerService.restore(id)
          .then((res) => {
              dispatch(workerActions.index());
          });
    }

    const worker_shift = user.place.worker_shifts.find((v) => value.shift_key === v.key);

    return (
        <div className="card-manager-product-category d-flex align-items-center rounded-065rem bg-light btn-block mb-3 shadow-btn-3 text-primary py-3 px-2">
            <div className="img-free-holder ml-2 mr-3 align-self-start rounded-circle bg-white">
                {value.image && <img src={fileSrc(value.image)} alt="image" className="img-fluid rounded-circle" />}
                <span className={'status ' + (value.active ? 'text-success' : 'text-black-50')}>{'\u25CF'}</span>
            </div>
            <div className="">
                <h5 className="h5">
                    {value.name_full}
                </h5>
                <div>
                    <span className="font-weight-500">
                        {t('Смена: ')}
                    </span>
                    {worker_shift ? `${worker_shift.name} (${worker_shift.from} - ${worker_shift.until})` : ''}
                </div>
                <div>
                    <span className="font-weight-500">
                        {t('Последний заказ: ')}
                    </span>
                </div>
                <div>
                    <span className="font-weight-500">
                        {t('Столы: ')}
                    </span>
                    {value.tables.map((v) => v.name).join(', ')}
                </div>
            </div>
            <div className="ml-auto text-nowrap">
                {value.deleted_at &&
                <button
                  onClick={(e) => handleRestore(value.id)}
                  className="btn btn-light btn-sm btn-sm-control mr-1"
                >
                    <img className="w-75" src="/images/icon/restore.svg" alt="restore" />
                </button> }

                {!value.deleted_at && <Link
                    to={routes.makeRoute('workerEdit', [value.id])}
                    className="btn btn-light btn-sm btn-sm-control mr-1"
                    >
                    <img src="/images/icon/pencil.svg" alt="edit" />
                </Link>}
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

function WorkerPage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [filterMode, setFilterMode] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const workerAll = useSelector(state => state.worker.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(workerActions.index());
    }, []);

    useEffect(() => {
        if (!workerAll.data) {
            return;
        }
        setItems((items) => [...workerAll.data]);
    }, [workerAll.data]);

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
                headingTop={t('Официанты')}
                routeBack={routes.home}
                />
            <ListSubheader
                addNewRoute={routes.makeRoute('workerEdit', [0])}
                addNewText={t('Добавить официанта')}
                filter={filter}
                filterMode={filterMode}
                handleFilterInputChange={handleFilterInputChange}
                handleFilterModeSwitch={handleFilterModeSwitch}
                />
            <div className="content-wrapper">
                {workerAll.loading && <LoadingCommon />}
                {workerAll.data &&
                    <Fragment>
                        {workerAll.data.length ?
                            <SortableList
                                items={getFilteredItems()}
                                />
                            : <span className="text-primary">{t('Официантов пока нет.')}</span>
                        }
                    </Fragment>
                }
            </div>
        </div>
    );
}

export { WorkerPage };
