@extends('layouts.admin')

@section('meta.title', 'Dashboard')

@section('content')
    <div class="row place">
        @include('admin.blocks._place-detail-header')
        <div class="col-12 p-0">
            <div class="wrapper-main">
                <div class="tab-content place" id="placeDetailTabContent">
                    <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                        @include('admin.blocks.places.orders')
                    </div>
                    <div class="tab-pane fade" id="workers" role="tabpanel" aria-labelledby="workers-tab">
                        @include('admin.blocks.places.workers')
                    </div>
                    <div class="tab-pane fade" id="tables" role="tabpanel" aria-labelledby="tables-tab">
                        @include('admin.blocks.places.tables')
                    </div>
                </div>
            </div>

        </div>

    </div>
@endsection

