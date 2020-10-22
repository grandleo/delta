@extends('layouts.landing')

@section('content')
    @include('blocks/landing/_header')

    @include('blocks/landing/_banner')

    @include('blocks/landing/_about')

    <div class="benefits_bg">
        @include('blocks/landing/_mobile')
        @include('blocks/landing/_benefits')
    </div>

    @include('blocks/landing/_savetime')

    @include('blocks/landing/_chathistory')

    @include('blocks/landing/_footer')
@endsection
