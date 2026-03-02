<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\OrderConfirmation;

class PedidosController extends Controller
{
    public function index()
    {
        return Inertia::render('checkout');
    }

    public function store(Request $request)
    {

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'payment_proof' => 'required|image|max:4096',
        ]);

        DB::beginTransaction();

        try {

            $user = auth()->user();

            //  Obtener producto real
            $product = Product::findOrFail($request->product_id);

            $price = $product->precio_actual;
            $subtotal = $price * $request->quantity;

            //  Subir comprobante a Cloudinary
            $paymentUrl = null;

            if ($request->hasFile('payment_proof')) {

                $uploadApi = new \Cloudinary\Api\Upload\UploadApi();

                $upload = $uploadApi->upload(
                    $request->file('payment_proof')->getRealPath(),
                    [
                        'folder' => 'orders/payment_proofs',
                        'resource_type' => 'image'
                    ]
                );

                $paymentUrl = $upload['secure_url'];
            }

            //  Crear orden
            $order = Order::create([
                'user_id' => $user->id,
                'customer_name' => $user->name,
                'customer_phone' => $user->phone,
                'customer_email' => $user->email,
                'status_id' => 1, 
                'payment_method_id'=>1,
                'total' => round($subtotal, 2),
                'payment_proof' => $paymentUrl,
            ]);

            //  Crear OrderItem
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => round($price, 2),
                'subtotal' => round($subtotal, 2),
            ]);

            // // Preparar datos para el correo
            // $itemsForMail = [
            //     [
            //         'name' => $product->nombre ?? 'Producto',
            //         'quantity' => $request->quantity,
            //         'price' => round($price, 2),
            //         'subtotal' => round($subtotal, 2),
            //     ]
            // ];

            // //  Enviar correo al cliente + copia admin
            // try {

            //     Mail::to($order->customer_email)
            //         ->send(new OrderConfirmation($order, $itemsForMail));

            // } catch (\Exception $mailError) {
            //     Log::error("Error enviando correo pedido directo: " . $mailError->getMessage());
            // }

            DB::commit();

            return response()->json([
                'success' => true,
                'order_id' => $order->id,
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            Log::error("Error creando pedido directo: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error al crear el pedido'
            ], 500);
        }
    }
}