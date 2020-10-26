<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Repositories\ManagerRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Http\Resources\Manager\ManagerResource;
use App\Http\Resources\Worker\WorkerResource;

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
}
