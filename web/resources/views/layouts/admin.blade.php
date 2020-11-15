<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="/favicon-60.png">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('meta.title')</title>
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
</head>
<body>
<div class="container-fluid p-0">
    @auth('admin')
        @include('admin.blocks._header')
    @endauth
    <div class="row no-gutters">
        <div class="col-auto">
            @auth('admin')
                @include('admin.blocks._sidebar')
            @endauth
        </div>
        <div class="col">
            <div class="row no-gutters">
                <div class="container-fluid ">
                    <div class="main">

                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/admin.js') }}"></script>
<script src="{{ asset('js/admin/main.js') }}"></script>
@yield('scripts')
</body>
</html>
