<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Storage;
use Str;
use Image;

class ImageApiController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'dest' => ['required', 'string', 'max:255'],
            'dest_id' => ['required', 'string', 'max:255'],
            'files' => ['required', 'max:10'],
            'files.*' => 'image|max:20000|mimes:jpeg,jpg,gif,bmp,png',
        ]);

        $files = $request->file('files');

        $fileName = Str::random(10);
        $res = [];
        switch ($request->dest) {
            case 'place_image':
                $path = 'places/'.$request->dest_id;
                Storage::disk('public')->makeDirectory($path);
                $img = Image::make($files[0]);
                $img->fit(130);
                $img->save('storage/'.$path.'/'.$fileName.'.jpg');
                $res[] = $path.'/'.$fileName.'.jpg';
                break;

            default:
                break;
        }

        return response()->json($res);
    }
}
