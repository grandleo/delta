import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { t, fileSrc, routes } from '../_helpers';
import { Header, ListSubheader, LoadingCommon } from '../_components';
import { productCategoryActions } from '../_actions';
import { productCategoryService } from '../_services';

const SortableDragHandle = sortableHandle(() => {
    return (
        <span className="btn pl-1 pr-2">
            <img src="/images/icon/drag.svg" alt="drag" />
        </span>
    );
});

const SortableItem = sortableElement(({value}) => {
    const dispatch = useDispatch();

    function handleDelete(prCatId) {
        if (!confirm(t('Вы уверены что хотите удалить эту категорию?'))) return;
        productCategoryService.destroy(prCatId)
            .then((res) => {
                dispatch(productCategoryActions.index());
            });
    }

    return (
        <div className="card-manager-product-category d-flex align-items-center rounded-065rem bg-light btn-block mb-3 shadow-btn-3 text-primary py-3 px-2">
            <SortableDragHandle />
            <div className="img-free-holder mr-2 rounded bg-white">
                {value.image && <img src={fileSrc(value.image)} alt="image" className="img-fluid rounded" />}
                <span className={'status ' + (value.active ? 'text-success' : 'text-black-50')}>{'\u25CF'}</span>
            </div>
            <div className="">
                <Link
                    to={routes.makeRoute('prodList', [value.id])}
                    className="h5 m-0"
                    >
                    {value.name}
                </Link>
                <div>{t('Количество блюд')+': '+value.count}</div>
            </div>
            <div className="ml-auto text-nowrap">
                <Link
                    to={routes.makeRoute('prodCatEdit', [value.id])}
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
});

const SortableList = sortableContainer(({items, disabled}) => {
    return (
        <div className="card-manager-product-category-list">
            {items.map((value, index) => (
                <SortableItem key={value.id} index={index} disabled={disabled} value={value} />
            ))}
        </div>
    );
});

function ProductCategoryPage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [filterMode, setFilterMode] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const productCategoryAll = useSelector(state => state.productCategory.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productCategoryActions.index());
    }, []);

    useEffect(() => {
        if (!productCategoryAll.data) {
            return;
        }
        setItems((items) => [...productCategoryAll.data]);
    }, [productCategoryAll.data]);

    function getFilteredItems() {
        if (!filterMode || !filter.search) {
            return items;
        }
        return items.filter((v) => {
            return v.name.indexOf(filter.search) > -1;
        });
    }

    function handleSortEnd({oldIndex, newIndex}) {
        const itemsOld = [...items];
        itemsOld.splice(newIndex, 0, itemsOld.splice(oldIndex, 1)[0])
        setItems((items) => [...itemsOld]);

        const resortData = {
            place_id: user.place.id,
            sort: itemsOld.map((v) => v.id),
        };
        productCategoryService.resort(resortData);
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
                headingTop={t('Категории меню')}
                routeBack={routes.home}
                />
            <ListSubheader
                addNewRoute={routes.makeRoute('prodCatEdit', [0])}
                addNewText={t('Новая категория')}
                filter={filter}
                filterMode={filterMode}
                handleFilterInputChange={handleFilterInputChange}
                handleFilterModeSwitch={handleFilterModeSwitch}
                />
            <div className="content-wrapper">
                {productCategoryAll.loading && <LoadingCommon />}
                {productCategoryAll.data &&
                    <Fragment>
                        {productCategoryAll.data.length ?
                            <SortableList
                                items={getFilteredItems()}
                                disabled={filterMode}
                                onSortEnd={handleSortEnd}
                                useDragHandle
                                />
                            : <span className="text-primary">{t('Вы ещё не создали ни одной категории.')}</span>
                        }
                    </Fragment>
                }
            </div>
        </div>
    );
}

export { ProductCategoryPage };
