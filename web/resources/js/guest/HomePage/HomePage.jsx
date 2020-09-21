import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { placeActions } from '../_actions';

function HomePage() {
    const places = useSelector(state => state.places);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placeActions.getAll());
    }, []);

    return (
        <div className="home-page">
            <div className="content-wrapper">
                <h2 className="h5 mb-3">{t('Рядом со мной')}</h2>
                {places.loading &&
                    <div className="text-center">
                        <div className="spinner-border text-danger m-5" role="status">
                            <span className="sr-only">{t('Загрузка...')}</span>
                        </div>
                    </div>
                }
                {places.error && <span className="text-danger h4">Ошибка: {places.error}</span>}
                {places.items &&
                    places.items.map((place) =>
                        <Link
                            key={place.id}
                            to={'/'+place.slug}
                            className="card card-place mb-3 shadow-btn-3"
                        >
                            <div className="row no-gutters">
                                <div className="col-auto">
                                    <img src={`https://picsum.photos/130?random=${place.id}`} className="img-free" alt={place.name} />
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h5 className="card-title mb-1">{place.name}</h5>
                                        <p className="card-text m-0">{place.descr_short}</p>
                                        <p className="card-text">
                                            <span className="badge badge-light mr-2 py-1 px-2">{place.price_from}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export { HomePage };
