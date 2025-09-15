<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::middleware(['auth:api', 'role:Client'])->get('/hello', function () {
    return response()->json(['message' => 'Hello World - Client']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::post('/solicitudes', [TicketController::class, 'store']);
    Route::get('/solicitudes', [TicketController::class, 'index']);
    Route::put('/solicitudes/{id}', [TicketController::class, 'update']);
});

Route::middleware(['auth:api'])->get('/reportes/solicitudes', [TicketController::class, 'ticketsByStatus']);

Route::middleware(['auth:api', 'role:Admin'])->group(function () {
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
});
