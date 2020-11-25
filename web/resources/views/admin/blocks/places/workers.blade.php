<div class="col-12 mt-5">
    <div class="d-flex justify-content-between table-header">
        <div class="m-0 table-header__actions row w-100">
            <div class="table-header__title col">
                <h3>Список официантов</h3>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <input class="form-control" id="placeWorkersTableSearch" type="text" placeholder="Поиск">
                    <a class="search-btn">
                        <img src="/images/icon/search-admin.svg" alt="">
                    </a>
                </div>
            </div>
            <div class="col-auto">
                <div class="table-header__actions">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#addEditWorkerModal">+ Добавить официанта</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-12">
    @if($place->workers->count())
        <div class="d-flex justify-content-between table-content">
        <table class="table" id="placeWorkersTable">
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
                    <td>{{date('m-d-yy', strtotime($worker->created_at))}}</td>
                    <td>{{$worker->worker_shift() ? $worker->worker_shift()['name'] . ' (' . $worker->worker_shift()['from'] . ' - ' . $worker->worker_shift()['until'] . ')'  : ""}}</td>
                    <td>{{$worker->phone}}</td>
                    <td>
                        @if($worker->deleted_at)
                            <button data-id="{{$worker->id}}" type="button" class="restore-place-worker btn btn-sm btn-sm-control mr-1" href="{{ route('admin.places.show', ['place' => $place->id]) }}">
                                <img class="w-75" src="/images/icon/restore.svg" alt="restore" />
                            </button>
                        @else
                            <a data-id="{{$worker->id}}" class="btn btn-sm btn-sm-control mr-1" href="{{ route('admin.places.show', ['place' => $place->id]) }}">
                                <img src="/images/icon/pencil.svg" alt="edit"/>
                            </a>
                        @endif
                        <button data-id="{{$worker->id}}" class="delete-place-worker btn btn-light btn-sm btn-sm-control">
                            <img src="/images/icon/trash.svg" alt="delete"/>
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    @else
        <div class="mt-5">
            <p class="text-center">Официантов пока нет.</p>
        </div>
    @endif
</div>
<div class="modal fade" id="addEditWorkerModal" tabindex="-1" aria-labelledby="addEditWorkerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="addEditWorkerModalLabel">Добавить официанта</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="form-1" id="createPlaceWorkerForm">
                    @csrf
                    <input type="hidden" id="placeWorkerID" value="0" required class="form-control" name="worker_id">
                    <input type="hidden" value="{{$place->id}}" required class="form-control" name="place_id">
                    <legend class="col-form-label font-weight-bold">Общая информация</legend>
                    <div class="form-group form-control-manager-image w-25">
                        <input
                                id="placeWorkerImageUpload"
                                type="file"
                                name="image"
                                accept="image/x-png,image/gif,image/jpeg"
                                class="d-none"
                        />
                        <label for="placeWorkerImageUpload" id="placeWorkerNewImageLabel" role="button" class="d-none m-0 py-1 text-center">
                            <img alt="photo" class="img-fluid" id="placeWorkerNewImage"/>
                        </label>
                        <label for="placeWorkerImageUpload" role="button" class="m-0 p-5 text-center">
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
                        <input required type="text" name="name_full" class="form-control" id="nameFull" placeholder="ФИО *">
                        <label for="nameFull">ФИО *</label>
                    </div>
                    <div class="form-group form-label-group">
                        <input required type="text" name="name" class="form-control" id="name" placeholder="Краткое имя (для отображения в чате) *">
                        <label for="name">Краткое имя (для отображения в чате) *</label>
                    </div>
                    <div class="form-group form-label-group">
                        <select name="shift_key" required class="form-control" id="exampleFormControlSelect1">
                            <option value="" selected disabled>Смена *</option>
                            @foreach($place->worker_shifts as $worker_shift)
                                <option value="{{$worker_shift['key']}}">{{$worker_shift['name'] . '(' . $worker_shift['from'] . ' - ' . $worker_shift['until'] . ')' }}</option>
                            @endforeach
                        </select>
                        <label for="exampleFormControlSelect1">Смена *</label>
                    </div>
                    <legend class="col-form-label font-weight-bold">Контактная информация (на будущее)</legend>
                    <div class="form-group form-label-group">
                        <input type="text" name="phone" class="form-control" id="exampleFormControlInput1" placeholder="Телефон">
                        <label for="exampleFormControlSelect1">Телефон</label>
                    </div>
                    <div class="form-group form-label-group">
                        <input type="text" name="card_number" class="form-control" id="exampleFormControlInput1" placeholder="Номер карты">
                        <label for="exampleFormControlSelect1">Номер карты</label>
                    </div>

                    <legend class="col-form-label font-weight-bold">Данные для авторизации в системе</legend>
                    <div class="form-group form-label-group">
                        <input required name="email" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Email *">
                        <label for="exampleFormControlSelect1">Email *</label>
                    </div>
                    <div class="form-group form-label-group">
                        <input required name="password" type="password" class="form-control" id="exampleFormControlInput1" placeholder="Пароль *">
                        <label for="exampleFormControlSelect1">Пароль *</label>
                    </div>

                    <div class="form-group form-label-group">
                        <input required name="password_confirmation" type="password" class="form-control" id="exampleFormControlInput1" placeholder="Повторите пароль *">
                        <label for="exampleFormControlSelect1">Повторите пароль *</label>
                    </div>
                    <div class="form-group mt-4">
                        <div class="d-flex justify-content-between align-items-center line-height-1">
                            <div>
                                <label role="button" for="isActiveWorker">Возможность авторизоваться</label>
                            </div>
                            <div class="form-control-switch-checkbox custom-control custom-switch">
                                <input id="isActiveWorker" type="checkbox" name="active" class="custom-control-input"/>
                                <label role="button" for="isActiveWorker" class="custom-control-label"></label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-4">
                        <div class="d-flex justify-content-between align-items-center line-height-1">
                            <div>
                                <label role="button" for="placeWorkerSeeAllOrders">Все заказы</label>
                            </div>
                            <div class="form-control-switch-checkbox custom-control custom-switch">
                                <input id="placeWorkerSeeAllOrders" type="checkbox" name="orders_see_all" class="custom-control-input"/>
                                <label role="button" for="placeWorkerSeeAllOrders" class="custom-control-label"></label>
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
