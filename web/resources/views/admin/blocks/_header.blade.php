<header class="header">
    <nav class="navbar fixed-top  navbar-expand-lg">
        <a class="navbar-brand" href="#">
            <div>
                <img src="{{ asset('images/img/delta-logo.png') }}" class="d-inline-block align-top" alt="">
            </div>
            <div>
                <p class="title">DELTA-ORDER</p>
                <p class="sub-title">Система быстрых заказов</p>
            </div>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex justify-content-between navbar-search h-100">
            <form class="form-inline h-100">
                <a class="my-2 my-sm-0 navbar-search-btn" type="submit">
                    <img src="{{ asset('images/admin/icon/search.svg') }}" alt="">
                </a>
                <input class="mr-sm-2" type="search" placeholder="Global search" aria-label="Search">
            </form>
            <div class="d-flex align-items-center">
                <a href="#">
                    <img src="{{ asset('images/admin/icon/notification.svg') }}" alt="">
                </a>
            </div>
        </div>
    </nav>
</header>
