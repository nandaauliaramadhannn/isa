<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\CaptchaController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SocialCrawlController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/auth/login', [AuthController::class, 'fromlogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
// Route::get('/form', [CaptchaController::class, 'showForm']);
// Route::post('/form', [CaptchaController::class, 'validateCaptcha'])->name('validate.captcha');
// Route::get('/refresh-captcha', [CaptchaController::class, 'refreshCaptcha'])->name('refresh.captcha');
Route::get('/custom-captcha', function () {
    $code = strval(rand(1000, 9999)); // pastikan ini string
    Session::put('custom_captcha', $code); // simpan di session

    // Buat gambar
    $image = imagecreate(100, 40);
    $bg = imagecolorallocate($image, 255, 255, 255); // putih
    $textColor = imagecolorallocate($image, 0, 0, 0); // hitam
    imagestring($image, 5, 25, 10, $code, $textColor);

    ob_start();
    imagepng($image);
    $imageData = ob_get_clean();
    imagedestroy($image);

    return response($imageData)->header('Content-Type', 'image/png');
})->name('custom.captcha');


Route::get('/map', [MapController::class, 'index'])->name('map.index');
Route::middleware(['auth', 'role:viewer,admin'])->group(function () {
    Route::get('/app/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/app/topic', [TopicController::class, 'index'])->name('admin.topic.index');
    Route::post('/app/topic/store', [TopicController::class, 'store'])->name('admin.topic.store');
    Route::put('/app/topic/update/{topic}', [TopicController::class, 'update'])->name('admin.topic.update');
    Route::delete('/app/topic/destroy/{topic}', [TopicController::class, 'destroy'])->name('admin.topic.destroy');
    Route::get('/app/socialcrawl', [SocialCrawlController::class, 'index'])->name('admin.socialcrawl.index');
    Route::post('/app/socialcrawl/run', [SocialCrawlController::class, 'run'])->name('admin.socialcrawl.run');
    Route::get('/app/socialcrawl/progress', [SocialCrawlController::class, 'progress'])->name('admin.socialcrawl.progress');
});
