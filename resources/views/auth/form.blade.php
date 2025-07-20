<!DOCTYPE html>
<html>
<head>
    <title>Laravel CAPTCHA</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    @if(session('success'))
        <p style="color: green">{{ session('success') }}</p>
    @endif

    @if($errors->any())
        <p style="color: red">{{ $errors->first() }}</p>
    @endif

    <form method="POST" action="{{ route('validate.captcha') }}">
        @csrf
        <label for="captcha">Captcha:</label><br>
        <div>
            <span>{!! captcha_img() !!}</span>
            <button type="button" id="reload">⟳</button>
        </div><br>
        <input type="text" name="captcha" placeholder="Masukkan captcha"><br><br>
        <button type="submit">Submit</button>
    </form>

    <script>
        document.getElementById('reload').onclick = function () {
            fetch('{{ route('refresh.captcha') }}')
                .then(res => res.json())
                .then(data => {
                    document.querySelector('span').innerHTML = data.captcha;
                });
        };
    </script>
</body>
</html>
