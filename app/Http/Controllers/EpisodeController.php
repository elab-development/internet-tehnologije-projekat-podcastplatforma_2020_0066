<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $podcastId)
    {
        $episodes = Episode::where('podcast_id', $podcastId)->get();
        return response()->json($episodes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $podcastId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'audio_url' => 'required|string',
        ]);

        $validated['podcast_id'] = $podcastId;

        $episode = Episode::create($validated);
        return response()->json($episode, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, string $podcastId)
    {
        $episode = Episode::where('podcast_id', $podcastId)->findOrFail($id);
        return response()->json($episode);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, string $podcastId)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'audio_url' => 'sometimes|required|string',
        ]);

        $episode = Episode::where('podcast_id', $podcastId)->findOrFail($id);
        $episode->update($validated);
        return response()->json($episode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id,string $podcastId)
    {
        $episode = Episode::where('podcast_id', $podcastId)->findOrFail($id);
        $episode->delete();
        return response()->json(null, 204);
    }
}
