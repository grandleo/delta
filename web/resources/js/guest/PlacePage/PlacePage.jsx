import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { placeActions } from '../_actions';
import { Header } from '../_components';

function PlacePage() {
    const { placeSlug } = useParams();
    const places = useSelector(state => state.places);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placeActions.getById(placeSlug));
    }, []);

    return (
        <div className="home-page">
            <Header
                headingTop={places.current ? places.current.name : t('Загрузка...')}
                headingBottom={t('Предзаказ')}
            />
            <div className="content-wrapper">
                <h2 className="h5 mb-3">{t('Меню ресторана')}</h2>
                {places.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {places.error && <span className="text-danger">Ошибка: {places.error}</span>}
                {places.current &&
                    <div className="card-service-category-list">
                        {places.current.service_categories.map((sCat) =>
                            <Link
                                key={sCat.id}
                                to={`/${places.current.slug}/${sCat.slug}`}
                                className="card card-service-category"
                            >
                                <img src={`https://picsum.photos/160?random=${sCat.id}`} className="card-img-top" alt={sCat.name} />
                                <div className="card-body">
                                    <h5 className="card-title mb-1">{sCat.name}</h5>
                                    <p className="card-text">
                                        <small className="text-muted">({sCat.count})</small>
                                    </p>
                                </div>
                            </Link>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export { PlacePage };
