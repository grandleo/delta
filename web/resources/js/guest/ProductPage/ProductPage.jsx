import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { placeActions, productActions, cartActions } from '../_actions';
import { Header, NavScroller, CartInfoFixed, LoadingCommon } from '../_components';
import { QtyChanger } from './../CartPage/QtyChanger';
import { AddToCartButton } from './../ProductCategoryPage/AddToCartButton';

function ProductPage() {
    const { placeSlug, productSlug } = useParams();
    const placeCurrent = useSelector(state => state.place.current);
    const productCurrent = useSelector(state => state.product.current);
    const cartPlacesTableId = useSelector(state => state.cart.placesTableId);
    const cartPlaces = useSelector(state => state.cart.places);
    const dispatch = useDispatch();

    const placeId = placeCurrent.data ? placeCurrent.data.id : null;
    const product = productCurrent.data;

    useEffect(() => {
        if (!placeCurrent.data || placeCurrent.data.slug !== placeSlug) {
            dispatch(placeActions.getById(placeSlug, {table_id: cartPlacesTableId[placeSlug]}));
        }
        dispatch(productActions.show(productSlug));
    }, [placeSlug, productSlug]);

    const qtyInCart = placeId && product && cartPlaces
            && cartPlaces[placeId] && cartPlaces[placeId][product.id]
        ? cartPlaces[placeId][product.id].qty
        : 0;

    return (
        <div className="product-page">
            <Header
                routeBack={
                    placeCurrent.data && product
                        ? routes.makeRoute('placeProductCategory', [placeCurrent.data.slug, product.productCategory_slug, product.productCategory_id])
                        : null
                }
                />
            {product && placeCurrent.data &&
                <div className="product-image-wrapper">
                    <img
                        src={fileSrc(product.image)}
                        className="img-free"
                        alt={product.name}
                        />
                </div>
            }
            <div className="content-wrapper">
                {productCurrent.loading && <LoadingCommon />}
                {productCurrent.error && <span className="text-danger">{t('Ошибка')}: {productCurrent.error}</span>}
                {product && placeCurrent.data &&
                    <div className="card card-product p-4 shadow-btn-1 line-height-1">
                        <div className="d-flex justify-content-between">
                            <h2 className="text-primary line-height-1 font-weight-600">{product.name}</h2>
                            <span className="font-weight-600 mt-2">
                                {fMoney(product.price, placeCurrent.data.currency)}
                            </span>
                        </div>
                        <small>{product.productCategory_name}</small>
                        <div className="d-flex justify-content-between mt-3 px-4">
                            <div>
                                <img src="/images/icon/flame.svg" alt="weight" className="mr-2" />
                                {product.kcal+' '+t('кКал')}
                            </div>
                            <div>
                                <img src="/images/icon/counter.svg" alt="weight" className="mr-2" />
                                {product.weight+' '+t('гр.')}
                            </div>
                            <div>
                                <img src="/images/icon/clock.svg" alt="weight" className="mr-2" />
                                {product.waiting_minutes+' '+t('мин')}
                            </div>
                        </div>
                        <div className="mt-3">
                            <h4 className="font-weight-600 mb-1">{t('Описание:')}</h4>
                            <p className="pre-line">{product.descr_short}</p>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <QtyChanger
                                qty={qtyInCart}
                                handleChange={(changeQty) => {
                                    dispatch(cartActions.addToCart(placeCurrent.data.id, product.id, product.price, changeQty));
                                }}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <AddToCartButton
                                placeId={placeCurrent.data.id}
                                productId={product.id}
                                productPrice={product.price}
                                />
                        </div>
                    </div>
                }
            </div>
            <CartInfoFixed />
        </div>
    );
}

export { ProductPage };
