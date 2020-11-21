<div class="col-12 mt-5">
    <div class="d-flex justify-content-between table-header">
        <div class="m-0 table-header__actions row w-100">
            <div class="table-header__title col">
                <h3>Список официантов</h3>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <input class="form-control" type="text" placeholder="Поиск">
                    <a class="search-btn">
                        <img src="/images/icon/search-admin.svg" alt="">
                    </a>
                </div>
            </div>
            <div class="col-auto">
                <div class="table-header__actions">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#addWorkerModal">+ Добавить официанта</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-12">
    @if($place->workers->count())
        <div class="d-flex justify-content-between table-content">

        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">ФИО официанта</th>
                <th scope="col">login / e-mail</th>
                <th scope="col">Создан</th>
                <th scope="col">Режим работы</th>
                <th scope="col">Телефон</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            @foreach($place->workers as $worker)
                <tr>
                    <td scope="row">{{$worker->id}}</td>
                    <td>{{$worker->name}}</td>
                    <td>{{$worker->email}}</td>
                    <td>{{$worker->created_at}}</td>
                    <td>{{$worker->worker_shift() ? $worker->worker_shift()['name'] : ""}}</td>
                    <td>{{$worker->phone}}</td>
                    <td>
                        <a class="btn btn-sm btn-sm-control mr-1" href="{{ route('admin.places.show', ['place' => $place->id]) }}">
                            <img src="/images/icon/pencil.svg" alt="edit"/>
                        </a>
                        <button class="btn btn-light btn-sm btn-sm-control">
                            <img src="/images/icon/trash.svg" alt="delete"/>
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    @else
        <div class="d-flex justify-content-between table-content">
            <p>no data</p>
        </div>
    @endif
</div>

<div class="modal fade" id="addWorkerModal" tabindex="-1" aria-labelledby="addWorkerModal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="addTableModalLabel">Добавить официанта</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="form-1">
                    <legend class="col-form-label font-weight-bold">Общая информация</legend>
                    <div class="form-group form-control-manager-image w-25">
                        <input
                                id="current-form.image"
                                type="file"
                                name="image_new"
                                accept="image/x-png,image/gif,image/jpeg"
                                class="d-none"
                        />
{{--                        <label for="current-form.image" role="button" class="d-block m-0 py-2 text-center">--}}
{{--                            <img alt="photo" class="img-fluid" />--}}
{{--                        </label>--}}
                        <label for="current-form.image" role="button" class="d-block m-0 py-4 text-center">
                            + Прикрепите фото
                        </label>
                    </div>

                    <div class="form-group form-label-group">
                        <select class="form-control" id="exampleFormControlSelect1">
                                <option value="" selected disabled>Ресторан (на будущее)</option>
                                <option value="">fds</option>
                        </select>
                        <label for="exampleFormControlSelect1">Ресторан (на будущее)</label>
                    </div>
                    <div class="form-group form-label-group">
                        <input required type="text" class="form-control" id="exampleFormControlInput1" placeholder="ФИО *">
                        <label for="exampleFormControlSelect1">ФИО *</label>
                    </div>
                    <div class="form-group form-label-group">
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option value="" selected disabled>Смена *</option>
                            <option value="">fds</option>
                        </select>
                        <label for="exampleFormControlSelect1">Смена *</label>
                    </div>
                    <legend class="col-form-label font-weight-bold">Контактная информация (на будущее)</legend>
                    <div class="form-group form-label-group">
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Телефон">
                        <label for="exampleFormControlSelect1">Телефон</label>
                    </div>
                    <div class="form-group form-label-group">
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты">
                        <label for="exampleFormControlSelect1">Номер карты</label>
                    </div>

                    <legend class="col-form-label font-weight-bold">Данные для авторизации в системе</legend>
                    <div class="form-group form-label-group">
                        <input required type="text" class="form-control" id="exampleFormControlInput1" placeholder="Логин *">
                        <label for="exampleFormControlSelect1">Логин *</label>
                    </div>
                    <div class="form-group form-label-group">
                        <input required type="text" class="form-control" id="exampleFormControlInput1" placeholder="Пароль *">
                        <label for="exampleFormControlSelect1">Пароль *</label>
                    </div>

                    <div class="form-group form-label-group">
                        <input required type="text" class="form-control" id="exampleFormControlInput1" placeholder="Повторите пароль *">
                        <label for="exampleFormControlSelect1">Повторите пароль *</label>
                    </div>
                    <div class="form-group mt-4">
                        <div class="d-flex justify-content-between align-items-center line-height-1">
                            <div>
                                <label role="button" for="active">Возможность авторизоваться</label>
                            </div>
                            <div class="form-control-switch-checkbox custom-control custom-switch">
                                <input id="active" type="checkbox" name="active" class="custom-control-input"/>
                                <label role="button" for="active" class="custom-control-label"></label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-4">
                        <div class="d-flex justify-content-between align-items-center line-height-1">
                            <div>
                                <label role="button" for="seeAllOrders">Все заказы</label>
                            </div>
                            <div class="form-control-switch-checkbox custom-control custom-switch">
                                <input id="seeAllOrders" type="checkbox" name="active" class="custom-control-input"/>
                                <label role="button" for="seeAllOrders" class="custom-control-label"></label>
                            </div>
                        </div>
                    </div>
                    <div class="w-100 mt-5 form-btn px-0 d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
                        <button type="submit" class="btn btn-primary">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
