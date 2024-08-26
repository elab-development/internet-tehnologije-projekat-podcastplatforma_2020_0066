<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Episode;
use App\Models\Podcast;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

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
            'audio_file' => 'required|file|mimes:mp3,wav,aac|max:51200',
        ]);



        $podcast = Podcast::findOrFail($podcastId);



        if (Auth::id() !== $podcast->user_id && !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
   

        $audioFile = $request->file('audio_file');
        $filePath = $audioFile->store('audio_files', 'public');

        $validated['podcast_id'] = $podcastId;
        $validated['audio_file'] = $filePath;

        $episode = Episode::create($validated);
        return response()->json($episode, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $podcastId, string $id)
    {
        $episode = Episode::where('podcast_id', $podcastId)->findOrFail($id);
        $episode->audio_file = Storage::url($episode->audio_file);
        return response()->json($episode);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $podcastId, string $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'audio_file' => 'sometimes|file|mimes:mp3,wav,aac|max:20480', 
        ]);

        $episode = Episode::where('podcast_id', $podcastId)->findOrFail($id);
        $podcast = Podcast::findOrFail($podcastId);

        if (Auth::id() !== $podcast->user_id && !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }


        if ($request->hasFile('audio_file')) {
            
            if ($episode->audio_file) {
                Storage::disk('public')->delete($episode->audio_file);
            }

            $audioFile = $request->file('audio_file');
            $filePath = $audioFile->store('audio_files', 'public');
            $validated['audio_file'] = $filePath;
        }

        
        $episode->update($validated);
        return response()->json($episode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $podcastId,string $id)
    {
        $episode = Episode::where('podcast_id', $podcastId)->findOrFail($id);
        $podcast = Podcast::findOrFail($podcastId);

        if (Auth::id() !== $podcast->user_id && !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($episode->audio_file) {
            Storage::disk('public')->delete($episode->audio_file);
        }

        $episode->delete();
        return response()->json(null, 204);
    }
}
