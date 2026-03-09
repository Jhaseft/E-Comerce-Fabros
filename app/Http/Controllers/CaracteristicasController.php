<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Caracteristica;
use Inertia\Inertia;

class CaracteristicasController extends Controller
{
    public function index($id)
    {
        $product = Product::select('id', 'name')
            ->with('caracteristicas')
            ->findOrFail($id);

        return Inertia::render('Admin/Caracteristicas/index', [
            'product' => $product
        ]);
    }

   public function store(Request $request, $id)
{
    $request->validate([
        'nombre' => 'required',
        'valor'  => 'required',
    ]);

    $caracteristica = Caracteristica::create([
        'product_id' => $id,
        'nombre' => $request->nombre,
        'valor' => $request->valor,
    ]);

    return response()->json($caracteristica);
}

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'valor'  => 'required|string|max:255',
        ]);

        $caracteristica = Caracteristica::findOrFail($id);
        $caracteristica->update($request->only('nombre', 'valor'));

        return response()->json( $caracteristica);
    }

    public function destroy($id)
{
    Caracteristica::findOrFail($id)->delete();
    return response()->json(['success' => true]);
}
}
