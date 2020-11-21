<div class="col-12 place-detail">
    <div>
        <p class="place-detail__link"><a href="{{ route('admin.places.index') }}">Список заведений</a> / {{$place->name}}</p>
        <h4 class="place-detail__name">{{$place->name}}</h4>
    </div>
    <div class="place-detail__nav">
        <ul class="nav" id="placeDetailTab" role="tablist">
            <li class="nav-item place-detail__nav-item" role="presentation">
                <a class="nav-link" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="true">Заказы <span class="place-detail__nav-item__result-count">{{$place->orders->count()}}</span></a>
            </li>
            <li class="nav-item place-detail__nav-item active">
                <a class="nav-link" id="workers-tab" data-toggle="tab" href="#workers" role="tab" aria-controls="workers" aria-selected="true">Официанты <span class="place-detail__nav-item__result-count">{{$place->workers->count()}}</span></a>
            </li>
            <li class="nav-item place-detail__nav-item">
                <a class="nav-link" id="tables-tab" data-toggle="tab" href="#tables" role="tab" aria-controls="tables" aria-selected="true">Столы <span class="place-detail__nav-item__result-count">{{$place->tables->count()}}</span></a>
            </li>
            <li class="nav-item place-detail__nav-item">
                <a class="nav-link" href="#">Меню <span class="place-detail__nav-item__result-count">89</span></a>
            </li>
        </ul>
    </div>
</div>
