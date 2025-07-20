<nav class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <div class="brand">
            <i class="fas fa-brain brand-icon"></i>
            <span class="brand-text">{{ config('app.name') }}</span>
        </div>
        <button class="sidebar-toggle d-lg-none" id="sidebarToggle">
            <i class="fas fa-times"></i>
        </button>
    </div>

    <div class="sidebar-menu">
        <div class="menu-section">
            <div class="menu-section-title">Main</div>
            <ul class="menu-items">
                <li class="menu-item">
                    <a href="{{ route('dashboard') }}"
                       class="menu-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                        <i class="fas fa-tachometer-alt menu-icon"></i>
                        <span class="menu-text">Main Dashboard</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="menu-section">
            <div class="menu-section-title">AI Tools</div>
            <ul class="menu-items">

                <li class="menu-item">
                    <a href="#"
                       class="menu-link {{ request()->routeIs('voice-transcription.create') ? 'active' : '' }}">
                        <i class="fas fa-microphone menu-icon"></i>
                        <span class="menu-text">Voice To Text</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="{{ route('admin.socialcrawl.index') }}"
                       class="menu-link {{ request()->routeIs('admin.socialcrawl.index') ? 'active' : '' }}">
                        <i class="fas fa-globe menu-icon"></i>
                        <span class="menu-text">Social Crawl</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="menu-section">
            <div class="menu-section-title">Administrator</div>
            <ul class="menu-items">
                <li class="menu-item">
                    <a href="{{ route('admin.topic.index') }}"
                       class="menu-link {{ request()->routeIs('admin.topic.index') ? 'active' : '' }}">
                        <i class="fas fa-folder menu-icon"></i>
                        <span class="menu-text">Topic</span>
                    </a>
                </li>
            </ul>
        </div>
        {{-- <div class="menu-section">
            <div class="menu-section-title">User</div>
            <ul class="menu-items">
                <li class="menu-item">
                    <a href="{{ url('profile.html') }}"
                       class="menu-link {{ request()->is('profile.html') ? 'active' : '' }}">
                        <i class="fas fa-user menu-icon"></i>
                        <span class="menu-text">Profile</span>
                    </a>
                </li>
            </ul>
        </div> --}}

    </div>

    <div class="sidebar-footer">
        <div class="user-info">
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="user-details">
                <div class="user-name">{{ Auth::user()->name }}</div>
                <div class="user-role">{{ Auth::user()->role }}</div>
            </div>
        </div>
    </div>
</nav>
