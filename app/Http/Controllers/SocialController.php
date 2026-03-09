<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    // Redirige a Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(str()->random(16)),
            ]
        );

        Auth::login($user);

        // Si el usuario no tiene teléfono, pedirlo antes de continuar
        if (empty($user->phone)) {
            return redirect()->route('profile.complete');
        }

        return redirect()->route('welcome');
    }

    // Muestra el formulario para completar el teléfono
    public function showCompleteProfile()
    {
        return Inertia::render('Auth/CompleteProfile');
    }

    // Guarda el teléfono ingresado por el usuario de Google
    public function storeCompleteProfile(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:20',
        ]);

        $user = Auth::user();
        $user->phone = $request->phone;
        $user->save();

        return redirect()->route('welcome');
    }
}
