@extends('layouts.admin')

@section('meta.title', 'Dashboard')

@section('content')
    <div class="row places wrapper-main">
        <div class="col-12">
            <div class="d-flex justify-content-between table-header">
                <div class="table-header__title">
                    <h3>Заведения</h3>
                </div>
                <div class="table-header__btn">
                    <button class="btn btn-primary">Добавить заведение</button>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="mt-4">
                <p class="mb-0">Всего ресторанов</p>
                <h4 class="font-size-36 dark-blue font-weight-900">{{$places->count()}}</h4>
            </div>
            <div class="d-flex justify-content-between table-content">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название заведения</th>
                        <th scope="col">Название заведения</th>
                        <th scope="col">Login</th>
                        <th scope="col">Создан</th>
                        <th scope="col">Средств на счету</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($places as $place)
                        <tr>
                            <td scope="row">{{$place->id}}</td>
                            <td>{{$place->name}}</td>
                            <td>{{$place->manager->name}}</td>
                            <td>{{$place->slug}}</td>
                            <td>{{$place->created_at}}</td>
                            <td>{{isset($place->params['rating_avg']) ? $place->params['rating_avg'] : 0 }} P / {{isset($place->params['prices_from']) ? $place->params['prices_from'] : 0 }}</td>
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
        </div>
    </div>
@endsection

