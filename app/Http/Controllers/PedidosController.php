<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\OrderConfirmation;
use Cart;

class PedidosController extends Controller
{
    public function index()
    {
        return Inertia::render('checkout');
    }

    public function store(Request $request)
    {
        $request->validate([
            'total'         => 'required|numeric|min:0',
            'cart'          => 'required|string',
            'payment_proof' => 'required|image|max:4096',
        ]);

        $cartItems = json_decode($request->cart, true);

        if (empty($cartItems)) {
            return response()->json(['success' => false, 'message' => 'El carrito está vacío'], 422);
        }

        $user = auth()->user();

        DB::beginTransaction();

        try {
            // Subir comprobante a Cloudinary
            $paymentUrl = null;

            if ($request->hasFile('payment_proof')) {
                $uploadApi = new \Cloudinary\Api\Upload\UploadApi();
                $upload = $uploadApi->upload(
                    $request->file('payment_proof')->getRealPath(),
                    ['folder' => 'orders/payment_proofs', 'resource_type' => 'image']
                );
                $paymentUrl = $upload['secure_url'];
            }

            // Crear orden
            $order = Order::create([
                'customer_name'     => $user->name,
                'customer_phone'    => $user->phone ?? '',
                'customer_email'    => $user->email,
                'status_id'         => 1,
                'payment_method_id' => 1,
                'total'             => round($request->total, 2),
                'payment_proof'     => $paymentUrl,
            ]);

            // Crear un OrderItem por cada producto del carrito
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $item['id'],
                    'quantity'   => $item['quantity'],
                    'price'      => round($item['price'], 2),
                    'subtotal'   => round($item['subtotal'], 2),
                ]);
            }

            // Preparar datos para el correo
            $itemsForMail = array_map(function ($item) {
                return [
                    'name'     => $item['nombre'] ?? $item['name'] ?? 'Producto',
                    'quantity' => $item['quantity'],
                    'price'    => round($item['price'], 2),
                    'subtotal' => round($item['subtotal'], 2),
                ];
            }, $cartItems);

            //  Enviar correo al cliente + copia admin
            try {

                Mail::to($order->customer_email)
                    ->send(new OrderConfirmation($order, $itemsForMail));

            } catch (\Exception $mailError) {
                Log::error("Error enviando correo pedido directo: " . $mailError->getMessage());
            }
            
            Cart::destroy();
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