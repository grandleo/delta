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

    <script id="placeTableButtons" class="template-container" type="text/template">
        <button data-id="%id%" data-toggle="modal" data-target="#addEditTableModal" class="btn btn-sm btn-sm-control mr-1">
            <img src="/images/icon/pencil.svg" alt="edit"/>
        </button>
        <button data-id="%id%" class="place-tables-delete btn btn-light btn-sm btn-sm-control">
            <img src="/images/icon/trash.svg" alt="delete"/>
        </button>
    </script>

@endsection

