import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t, routes } from '../_helpers';
import { Header } from '../_components';

function ProfileAddCardPage() {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  return (
    <div className="home-page">
      <Header
        routeBack={routes.profile}
        headingTop={t('Добавить новую карту')}
      />
      <div className="content-wrapper">
        <form action="">
          <div className="form-group form-label-group">
            <label htmlFor="current-form.date">{t('Имя держателя карты')}</label>
            <input
              id="current-form.date"
              type="text"
              name="date"
              placeholder={t('Дата')}
              className="form-control"
            />
          </div>
          <div className="form-group form-label-group">
            <label htmlFor="current-form.date">{t('Номер карты')}</label>
            <input
              id="current-form.date"
              type="text"
              name="date"
              placeholder={t('Дата')}
              className="form-control"
            />
          </div>
          <div className="form-group form-label-group">
            <label htmlFor="current-form.date">{t('Срок действия')}</label>
            <input
              id="current-form.date"
              type="text"
              name="date"
              placeholder={t('Дата')}
              className="form-control"
            />
          </div>
          <div className="form-group form-label-group">
            <label htmlFor="current-form.date">{t('CVC')}</label>
            <input
              id="current-form.date"
              type="text"
              name="date"
              placeholder={t('Дата')}
              className="form-control"
            />
          </div>
          <div className="form-group form-label-group">
            <button
              className="btn btn-block btn-lg btn-success btn-inset-border text-center text-white rounded-pill">
              {t('ИСПОЛЬЗОВАТЬ ЭТУ КАРТУ')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { ProfileAddCardPage };
