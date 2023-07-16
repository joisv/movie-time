<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UpdateLastActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            $user->update(['last_activity' => Carbon::now()]);

            $lastActivity = $user->last_activity;

            // Batas waktu inaktif (contoh: 5 menit)
            $inactiveThreshold = Carbon::now()->subMinutes(5);

            // Cek apakah pengguna aktif atau tidak
            $isActive = $lastActivity > $inactiveThreshold;

            if ($isActive) {
                $user->update(['is_online' => true]);
            } 
        }

        return $next($request);
    }
}
