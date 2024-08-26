<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Podcast;
use Illuminate\Support\Facades\Auth;

class PodcastController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Podcast::with('user')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            //'user_id' => 'required|exists:users,id',
        ]);


        $podcast = Podcast::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            //'user_id' => $validated['user_id'],
            'user_id' => Auth::id(), 
        ]);
        
        return response()->json($podcast, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $podcast = Podcast::with('episodes')->findOrFail($id);
        return response()->json($podcast);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $podcast = Podcast::findOrFail($id);

        if (Auth::id() !== $podcast->user_id && !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403); // Return a 403 if unauthorized
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
           // 'user_id' => 'sometimes|required|exists:users,id',
        ]);

       // $podcast = Podcast::findOrFail($id);
        $podcast->update($validated);
        return response()->json($podcast);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $podcast = Podcast::findOrFail($id);

        if (Auth::id() !== $podcast->user_id && !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403); // Return a 403 if unauthorized
        }

        
        $podcast->delete();
        return response()->json(null, 204);
    }
}
