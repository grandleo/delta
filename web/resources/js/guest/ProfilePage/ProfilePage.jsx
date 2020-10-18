import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t, fileSrc, routes } from '../_helpers';
import { Header, Link } from '../_components';
import { userActions } from '../_actions';
import { imageService } from '../_services';

function ProfilePage() {
    const user = useSelector(state => state.authentication.user);
    const placeCurrent = useSelector(state => state.place.current);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [inputs, setInputs] = useState({
        name_full: user.name_full,
        image: user.image,
    });

    const links = [
        {to: placeCurrent.data ? routes.makeRoute('place', [placeCurrent.data.slug]) : routes.home,
            icon: 'orders.svg', text: t('В меню ресторана')},
        {to: routes.orders, icon: 'orders.svg', text: t('Заказы')},
        {to: routes.profileCards, icon: 'dollar-sign.svg', text: t('Платежные карты')},
    ];

    function handleChangeImage(e) {
        if (!e.target.files.length) {
            setInputs(inputs => ({ ...inputs, image: user.image }));
            return;
        }
        imageService.store('guest_image', user.id, e.target.files)
            .then((res) => {
                res && res[0] && setInputs(inputs => ({ ...inputs, image: res[0] }));
            });
    }

    function handleChange(e) {
        const { name } = e.target;
        const value = e.target.value;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(userActions.update(inputs))
            .then(res => setEditMode(false));
    }

    function handleLogoutClick(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <div className="home-page">
            <Header
                routeBack={null}
                headingTop={t('Профиль')}
                />
            <div className="content-wrapper">
                {!editMode &&
                    <div className="mt-4 text-center">
                        <img
                            src={fileSrc(user.image)}
                            alt="profile picture"
                            className="shadow-btn-3 rounded-circle"
                            style={{width:120, height: 120}}
                            />
                        <h5 className="mt-3 font-weight-bold">{user.name_full}</h5>
                        <button
                            className="btn btn-sm text-info"
                            onClick={(e) => setEditMode(true)}
                            >
                            {t('изменить')}
                        </button>
                    </div>
                }
                {editMode &&
                    <form className="mt-4 text-center" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="current-form.image"
                                type="file"
                                name="image_new"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={handleChangeImage}
                                className="d-none"
                                />
                            <label htmlFor="current-form.image"
                                role="button"
                                className="m-0 position-relative"
                                >
                                <img src={fileSrc(inputs.image)}
                                    alt="photo"
                                    className="shadow-btn-3 rounded-circle"
                                    style={{width:120, height:120}}
                                    />
                                <img src="/images/icon/pencil.svg" alt="edit"
                                    className="position-absolute p-1 rounded-circle bg-white"
                                    style={{right:0, bottom:0, width:33, height:33}}
                                    />
                            </label>
                        </div>
                        <div className="px-4">
                            <input
                                id="current-form.name_full"
                                name="name_full"
                                minLength="2"
                                maxLength="250"
                                required="required"
                                placeholder={t('ФИО')}
                                value={inputs.name_full}
                                onChange={handleChange}
                                className="form-control mt-3 font-weight-bold"
                                />
                        </div>
                        <button
                            className="btn btn-sm text-info mt-2"
                            >
                            {t('сохранить')}
                        </button>
                    </form>
                }


                <div className="mt-5 text-center">
                    {links.map(link =>
                        <Link key={link.to} to={link.to} className="btn btn-xlg btn-light btn-block mb-3 text-left shadow-btn-3 text-primary">
                            <img className="mr-2" src={`/images/icon/${link.icon}`} alt="icon" />
                            {link.text}
                        </Link>
                    )}
                </div>

                <div className="mt-5 pt-3 text-center">
                    <button
                        className="btn btn-link text-black-50"
                        onClick={handleLogoutClick}
                        >
                        {t('Выйти')}
                    </button>
                </div>

            </div>
        </div>
    );
}

export { ProfilePage };
