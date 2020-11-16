<div id="sidenavContent" class="sidenav-content ">
    <nav class="sidenav">
        <div class="sidenav__user">
            <div class="sidenav__user__avatar">
                <img src="{{auth('admin')->user()->avatar}}" alt="">
            </div>
            <div class="sidenav__user__info">
                <p>{{auth('admin')->user()->name}}</p>
                <span>{{auth('admin')->user()->username}}</span>
            </div>
        </div>
        <ul class="nav flex-column">
            <li class="nav-item ">
                <a class="nav-link active" href="#">
                    <div class="nav-link-icon"></div>
                    <span>Dashboard</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div class="nav-link-icon"></div>
                    <span>Рестораны</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div class="nav-link-icon"></div>
                    <span>Заказы</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div class="nav-link-icon"></div>
                    <span>Официанты</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div class="nav-link-icon"></div>
                    <span>Гости (клиенты)</span>
                </a>
            </li>
        </ul>

        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <div class="nav-link-icon"></div>
                    <span>Настройки</span>
                </a>
            </li>
        </ul>
        <div class="toggle-sidebar cursor-pointer">
            <a id="toggleSidebar" href="" class="text-decoration-none d-flex">
                <img src="{{ asset('images/admin/icon/toggle.svg') }}" alt="">
                <span>Toggle sidebar</span>
            </a>
        </div>

    </nav>
</div>
