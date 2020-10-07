import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, fMoney, fileSrc, routes } from '../_helpers';
import { placeActions } from '../_actions';

function HomePage() {
    const placesAll = useSelector(state => state.place.all);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!placesAll.data) {
            dispatch(placeActions.getAll());
        }
    }, []);

    return (
        <div className="home-page">
            <div className="content-wrapper">
                <h2 className="h5 font-weight-600 mb-3">{t('Рядом со мной')}</h2>
                {placesAll.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {placesAll.error && <span className="text-danger h4">{t('Ошибка')}: {placesAll.error}</span>}
                {placesAll.data && (placesAll.data.length ?
                    <div className="card-place-list">
                        {placesAll.data.map((place) =>
                            <Link
                                key={place.id}
                                to={routes.makeRoute('place', [place.slug])}
                                className="card card-place mb-3 shadow-btn-3 shadow-move"
                                >
                                <div className="row flex-nowrap no-gutters">
                                    <div className="col-auto">
                                        <img src={fileSrc(place.image)} className="img-free" alt={place.name} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title">{place.name}</h5>
                                            <p className="card-text mb-2 m-0">
                                                <span className="rating badge badge-warning mr-2">{place.rating_avg.toFixed(1)}</span>
                                                <span className="category">{place.placeCategory_name}</span>
                                            </p>
                                            <p className="descr card-text m-0 mb-2 pr-3">{place.descr_short}</p>
                                            <p className="card-text">
                                                <span className="prices badge">{t('От')+' '+fMoney(place.prices_from, place.currency)}</span>
                                                <span className="float-right">{place.works_from === place.works_until
                                                    ? t('Круглосуточно') : t('Работает до ')+place.works_until}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                    : <span className="text-primary">{t('Здесь пока ничего нет.')}</span>
                )}
                <div className="mt-5 text-center">
                    <a href="/" className="text-black-50">{t('Главная')}</a>
                </div>
            </div>
        </div>
    );
}

export { HomePage };
