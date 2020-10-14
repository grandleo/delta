<?php

namespace App\Http\Controllers\Api\v1\Worker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Http\Resources\Worker\WorkerResource;

class AuthApiController extends Controller
{
    private $workerRepository;
    private $placeRepository;

    public function __construct(
        WorkerRepositoryInterface $workerRepository,
        PlaceRepositoryInterface $placeRepository
    )
    {
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

        $worker = $this->workerRepository->findByWhere([['email', '=', $request->email]]);

        if (!$worker || ! Hash::check($request->password, $worker->password)) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Неверный Email или пароль.')],
            ]);
        }

        if (!$worker->hasStatus('active')) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Вам был ограничен вход в систему.')],
            ]);
        }

        $worker->place = $this->placeRepository->find($worker->place_id);

        $token = $worker->createToken('worker_common')->plainTextToken;
        $worker->token = $token;

        return new WorkerResource($worker);
    }
}
