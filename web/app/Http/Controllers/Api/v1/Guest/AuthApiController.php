<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Repositories\GuestRepositoryInterface;
use App\Http\Resources\Guest\GuestResource;

class AuthApiController extends Controller
{
    private $guestRepository;

    public function __construct(
        GuestRepositoryInterface $guestRepository
    )
    {
        $this->guestRepository = $guestRepository;
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $guest = $this->guestRepository->findByWhere([['email', '=', $request->email]]);

        if (!$guest || ! Hash::check($request->password, $guest->password)) {
            // throw \Illuminate\Validation\ValidationException::withMessages([
            //     'email' => [__('Неверный Email или пароль.')],
            // ]);
            return response()->json([
                'message' => __('Неверный Email или пароль.'),
            ], 420);
        }

        $token = $guest->createToken('guest_common')->plainTextToken;
        $guest->token = $token;

        return new GuestResource($guest);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:guests'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $name = 'Guest #'.rand(1000, 9000);
        $guest = $this->guestRepository->create([
            'name' => $request->full_name,
            'name_full' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $guest->createToken('guest_common')->plainTextToken;
        $guest->token = $token;

        return new GuestResource($guest);
    }
}
