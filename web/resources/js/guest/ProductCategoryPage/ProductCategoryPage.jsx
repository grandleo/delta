import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { placeActions, productCategoryActions } from '../_actions';
import { Header, NavScroller, CartInfoFixed } from '../_components';
import { AddToCartButton } from './AddToCartButton';

function ProductCategoryPage() {
    const { placeSlug, productCategorySlug } = useParams();
    const placeCurrent = useSelector(state => state.place.current);
    const productCategory = useSelector(state => state.productCategory.current);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug));
        }
        dispatch(productCategoryActions.getById(productCategorySlug));
    }, [placeSlug, productCategorySlug]);

    return (
        <div className="home-page bg-light-1">
            <Header
                routeBack={routes.makeRoute('place', [placeCurrent.data ? placeCurrent.data.slug : ''])}
                headingTop={placeCurrent.data ? placeCurrent.data.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
                />
            <NavScroller
                links={placeCurrent.data
                    ? placeCurrent.data.productCategories.map((item) => ({
                        key: item.id,
                        text: item.name,
                        to: routes.makeRoute('placeProductCategory', [placeCurrent.data.slug, item.slug, item.id]),
                    }))
                    : []
                }
                />
            <div className="content-wrapper">
                <h2 className="h5 mb-4 font-weight-600 text-primary">
                    {productCategory.data ?
                        <>
                            {productCategory.data.name} <span className="opacity-03">({productCategory.data.count})</span>
                        </>
                        : t('Загрузка...')}
                </h2>
                {productCategory.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {productCategory.error && <span className="text-danger">{t('Ошибка')}: {productCategory.error}</span>}
                {productCategory.data && placeCurrent.data && (productCategory.data.products.length ?
                    <div className="card-product-list">
                        {productCategory.data.products.map((product) =>
                            <div
                                key={product.id}
                                className="card card-product mb-3 shadow-btn-3 shadow-move"
                                >
                                <div className="row flex-nowrap no-gutters">
                                    <div className="col-auto">
                                        <img
                                            src={fileSrc(product.image)}
                                            className="img-free"
                                            alt={product.name}
                                            />
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title mb-2 text-primary">{product.name}</h5>
                                            <p className="descr card-text mb-2">{product.descr_short}</p>
                                            <p className="card-text font-weight-600">
                                                {fMoney(product.price, placeCurrent.data.currency)}
                                                /
                                                {product.weight} гр.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <AddToCartButton
                                    placeId={placeCurrent.data.id}
                                    productId={product.id}
                                    productPrice={product.price}
                                    />
                            </div>
                        )}
                    </div>
                    : <span className="text-primary">{t('Здесь пока ничего нет.')}</span>
                )}
            </div>
            <CartInfoFixed />
        </div>
    );
}

export { ProductCategoryPage };
