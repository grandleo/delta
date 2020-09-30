import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { Header } from '../_components';
import { userActions } from '../_actions';

function ProfileCardsPage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    return (
        <div className="home-page">
            <Header
                routeBack={routes.profile}
                headingTop={t('Платежные карты')}
                />
            <div className="content-wrapper">
                <div className="card-profile-card-list mt-4">
                    <div
                        className="card-profile-card h2 font-weight-normal text-white pt-4 px-4"
                        style={{
                            height: '190px',
                            background: 'linear-gradient(90deg, #B993D6 0%, #8CA6DB 100%)',
                            borderRadius: '8px',
                        }}
                        >
                        <div className="number mt-5 pt-3">4747 **** **** 5251</div>
                        <div className="name mt-2">Peter Pan</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export { ProfileCardsPage };
