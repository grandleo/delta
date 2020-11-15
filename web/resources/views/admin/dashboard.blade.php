@extends('layouts.admin')

@section('meta.title', 'Dashboard')

@section('content')
    <div class="row dashboard">
        <div class="col-12">
            <div class="row m-0 dashboard__header-info">
                <div class="col-2 d-flex align-items-center justify-content-center">
                    <div class="dashboard__header-info__item">
                        <span class="dashboard__header-info__item__title">Всего средств на счету</span>
                        <p class="dashboard__header-info__item__value font-weight-bold">100 000 Р</p>
                    </div>
                </div>
                <div class="col-2 d-flex align-items-center justify-content-center">
                    <div class="dashboard__header-info__item">
                        <span class="dashboard__header-info__item__title">Текущий процент</span>
                        <p class="dashboard__header-info__item__value">2 %</p>
                    </div>
                </div>
                <div class="col-2 d-flex align-items-center justify-content-center">
                    <div class="dashboard__header-info__item">
                        <span class="dashboard__header-info__item__title">Ваш заработок</span>
                        <p class="dashboard__header-info__item__value">2 000 Р</p>
                    </div>
                </div>
                <div class="col-auto d-flex align-items-center">
                    <div class="dashboard__header-info__item">
                        <span class="dashboard__header-info__item__title">Доход ресторанов</span>
                        <p class="dashboard__header-info__item__value">98 000 Р</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 dashboard__main-info">
            <div class="row">
                <div class="col-7">
                    <div class="dashboard__main-info___order-chart info-card">
                        <div class="info-card__header">
                            <div class="info-card__header__title">
                                <span>Сегодня 08 сентября, Вторник</span>
                            </div>
                            <div class="info-card__header__date-filter">
                                <div class="mr-2">
                                    <span>Show:</span>
                                </div>
                                <div class="dropdown">
                                    <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        This month
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-card__content log-history">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                                <li class="list-group-item">
                                    В <span>10:29:34</span> Казачий курень добавил новый товар Лапша Удон с Куринным мясом
                                </li>
                            </ul>
                            <div class="text-center mt-3">
                                <a href="">Show more</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="row">
                        <div class="col-12 mb-30">
                            <div class="dashboard__main-info___order-chart info-card">
                                <div class="info-card__header">
                                    <div class="info-card__header__title">
                                        <span>Заказы</span>
                                    </div>
                                    <div class="info-card__header__date-filter">
                                        <div class="mr-2">
                                            <span>Show:</span>
                                        </div>
                                        <div class="dropdown">
                                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                This month
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-card__content">
                                    <canvas id="orderChart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="dashboard__main-info___order-chart info-card">
                                <div class="info-card__header">
                                    <div class="info-card__header__title">
                                        <span>Общая стастика</span>
                                    </div>
                                    <div class="info-card__header__date-filter">
                                        <div class="mr-2">
                                            <span>Show:</span>
                                        </div>
                                        <div class="dropdown">
                                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                This month
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-card__content">
                                    <div class="row total-stats">
                                        <div class="col-6 total-stats__item">
                                            <div>
                                                <span>Всего заказов</span>
                                                <p>1 234</p>
                                            </div>
                                        </div>
                                        <div class="col-6 total-stats__item">
                                            <div>
                                                <span>На сумму</span>
                                                <p>522 211 Р</p>
                                            </div>
                                        </div>
                                        <div class="col-6 total-stats__item">
                                            <div>
                                                <span>Всего ресторанов</span>
                                                <p>123</p>
                                            </div>
                                        </div>
                                        <div class="col-6 total-stats__item">
                                            <div>
                                                <span>Всего гостей</span>
                                                <p>3 218</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

