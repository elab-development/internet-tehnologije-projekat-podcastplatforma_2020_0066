<?php

namespace App\Http\Controllers;

use App\Services\TwitterService;
use Illuminate\Http\Request;

class TwitterController extends Controller
{
    protected $twitterService;

    public function __construct(TwitterService $twitterService)
    {
        $this->twitterService = $twitterService;
    }

    public function sharePodcastOnTwitter(Request $request)
    {
        $podcastTitle = $request->input('title');
        $podcastUrl = $request->input('url');
    
        $message = "Check out this podcast: $podcastTitle. Listen here: $podcastUrl";
    
        try {
            $response = $this->twitterService->postTweet($message);
    
            if (isset($response->errors)) {
                \Log::error('Twitter API errors: ' . json_encode($response->errors));
                return response()->json(['error' => 'Could not post tweet'], 500);
            }
    
    
            return response()->json(['success' => 'Tweet posted successfully']);
        } catch (\Exception $e) {
            \Log::error('Twitter API error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while posting the tweet.'], 500);
        }
    }
    
}