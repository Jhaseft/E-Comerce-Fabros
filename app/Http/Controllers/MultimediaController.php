<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMultimedia;
use App\Models\MultimediaType;
use Inertia\Inertia;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class MultimediaController extends Controller
{
    public function index($id)
    {
        $product = Product::select('id', 'name')
            ->with(['multimedia.multimediaType'])
            ->findOrFail($id);

        $types = MultimediaType::select('id', 'name', 'is_empty')->get();

        return Inertia::render('Admin/Multimedia/index', [
            'product' => $product,
            'types'   => $types
        ]);
    }

    public function store(Request $request, $id)
{
    
    $request->validate([
        'file' => 'required|file|max:51200|mimes:jpeg,jpg,png,webp,mp4,mov,avi',
        'multimedia_type_id' => 'required|exists:multimedia_type,id',
        'title' => 'nullable|string|max:255',
        'description' => 'nullable|string',
    ]);
 
    $product = Product::findOrFail($id);

    $file = $request->file('file');

    $resourceType = str_starts_with($file->getMimeType(), 'video')
        ? 'video'
        : 'image';

    $uploadApi = new UploadApi();

    $upload = $uploadApi->upload(
        $file->getRealPath(),
        [
            'folder' => "products/{$product->id}",
            'resource_type' => $resourceType
        ]
    );

    $media = ProductMultimedia::create([
        'product_id' => $product->id,
        'multimedia_type_id' => $request->multimedia_type_id,
        'url' => $upload['secure_url'],
        'type' => $resourceType,
        'sort_order' => 0,
        'title' => $request->title,
        'description' => $request->description,
    ]);

    return response()->json(
        $media->load('multimediaType')
    );
}

  public function update(Request $request, $id)
{
   

    $media = ProductMultimedia::findOrFail($id);

    $request->validate([
        'multimedia_type_id' => 'required|exists:multimedia_type,id',
        'file' => 'nullable|file|max:102400|mimes:jpeg,jpg,png,webp,mp4,mov,avi',
        'title' => 'nullable|string|max:255',
        'description' => 'nullable|string',
    ]);

    if ($request->hasFile('file')) {
        $file = $request->file('file');

        $resourceType = str_starts_with($file->getMimeType(), 'video')
            ? 'video'
            : 'image';

        $uploadApi = new UploadApi();

        $upload = $uploadApi->upload(
            $file->getRealPath(),
            [
                'folder' => "products/{$media->product_id}",
                'resource_type' => $resourceType
            ]
        );

        $media->url = $upload['secure_url'];
        $media->type = $resourceType;
    }

    $media->multimedia_type_id = $request->multimedia_type_id;
    $media->title = $request->title;
    $media->description = $request->description;

    $media->save();

    return response()->json(
        $media->load('multimediaType')
    );
}



    public function destroy($id)
    {
        ProductMultimedia::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
