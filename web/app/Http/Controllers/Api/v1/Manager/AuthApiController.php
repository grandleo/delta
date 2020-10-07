<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Repositories\ManagerRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Http\Resources\Manager\ManagerResource;

class AuthApiController extends Controller
{
    private $managerRepository;
    private $placeRepository;

    public function __construct(
        ManagerRepositoryInterface $managerRepository,
        PlaceRepositoryInterface $placeRepository
    )
    {
        $this->managerRepository = $managerRepository;
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

        if (!$manager || ! Hash::check($request->password, $manager->password)) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Неверный Email или пароль.')],
            ]);
        }

        $manager->place = $this->placeRepository->findByWhere([['manager_id', '=', $manager->id]]);

        $token = $manager->createToken('manager_common')->plainTextToken;
        $manager->token = $token;

        return new ManagerResource($manager);
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
            'email' => ['required', 'string', 'email', 'max:250', 'unique:managers'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $name = 'Manager #'.rand(1000, 9000);
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
