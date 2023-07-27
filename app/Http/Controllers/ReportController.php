<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {

        $this->middleware('role:admin');

        $reports = Report::orderBy('created_at', 'desc')->with('user', 'post')->get();
        DB::table('reports')->where('is_new', true)->update(['is_new' => false]);

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports
        ]);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();

            // Validasi data jika diperlukan
            $validatedData = $request->validate([
                'user_id' => 'required',
                'post_id' => 'required',
                'content' => 'required',
            ]);

            $report = new Report();
            $report->user_id = $data['user_id'];
            $report->post_id = $data['post_id'];
            $report->is_new = true;
            $report->content = $data['content'];
            $report->status = 'open';
            $report->save();

            return redirect()->back()->with('message', 'report sent');
        } catch (\Throwable $th) {
            return redirect()->back()->with('message', 'something went wrong');
        }
    }

    public function update(Request $request, $id)
    {

        $this->middleware('role:admin');

        try {
            $validatedData = $request->validate([
                'message' => 'nullable|string|min:3',
                'status' => 'required|string'
            ]);

            $report = Report::findOrFail($id);
            $report->update(['status' => $validatedData['status']]);

            $notif = new Notification();
            $notif->user_id = $request->user_id;
            $notif->is_read = false;
            $notif->report_id = $id;
            $notif->message = $validatedData['message'];
            $notif->save();

            return redirect()->back()->with('message', 'Updated successfully');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors());
        } catch (\Exception $e) {
            // Tangani kesalahan lainnya (misalnya, kesalahan basis data)
            return redirect()->back()->with('error', 'An error occurred during the update.');
        }
    }

    public function destroy($id)
    {
        $this->middleware('role:admin');

        $report = Report::where('id', $id)->first();
        $report->delete();

        return response()->json('deleted success');
    }

    public function search(Request $request)
    {
        $data = Report::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('content', 'like', '%' . $search . '%')
                        ->orWhereHas('user', function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                        })
                        ->orWhereHas('post', function ($query) use ($search) {
                            $query->where('title', 'like', '%' . $search . '%');
                        });
                });
            })
            ->with('user', 'post')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return response()->json($data);
    }
}
