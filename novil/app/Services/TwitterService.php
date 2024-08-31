<?php

namespace App\Services;

use Abraham\TwitterOAuth\TwitterOAuth;

class TwitterService
{
    protected $twitter;

    public function __construct()
    {
        $this->twitter = new TwitterOAuth(
            config('services.twitter.api_key'),
            config('services.twitter.api_secret_key'),
            config('services.twitter.access_token'),
            config('services.twitter.access_token_secret')
        );

        \Log::info('Twitter API Key: ' . env('TWITTER_API_KEY'));
        \Log::info('Twitter API Secret Key: ' . env('TWITTER_API_SECRET_KEY'));
        \Log::info('Twitter Access Token: ' . env('TWITTER_ACCESS_TOKEN'));
        \Log::info('Twitter Access Token Secret: ' . env('TWITTER_ACCESS_TOKEN_SECRET'));
    
    }

    public function postTweet($message)
{
    $response = $this->twitter->post('statuses/update', ['status' => $message]);
    
    if ($this->twitter->getLastHttpCode() != 200) {
        \Log::error('Twitter API response: ' . json_encode($response));
        throw new \Exception('Failed to post tweet: ' . json_encode($response));
    }
    
    return $response;
}

    
}