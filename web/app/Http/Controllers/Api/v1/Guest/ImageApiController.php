<?php

namespace App\Http\Controllers\Api\v1\Guest;

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

        $fileName = time();
        $res = [];
        switch ($request->dest) {
            case 'guest_image':
                $path = 'guests/'.$request->dest_id;
                Storage::disk('public')->makeDirectory($path);
                $img = Image::make($files[0]);
                break;
        }
        switch ($request->dest) {
            case 'guest_image':
                $fileName = 'gi-'.$fileName;
                $img->fit(120);
                break;
        }
        switch ($request->dest) {
            case 'guest_image':
                $img->save('storage/'.$path.'/'.$fileName.'.jpg');
                $res[] = $path.'/'.$fileName.'.jpg';
                break;
        }

        return response()->json($res);
    }
}
