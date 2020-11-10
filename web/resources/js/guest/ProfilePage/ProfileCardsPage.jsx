import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes, fetchClient } from '../_helpers';
import { Header } from '../_components';
import {paymentActions} from '../_actions';

function ProfileCardsPage() {
    const cards = useSelector(state => state.payment.cards);
    const dispatch = useDispatch();

    function addNewCard() {
      const requestOptions = {
        method: 'GET',
        url: 'payment/init',
      };

      return fetchClient()(requestOptions).then(res => {
        console.log(res);
      });
    }

    useEffect(() => {
      dispatch(paymentActions.getCardsList()).then(res => {
        console.log('cards', cards);
      });
    }, []);

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
                        <div className="number mt-5 pt-3"></div>
                        <div className="name mt-2">Peter Pan</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ProfileCardsPage };
