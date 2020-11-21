<div class="col-12 mt-5 p-0">
    <div class="d-flex justify-content-between table-header">
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
                    <button class="btn btn-info">Применить</button>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <input class="form-control" type="text" placeholder="Поиск по номеру или официанту">
                    <a class="search-btn">
                        <img src="/images/icon/search-admin.svg" alt="">
                    </a>
                </div>
            </div>
            <div class="col-auto">
                <div class="form-group">
                    <button class="btn btn-primary">Создать новый заказ</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="row order-list">
        @foreach($place->orders as $order)
            <div class="order-list__item col-md-4">
                <div class="order-list__item__card bg-white mb-4">
                    <p><span class="font-weight-bold">Заказ №{{$order->id}}</span> / Создан {{$order->created_at}}</p>
                    <p><span class="font-weight-bold">Стол </span>{{$order->id}} <span>Гость №</span></p>
                    <p>
                       <p class="m-0"> <small class="d-inline-block">Закрепленный официант</small></p>
                        <span class="font-weight-bold d-inline-block">Евгений Казаков</span>
                    </p>
                    <p>{{$order->id}}</p>
                </div>
            </div>
        @endforeach
    </div>
</div>
