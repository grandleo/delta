@extends('layouts.admin')

@section('meta.title', 'Dashboard')

@section('content')
    <div class="row places wrapper-main">
        <div class="col-12">
            <p class="table-header__link"><a href="{{ route('admin.dashboard') }}">dashboard</a> / клиенты</p>
            <div class="d-flex justify-content-between table-header">
                <div class="table-header__title">
                    <h3>Гости</h3>
                </div>
            </div>
        </div>
        <div class="col-12 p-0">
            <div class="m-0 table-header__actions row w-100">
                <div class="col-3">
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="Поиск по фио или ресторану">
                        <a class="search-btn">
                            <img src="/images/icon/search-admin.svg" alt="">
                        </a>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <button class="btn btn-info">Применить</button>
                    </div>
                </div>

                <div class="col-auto">
                    <div class="form-group">
                        <button class="btn btn-primary">Создать клиента</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="d-flex justify-content-between table-content">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ФИО клиента</th>
                        <th scope="col">Телефон</th>
                        <th scope="col">Зарегистрирован</th>
                        <th scope="col">Заказов</th>
                        <th scope="col">На сумму</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($guests as $guest)
                        <tr>
                            <td scope="row">{{$guest->id}}</td>
                            <td>
                                <span>
                                    @if($guest->image)
                                        <img class="table-content__avatar-img" src="{{'/storage/' . $guest->image}}" alt="">
                                    @else
                                        <img class="table-content__avatar-img" src="/avatar.jpg" alt="">
                                    @endif
                                    {{$guest->name_full}}
                                </span>
                            </td>
                            <td>{{$guest->phone}}</td>
                            <td>{{$guest->created_at}}</td>
                            <td>{{$guest->orders->count()}}</td>
                            <td>
                                <a class="btn btn-sm btn-sm-control mr-1" href="#">
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
            {{ $guests->links('vendor.pagination.bootstrap-4') }}
        </div>
    </div>
@endsection

