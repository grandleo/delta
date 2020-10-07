import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fileSrc, routes } from '../_helpers';
import { placeActions } from '../_actions';
import { Header, CartInfoFixed } from '../_components';

function PlacePage() {
    const { placeSlug } = useParams();
    const placeCurrent = useSelector(state => state.place.current);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug));
        }
    }, []);

    return (
        <div className="home-page bg-light-1">
            <Header
                routeBack={routes.home}
                headingTop={placeCurrent.data ? placeCurrent.data.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
                />
            <div className="content-wrapper">
                <h2 className="h4 mb-4 font-weight-600 text-primary">{t('Меню ресторана')}</h2>
                {placeCurrent.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
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
