<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return  response()->json(['message' => 'Login form']);;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            
            $user = Auth::user();
            $user->tokens()->delete();
            $token = $user->createToken('podcastplatform')->plainTextToken;
    
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user,
            ]);
        
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function showSignupForm()
    {
        return response()->json(['message' => 'Signup form']);
    }

    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'admin' => 'boolean', 
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'admin' => $request->has('admin') ? $request->admin : false,
        ]);

        $user->save();

        Auth::login($user);

        return response()->json(['message' => 'Signup successful']);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        Auth::logout();
        return response()->json(['message' => 'Logged out']);
    }
}
