<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CaptchaController extends Controller
{
    public function showForm()
    {
        return view('auth.form');
    }

    public function validateCaptcha(Request $request)
    {
        $request->validate([
            'captcha' => 'required|captcha'
        ]);

        return back()->with('success', 'CAPTCHA valid!');
    }

    public function refreshCaptcha()
    {
        return response()->json(['captcha' => captcha_img()]);
    }
}
