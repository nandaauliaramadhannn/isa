<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use RealRashid\SweetAlert\Facades\Alert;

class AuthController extends Controller
{
    public function fromlogin()
    {
        if(Auth::check()){
            return redirect()->route('dashboard');
        }
        return view('auth.login');
    }

    public function login(Request $request)
{
    // ✅ Validasi input form (tanpa aturan 'captcha' dari Laravel)
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'captcha' => 'required|digits:4', // hanya angka 4 digit
    ]);

    // ✅ Validasi CAPTCHA custom (dibandingkan dengan session)
    if ($request->captcha !== session('custom_captcha')) {
        Alert::toast('Captcha salah.', 'error');
        return back()->withInput();
    }

    try {
        // ✅ Coba login
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ], $request->boolean('remember'))) {
            Alert::toast('Login berhasil!', 'success');
            return redirect()->route('dashboard');
        } else {
            Alert::toast('Email atau password salah!', 'error');
            return back()->withInput();
        }
    } catch (\Exception $e) {
        Alert::toast('Terjadi kesalahan saat login: ' . $e->getMessage(), 'error');
        return back()->withInput();
    }
}
}
