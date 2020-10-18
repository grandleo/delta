import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import { t, fileSrc, routes } from '../_helpers';
import { placeActions, cartActions } from '../_actions';
import { Header, CartInfoFixed, Link, LoadingCommon } from '../_components';

function PlacePage() {
    const { placeSlug } = useParams();
    const placeCurrent = useSelector(state => state.place.current);
    const cartPlacesTableId = useSelector(state => state.cart.placesTableId);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const table_id = qs.parse(location.search, { ignoreQueryPrefix: true }).t;

        if (table_id) {
            dispatch(cartActions.setTableId(placeSlug, table_id));
        }

        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug, {table_id: table_id || cartPlacesTableId[placeSlug]}));
        }
    }, []);

    return (
        <div className="home-page bg-light-1">
            <Header
                routeBack={routes.home}
                />
            <div className="content-wrapper">
                <h2 className="h4 mb-4 font-weight-600 text-primary">{t('Меню ресторана')}</h2>
                {placeCurrent.loading && <LoadingCommon />}
                {placeCurrent.error && <span className="text-danger">{t('Ошибка')}: {placeCurrent.error}</span>}
                {placeCurrent.data && (placeCurrent.data.productCategories.length ?
                    <div className="card-product-category-list">
                        {placeCurrent.data.productCategories.map((sCat) =>
                            <Link
                                key={sCat.id}
                                to={routes.makeRoute('placeProductCategory', [placeCurrent.data.slug, sCat.slug, sCat.id])}
                                className="card card-product-category shadow-btn-4 shadow-move"
                                >
                                <div className="bg-light embed-responsive embed-responsive-1by1">
                                    <img
                                        src={fileSrc(sCat.image)}
                                        className="card-img-top embed-responsive-item"
                                        alt={sCat.name}
                                        />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mb-1">{sCat.name}</h5>
                                    <p className="card-text">
                                        <small className="count">({sCat.count})</small>
                                    </p>
                                </div>
                            </Link>
                        )}
                    </div>
                    : <span className="text-primary">{t('Здесь пока ничего нет.')}</span>
                )}
            </div>
            <CartInfoFixed />
        </div>
    );
}

export { PlacePage };
