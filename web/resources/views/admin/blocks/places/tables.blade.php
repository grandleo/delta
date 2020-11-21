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
        <div class="d-flex justify-content-between table-content">
            <p>no data</p>
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
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ID">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Номер стола">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Закрепленный официант</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            @foreach($place->workers as $worker)
                                <option value="{{$worker->id}}">{{$worker->name}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label for="">
                            Доступность стола для заказа
                            <input type="checkbox">
                        </label>
                    </div>
                    <div class="w-100 form-btn px-0 d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
                        <button type="button" class="btn btn-primary">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
