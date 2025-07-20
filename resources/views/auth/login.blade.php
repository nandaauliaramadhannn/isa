<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - {{ config('app.name') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('template/images/favicon.png') }}">

    <!-- Styles -->
    <link href="{{ asset('template/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('template/vendor/fontawesome/css/all.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('template/css/style.css') }}">
</head>
<body class="auth-body">

    <!-- Background Elements -->
    <div class="auth-background">
        <div class="bg-pattern"></div>
        <div class="floating-elements">
            <div class="floating-element"><i class="fas fa-brain"></i></div>
            <div class="floating-element"><i class="fas fa-robot"></i></div>
            <div class="floating-element"><i class="fas fa-chart-line"></i></div>
            <div class="floating-element"><i class="fas fa-image"></i></div>
        </div>
    </div>

    <!-- Authentication Container -->
    <div class="auth-container">
        <div class="auth-card">

            <!-- SweetAlert Messages -->
            @include('sweetalert::alert')

            <!-- Header -->
            <div class="auth-header text-center">
                <div class="brand-logo">
                    <i class="fas fa-brain"></i>
                    <h1>Intelligence Socio Analytics</h1>
                </div>
                <h2>Welcome Back</h2>
                <p>Sign in to access your dashboard</p>
            </div>

            <!-- Login Form -->
            <form id="loginForm" action="{{ route('login.post') }}" method="POST">
                @csrf

                <!-- Email -->
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            class="form-control @error('email') is-invalid @enderror"
                            placeholder="Enter your email"
                            value="{{ old('email') }}"
                            required>
                    </div>
                    @error('email')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Password -->
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            class="form-control @error('password') is-invalid @enderror"
                            placeholder="Enter your password"
                            required>
                        <button type="button" class="password-toggle" onclick="togglePassword('password')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    @error('password')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Captcha -->
                <div class="form-group">
                    <label for="captcha">Captcha</label>
                    <div class="d-flex align-items-center">
                        <img src="{{ route('custom.captcha') }}" id="captcha-img" alt="Captcha">
                        <button type="button" class="btn btn-outline-secondary btn-sm ms-2" id="reload" title="Reload Captcha">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                    <input
                        type="text"
                        name="captcha"
                        class="form-control mt-2 @error('captcha') is-invalid @enderror"
                        placeholder="Enter Captcha"
                        value="{{ old('captcha') }}"
                        required>
                    @error('captcha')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember">
                        <label class="form-check-label" for="remember">Remember me</label>
                    </div>
                    <a href="#" class="forgot-link">Forgot password?</a>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100">
                    <i class="fas fa-sign-in-alt me-2"></i> Sign In
                </button>
            </form>

        </div>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('template/vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('template/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

    <!-- Toggle Password Visibility -->
    <script>
        function togglePassword(id) {
            const input = document.getElementById(id);
            const icon = input.nextElementSibling.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Reload captcha
        document.getElementById('reload').addEventListener('click', function () {
            document.getElementById('captcha-img').src = '{{ route('custom.captcha') }}' + '?' + Date.now();
        });
    </script>

</body>
</html>
