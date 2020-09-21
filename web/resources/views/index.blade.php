@extends('layouts.react')

@section('meta.title', 'Delta Order')

@section('content')
    <header class="logo-wrapper text-center pt-2 pb-4">
        <img src="/images/logo-delta.svg" class="logo-img"/>
        <hgroup>
            <h1 class="heading-h1 text-uppercase m-0">{{ __('Delta-order') }}</h1>
            <h2 class="heading-h2 m-0">{{ __('Система быстрых заказов') }}</h2>
        </hgroup>
    </header>
    <section class="home-page">
        <div class="content-wrapper">
            <h2 class="h5 mb-4">{{ __('Войти как:') }}</h2>
            <a href="/guest" class="btn btn-xlg btn-light btn-block mb-4 text-left shadow-btn-3 text-primary">
                <img class="mr-2" src="/images/icon/users.svg" alt="icon" />
                {{ __('Гость') }}
            </a>
            <a href="/worker" class="btn btn-xlg btn-light btn-block mb-4 text-left shadow-btn-3 text-primary">
                <img class="mr-2" src="/images/icon/menu.svg" alt="icon" />
                {{ __('Официант') }}
            </a>
            <a href="/manager" class="btn btn-xlg btn-light btn-block mb-4 text-left shadow-btn-3 text-primary">
                <img class="mr-2" src="/images/icon/settings.svg" alt="icon" />
                {{ __('Менеджер') }}
            </a>
        </div>
    </section>
@endsection
