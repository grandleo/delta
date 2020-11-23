<div class="col-12 mt-5">
    <div class="row justify-content-between table-header">
        <div class="m-0 table-header__actions row w-100">
            <div class="table-header__title col">
                <h3>Столы</h3>
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
                    <button class="btn btn-primary" data-toggle="modal" data-target="#addTableModal">+ Добавить стол</button>
                </div>
            </div>
        </div>

    </div>
</div>
<div class="col-12">
    @if($place->tables->count())
        <div class="d-flex justify-content-between table-content">

            <table class="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th>Номер стола</th>
                    <th>Закрепленный официант</th>
                    <th>Создан</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($place->tables as $table)
                    <tr>
                        <td scope="row">{{$table->id}}</td>
                        <td>{{$table->name}}</td>
                        <td>
                            @foreach($table->workers as $worker)
                                <p class="m-0">{{$worker->name_full}}</p>
                            @endforeach
                        </td>
                        <td>{{$table->created_at}}</td>
                        <td>{{$table->status}}</td>
                        <td>
                            <a class="btn btn-sm btn-sm-control mr-1">
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
        <div class="mt-5">
            <p class="text-center">Столов пока нет.</p>
        </div>
    @endif
</div>

<div class="modal fade" id="addTableModal" tabindex="-1" aria-labelledby="addTableModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="addTableModalLabel">Добавить стол</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="form-1" id="createTableForm">
                    @csrf
                    <input type="hidden" value="{{$place->id}}" required class="form-control" name="place_id">

                    <div class="form-group form-label-group">
                        <input type="text" required class="form-control" id="id" placeholder="ID" name="marker_code">
                        <label for="id">ID</label>

                    </div>
                    <div class="form-group form-label-group">
                        <input name="name" type="text" class="form-control" id="name" placeholder="Номер стола">
                        <label for="name">Номер стола</label>
                    </div>
                    <div class="form-group">
                        <select name="workers[]" id="workers" multiple class="selectpicker">
                            @foreach($place->workers as $worker)
                                <option value="{{$worker->id}}">{{$worker->name}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group mt-4">
                        <div class="d-flex justify-content-between align-items-center line-height-1">
                            <div>
                                <label role="button" for="isActive">Доступность стола для заказа</label>
                            </div>
                            <div class="form-control-switch-checkbox custom-control custom-switch">
                                <input value="0" id="isActive" type="checkbox" name="active" class="custom-control-input"/>
                                <label role="button" for="isActive" class="custom-control-label"></label>
                            </div>
                        </div>
                    </div>
                    <div class="w-100 form-btn px-0 d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
                        <button type="submit" class="btn btn-primary">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
