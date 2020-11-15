@extends('layouts.admin')

@section('meta.title', 'Dashboard')

@section('content')
    <div class="row justify-content-center">
        <div class="col-3">

            <div class="login-page logo-wrapper text-center">
                <img src="/images/logo-delta.svg" class="logo-img">
                <div>
                    <h1 class="heading-h1 text-uppercase m-0">Delta-order</h1>
                    <h2 class="heading-h2 m-0">Система быстрых заказов</h2>
                </div>
                <form class="form-1 text-left mt-5" method="post">
                    <input name="_token" type="hidden" value="{{ csrf_token() }}"/>
                    <div class="form-group form-label-group">
                        <input required id="login" type="text" name="username" placeholder="Email" class="form-control"
                               value="">
                        <label htmlFor="login">Email</label>

                    </div>
                    <div class="form-group form-label-group">
                        <input required id="password" type="password" name="password" placeholder="Пароль"
                               class="form-control" value="">
                        <label htmlFor="password">Password</label>

                    </div>
                    <div class="form-group mt-4">
                        <button class="login-button text-white btn btn-lg btn-success btn-block rounded-pill">Войти
                        </button>
                    </div>
                </form>
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
        </div>
    </div>

@endsection

