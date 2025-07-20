<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ config('app.name') }} - {{$title}}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="{{asset('template')}}/images/favicon.png">
        <!-- Bootstrap CSS -->
        <link href="{{asset('template')}}/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="{{asset('template')}}/vendor/datatables/css/dataTables.bootstrap5.min.css" rel="stylesheet">
        <link href="{{asset('template')}}/vendor/datatables/css/responsive.bootstrap5.min.css" rel="stylesheet">
        <link href="{{asset('template')}}/vendor/fontawesome/css/all.min.css" rel="stylesheet">
        <!-- Chart.js -->
        <script src="{{asset('template')}}/vendor/chartjs/chart.min.js"></script>
        <!-- Custom CSS -->
        <link rel="stylesheet" href="{{asset('template')}}/css/style.css">
    </head>
    <body>
        @include('sweetalert::alert')
        @include('layouts.partials.sidebar')
        <main class="main-content">
            @include('layouts.partials.header')
            <div class="content">
                @yield('content')
            </div>
        </main>
        <script data-cfasync="false" src="../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="{{asset('template')}}/vendor/jquery/jquery.min.js"></script>
        <!-- Bootstrap JS -->
        <script src="{{asset('template')}}/vendor/jquery/jquery.min.js"></script>
    <!-- DataTables JS -->
        <script src="{{asset('template')}}/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- Custom JS -->
        <script src="{{asset('template')}}/js/main.js"></script>
        <script src="{{asset('template')}}/js/dashboard.js"></script>
        <script src="{{asset('template')}}/js/charts.js"></script>
         <!-- DataTables JS -->
    <script src="{{asset('template')}}/vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="{{asset('template')}}/vendor/datatables/js/dataTables.bootstrap5.min.js"></script>
    <script src="{{asset('template')}}/vendor/datatables/js/dataTables.responsive.min.js"></script>
    <script src="{{asset('template')}}/vendor/datatables/js/responsive.bootstrap5.min.js"></script>
        @stack('js')
    </body>
</html>
