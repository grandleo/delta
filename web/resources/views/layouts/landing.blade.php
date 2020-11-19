<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="icon" type="image/png" href="/favicon-60.png">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('meta.title')</title>

    <meta name="description" content="@yield('meta.description')">

    <!-- Styles -->
    <link href="{{ asset('css/landing.css') }}" rel="stylesheet">
</head>
<body>
    @yield('content')

    @yield('scripts')
    <script src="{{ asset('js/landing/main.js') }}"></script>
</body>
</html>
