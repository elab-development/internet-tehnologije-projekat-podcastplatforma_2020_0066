<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Podcast;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PodcastController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $podcasts = Podcast::with('user')->get();

        foreach ($podcasts as $podcast) {
            if ($podcast->image) {
                $podcast->image = \Storage::disk('public')->url($podcast->image);
            }
        }
    
        return response()->json($podcasts);
    }

    /**
     * Store a newly created resource in storage.
     */

     public function create()
     {
         return response()->json(['message' => 'Form to create a new podcast.'], 200);
     }

    public function store(Request $request)
    {
       //provera jel admin
        if (!Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized. Only admins can create podcasts.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:51200',
            'category' => 'nullable|string',
        ]);

       
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'public');
        }else{
            $imagePath = null;
        }

        $podcast = Podcast::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            //'user_id' => $validated['user_id'],
            'user_id' => Auth::id(), 
            'image' => $imagePath,
            'category' => $validated['category'],
        ]);

        return response()->json($podcast, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $podcast = Podcast::with('episodes')->findOrFail($id);

        if ($podcast->image) {
            $podcast->image = \Storage::disk('public')->url($podcast->image);
        }
    
        return response()->json($podcast);
    }

    /**
     * Update the specified resource in storage.
     */

     public function edit(string $id)
     {
         $podcast = Podcast::findOrFail($id);
 
         return response()->json($podcast, 200);
     }

    public function update(Request $request,string $id)
    {
        \Log::info('Request Data:', $request->all());
        \Log::info('Request Files:', $request->file());
        $podcast = Podcast::findOrFail($id);

        if (Auth::id() !== $podcast->user_id && !Auth::user()->admin) {
            return response()->json(['error' => 'Unauthorized'], 403); // Return a 403 if unauthorized
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:51200',
            'category' => 'nullable|string',
        ]);

        $imagePath = $podcast->image; 
        if ($request->hasFile('image')) {
            
            if ($podcast->image) {
                \Storage::disk('public')->delete($podcast->image);
            }
    
            $image = $request->file('image');
           /* return response()->json([
                'image' => $image
            ], 500);*/
    
            $imagePath = $image->store('images', 'public');
            $validated['image'] = $imagePath;
        }else {
            $validated['image'] = $podcast->image;
        }

     /* return response()->json([
            'image' => $imagePath
        ], 500);*/

    
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


    public function favorite(int $id)
{
    $user = Auth::user();
    $podcast = Podcast::findOrFail($id);

    
    $existingFavorite = Favorite::where('user_id', $user->id)->where('podcast_id', $id)->first();

    if ($existingFavorite) {
        return response()->json(['message' => 'Podcast already in favorites'], 400);
    }

    Favorite::create([
        'user_id' => $user->id,
        'podcast_id' => $id
    ]);

    return response()->json(['message' => 'Podcast added to favorites'], 200);
}

public function unfavorite(int $id)
{
    $user = Auth::user();

    $favorite = Favorite::where('user_id', $user->id)->where('podcast_id', $id)->first();

    if (!$favorite) {
        return response()->json(['message' => 'Podcast not found in favorites'], 404);
    }

    $favorite->delete();

    return response()->json(['message' => 'Podcast removed from favorites'], 200);
}

public function favorites()
{
    
    $user = Auth::user();

    $perPage = 4; 
    $page = request()->input('page', 1); 

     $favorites = Podcast::whereHas('favorites', function($query) use ($user) {
        $query->where('user_id', $user->id);
    })->paginate($perPage, ['*'], 'page', $page);

//
    $favorites->getCollection()->transform(function ($podcast) {
        if ($podcast->image) {
            $podcast->image = \Storage::disk('public')->url($podcast->image);
        }
        return $podcast;
    });


    return response()->json($favorites);
}


public function getall()
{
    try {

        $perPage = 4; 
        $page = request()->input('page', 1); 

        //$podcast = Podcast::all();
        $podcasts = Podcast::paginate($perPage, ['*'], 'page', $page);

        //$podcasts = Podcast::all();
        return response()->json($podcasts);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to retrieve podcasts.'], 500);
    }
}

public function search(Request $request)
{
    $query = $request->input('query');
    $sortBy = $request->input('sort_by', 'title');
    $sortOrder = $request->input('sort_order', 'asc'); 

$userId = $request->input('user_id'); // Get user_id if provided

    $podcasts = Podcast::query();

    if ($userId) {
        $podcasts->where('user_id', $userId);
    }

    $podcasts = $podcasts->where('title', 'like', "%{$query}%")
                         ->orderBy($sortBy, $sortOrder)
                         ->paginate(4); // Adjust perPage as needed

    foreach ($podcasts as $podcast) {
        if ($podcast->image) {
            $podcast->image = \Storage::disk('public')->url($podcast->image);
        }
    }

    return response()->json($podcasts);
    
    /*$podcasts = Podcast::where('title', 'like', "%{$query}%")
        ->orderBy($sortBy, $sortOrder)
        ->get();

    return response()->json($podcasts);*/
}

public function filterByUser($user_id, Request $request)
{

   $query = Podcast::query();
   $query->where('user_id', $user_id);

   $perPage = 4;
   $page = $request->input('page', 1);

   $podcasts = $query->paginate($perPage, ['*'], 'page', $page);


   foreach ($podcasts as $podcast) {
       if ($podcast->image) {
           $podcast->image = \Storage::disk('public')->url($podcast->image);
       }
   }

   return response()->json($podcasts);
}

public function getAdmins()
{
    $admins = User::where('admin', true)->get();

    return response()->json($admins);
}

}
