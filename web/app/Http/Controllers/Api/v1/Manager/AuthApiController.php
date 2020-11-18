<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use App\Models\Manager;
use App\Models\PasswordReset;
use App\Notifications\MailResetPasswordNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Repositories\ManagerRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Http\Resources\Manager\ManagerResource;
use App\Http\Resources\Worker\WorkerResource;
use Illuminate\Support\Str;

class AuthApiController extends Controller
{
    private $managerRepository;
    private $workerRepository;
    private $placeRepository;

    public function __construct(
        ManagerRepositoryInterface $managerRepository,
        WorkerRepositoryInterface $workerRepository,
        PlaceRepositoryInterface $placeRepository
    )
    {
        $this->managerRepository = $managerRepository;
        $this->workerRepository = $workerRepository;
        $this->placeRepository = $placeRepository;
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

        $manager = $this->managerRepository->findByWhere([['email', '=', $request->email]]);

        $worker = !$manager
            ? $this->workerRepository->findByWhere([['email', '=', $request->email]])
            : null;

        if ((!$manager && !$worker)
            || ($manager && !Hash::check($request->password, $manager->password))
            || ($worker && !Hash::check($request->password, $worker->password))
        ) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Неверный Email или пароль.')],
            ]);
        }

        if ($worker && !$worker->hasStatus('active')) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Вам был ограничен вход в систему.')],
            ]);
        }

        if ($manager) {
            $manager->place = $this->placeRepository->findByWhere([['manager_id', '=', $manager->id]]);

            $token = $manager->createToken('manager_common')->plainTextToken;
            $manager->token = $token;

            return new ManagerResource($manager);
        } elseif ($worker) {
            $worker->place = $this->placeRepository->find($worker->place_id);

            $token = $worker->createToken('worker_common')->plainTextToken;
            $worker->token = $token;

            return (new WorkerResource($worker))
                ->additional([
                    'is_worker' => true,
                ]);
        }
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => ['required', 'string', 'max:250'],
            'place_name' => ['required', 'string', 'min:3', 'max:250'],
            'email' => ['required', 'string', 'email', 'max:250', 'unique:managers', 'unique:workers'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $manager = $this->managerRepository->create([
            'name' => $request->full_name,
            'name_full' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $slug = $this->placeRepository->getFreeSlug($request->place_name);

        $place = $this->placeRepository->create([
            'manager_id' => $manager->id,
            'place_category_id' => 1, // TODO: fix this
            'name' => $request->place_name,
            'slug' => $slug,
        ]);

        $manager->place = $place;

        $token = $manager->createToken('manager_common')->plainTextToken;
        $manager->token = $token;

        return new ManagerResource($manager);
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
        $user = Manager::where('email', $request->email)->first();
        if (!$user)
            return response()->json([
                'message' => 'Мы не нашли пользователя с таким адресом электронной почты'
            ], 404);

        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email, 'user_type' => PasswordReset::MANAGER],
            [
                'email' => $user->email,
                'token' => Str::random(60)
            ]
        );
        if ($user && $passwordReset) {
            $user->notify(new MailResetPasswordNotification('manager/reset-password' , $passwordReset->token));
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
     * @return ManagerResource|\Illuminate\Http\JsonResponse
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

        $manager = $this->managerRepository->updatePassword($tokenData->email, $request->password);
        $token = $manager->createToken('guest_common')->plainTextToken;
        $manager->token = $token;
        $tokenData->delete();
        return new ManagerResource($manager);
    }
}
