<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\MessagesController;

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::post('/addArticle',[UserController::class,'addArticle']);
Route::post('/searchArticle',[UserController::class,'searchArticle']);
Route::post('/article_info',[UserController::class,'articleInfo']);
Route::post('/deleteArticle',[UserController::class,'deleteArticle']);
Route::post('/deleteImage',[UserController::class,'deleteImage']);
Route::post('/updateArticle/{article}',[UserController::class,'updateArticle']);



// Route::post('/get_user_info_for_update', [UserController::class, 'getUserInfoForUpdate']);


Route::middleware('auth:sanctum')->group(function() {

});
