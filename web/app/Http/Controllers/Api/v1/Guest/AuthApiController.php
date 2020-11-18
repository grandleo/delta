<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\GuestResource;
use App\Models\Guest;
use App\Models\PasswordReset;
use App\Notifications\MailResetPasswordNotification;
use App\Repositories\GuestRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Неверный Email или пароль.')],
            ]);
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
            'full_name' => ['required', 'string', 'min:2', 'max:250'],
            'email' => ['required', 'string', 'email', 'max:250', 'unique:guests'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

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

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $guest = \Auth::user();

        $reqData = $request->validate([
            'name_full' => ['required', 'string', 'min:2', 'max:250'],
            'image' => 'nullable|string|max:250',
        ]);

        $guest = $this->guestRepository->updateFromForm($guest->id, $reqData);

        return new GuestResource($guest);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetPasswordLink(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);
        $user = Guest::where('email', $request->email)->first();
        if (!$user)
            return response()->json([
                'message' => 'Мы не нашли пользователя с таким адресом электронной почты'
            ], 404);

        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email, 'user_type' => PasswordReset::GUEST],
            [
                'email' => $user->email,
                'token' => Str::random(60)
            ]
        );
        if ($user && $passwordReset) {
            $user->notify(new MailResetPasswordNotification('reset-password' , $passwordReset->token));
            return response()->json([
                'status' => 'success',
                'alerts' => [
                    [
                        'type'    => 'success',
                        'message' => 'Мы отправили вам ссылку для сброса пароля по электронной почте!',
                    ]
                ],
            ]);
        }

    }

    /**
     * @param Request $request
     *
     * @return GuestResource|\Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'token' => 'required'
        ]);
        $tokenData = PasswordReset::where('token', $request->token)->where('user_type', PasswordReset::MANAGER)->first();

        if (!$tokenData) {
            return response()->json([
                'message' => 'Используемый токен недействителен!'
            ], 404);
        }

        $guest = $this->guestRepository->updatePassword($tokenData->email, $request->password);
        $token = $guest->createToken('guest_common')->plainTextToken;
        $guest->token = $token;
        $tokenData->delete();
        return new GuestResource($guest);
    }
}
