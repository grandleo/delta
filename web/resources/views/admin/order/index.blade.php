@extends('layouts.admin')

@section('meta.title', 'Dashboard')

@section('content')
    <div class="row places wrapper-main">
        <div class="col-12">
            <p class="table-header__link"><a href="{{ route('admin.dashboard') }}">dashboard</a> / заказы</p>
            <div class="d-flex justify-content-between table-header">
                <div class="table-header__title">
                    <h3>Заказы</h3>
                </div>
            </div>
        </div>
        <div class="col-12 p-0">
            <div class="m-0 table-header__actions row w-100">
                <div class="col-2">
                    <div class="form-group">
                        <input class="form-control" type="date" placeholder="Поиск">
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group">
                        <input class="form-control" type="date" placeholder="Поиск">
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="Поиск по номеру или официанту">
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
                        <button class="btn btn-primary">Создать новый заказ</button>
                    </div>
                </div>
            </div>
        </div>
        <ul class="nav table-header__filter-nav">
            <li class="nav-item">
                <a class="nav-link active" href="#">все</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">ожидают обработки</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">готовятся</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">выполненные</a>
            </li>
        </ul>
        <div class="col-12">
            <div class="d-flex justify-content-between table-content">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ресторан</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Дата создания</th>
                        <th scope="col">Дата окончания</th>
                        <th scope="col">Длительность</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($orders as $order)
                        <tr>
                            <td scope="row">{{$order->id}}</td>
                            <td>{{$order->place->name}}</td>
                            <td>
                                @if($order->orderStatus)
                                    <span class="d-inline-block p-1 text-white rounded bg-{{$order->orderStatus->color}}">{{$order->orderStatus->name}}</span>
                                @endif
                            </td>
                            <td>{{$order->created_at}}</td>
                            <td></td>
                            <td>{{$order->amount . ' ' . $order->currency}}</td>
                            <td><a href="">Cкачать счет</a></td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{ $orders->links('vendor.pagination.bootstrap-4') }}
        </div>
    </div>
@endsection

