import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { placeActions } from '../_actions';
import { Header, ServiceBuyButton } from '../_components';

function PlaceServiceCategoryPage() {
    const { placeSlug, serviceCategorySlug } = useParams();
    const places = useSelector(state => state.places);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placeActions.getServices(placeSlug, serviceCategorySlug));
    }, []);

    return (
        <div className="home-page">
            <Header
                headingTop={places.current ? places.current.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
            />
            <div className="content-wrapper">
                <h2 className="h5 mb-3">{places.currentServiceCategory ? places.currentServiceCategory.name : t('Загрузка...')}</h2>
                {places.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {places.error && <span className="text-danger">Ошибка: {places.error}</span>}
                {places.currentServiceCategory &&
                    <div className="row justify-content-between no-gutters">
                        {places.currentServiceCategory.services.map((service) =>
                            <div
                                key={service.id}
                                className="card card-service mb-3 shadow-btn-3"
                            >
                                <div className="row no-gutters">
                                    <div className="col-auto">
                                        <img src={`https://picsum.photos/130?random=${service.id}`} className="img-free" alt={service.name} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title mb-1">{service.name}</h5>
                                            <p className="card-text m-0"><small>{service.descr_short}</small></p>
                                            <p className="card-text">
                                                <b>{service.price} ₽ / {service.wight} гр.</b>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <ServiceBuyButton serviceId={service.id} />
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export { PlaceServiceCategoryPage };
