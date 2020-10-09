import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { Header, ListSubheader } from '../_components';
import { productActions } from '../_actions';
import { productService } from '../_services';

const SortableDragHandle = sortableHandle(() => {
    return (
        <span className="btn pl-1 pr-2">
            <img src="/images/icon/drag.svg" alt="drag" />
        </span>
    );
});

const SortableItem = sortableElement(({value}) => {
    const { prCatId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);

    function handleDelete(prId) {
        if (!confirm(t('Вы уверены что хотите удалить это блюдо?'))) return;
        productService.destroy(prCatId, prId)
            .then((res) => {
                dispatch(productActions.index(prCatId));
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
                <h5
                    to={routes.makeRoute('prodList', [value.id])}
                    className="h5 m-0"
                    >
                    {value.name}
                </h5>
                <div className="small">{value.weight+' '+t('гр.')+' / '+value.waiting_minutes+' '+t('мин')}</div>
                <div className="font-weight-600">{fMoney(value.price, user.place.currency)}</div>
            </div>
            <div className="ml-auto">
                <Link
                    to={routes.makeRoute('prodEdit', [prCatId, value.id])}
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
        <div className="card-manager-product-category">
            {items.map((value, index) => (
                <SortableItem key={value.id} index={index} disabled={disabled} value={value} />
            ))}
        </div>
    );
});

function ProductPage() {
    const { prCatId } = useParams();
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [filterMode, setFilterMode] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const productAll = useSelector(state => state.product.all);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.index(prCatId));
    }, []);

    useEffect(() => {
        if (!productAll.data) {
            return;
        }
        setItems((items) => [...productAll.data]);
    }, [productAll.data]);

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
            product_category_id: prCatId,
            sort: itemsOld.map((v) => v.id),
        };
        productService.resort(resortData);
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
                headingTop={productAll.data ? productAll.productCategory.name : t('Загрузка...')}
                routeBack={routes.prodCatList}
                />
            <ListSubheader
                addNewRoute={routes.makeRoute('prodEdit', [prCatId, 0])}
                addNewText={t('Добавить блюдо')}
                filter={filter}
                filterMode={filterMode}
                handleFilterInputChange={handleFilterInputChange}
                handleFilterModeSwitch={handleFilterModeSwitch}
                />
            <div className="content-wrapper">
                {productAll.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {productAll.data &&
                    <Fragment>
                        {productAll.data.length ?
                            <SortableList
                                items={getFilteredItems()}
                                disabled={filterMode}
                                onSortEnd={handleSortEnd}
                                useDragHandle
                                />
                            : <span className="text-primary">{t('В этой пока категории нет ни одного блюда.')}</span>
                        }
                    </Fragment>
                }
            </div>
        </div>
    );
}

export { ProductPage };
