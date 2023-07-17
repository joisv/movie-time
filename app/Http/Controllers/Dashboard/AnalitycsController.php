<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalitycsController extends Controller
{
    public function index()
    {
        $postByViews = Post::orderBy('views', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard/Dashboard', [
            'postByViews' => $postByViews
        ]);
    }

    public function userCount()
    {

        try {

            $result = User::selectRaw('COUNT(*) as total_users, SUM(is_online) as online_users')->first();

            return response()->json([
                'total_users' => $result->total_users,
                'online_users' => $result->online_users,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function reportStatus()
    {

        try {
            $report_status = Report::whereIn('status', ['close', 'open'])
                ->select('status', DB::raw('COUNT(*) as count'))
                ->groupBy('status')
                ->get();

            return response()->json([
                'report_status' => $report_status
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function mostmovie()
    {

        try {

            $postsSortedByViews = Post::orderBy('views', 'desc')->take(5)
                ->get();
            $postsSortedByLikes = Post::orderByDesc('like')->take(5)
                ->get();

            return response()->json([
                'postsSortedByViews' => $postsSortedByViews,
                'postsSortedByLikes' => $postsSortedByLikes,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function postViewByDays(){
      
        $today = Carbon::today();
        $sixDaysAgo = Carbon::today()->subDays(6);

        $dates = [];
        $viewsData = [];
        for ($date = $sixDaysAgo->copy(); $date <= $today; $date->addDay()) {
            $startOfDay = $date->copy()->startOfDay();
            $endOfDay = $date->copy()->endOfDay();
            $views = Post::whereBetween('updated_at', [$startOfDay, $endOfDay])
                ->sum('views');
            $dates[] = $date->format('l');
            $viewsData[] = $views;
        }

        return response()->json([
            'dates' => $dates,
            'viewsData' => $viewsData
        ]);
    }
}
