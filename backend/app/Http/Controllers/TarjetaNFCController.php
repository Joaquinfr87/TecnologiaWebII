<?php

namespace App\Http\Controllers;

use App\Models\TarjetaNFC;
use App\Models\User;
use App\Http\Resources\TarjetaNFCResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TarjetaNFCController extends Controller
{
    public function index(Request $request)
    {
        $query = TarjetaNFC::query();

        if ($request->has('id_usuario')) {
            $query->where('Id_Usuario', $request->id_usuario);
        }

        return TarjetaNFCResource::collection($query->get());
    }

    public function show($uid)
    {
        $tarjeta = TarjetaNFC::findOrFail($uid);
        return new TarjetaNFCResource($tarjeta);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uid_nfc' => 'required|string|unique:TarjetaNFC,UID_NFC|max:50',
            'id_usuario' => 'required|exists:Usuario,Id_Usuario',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        $tarjeta = TarjetaNFC::create([
            'UID_NFC' => $request->uid_nfc,
            'Id_Usuario' => $request->id_usuario,
            'Estado' => 'Activa',
        ]);

        return response()->json([
            'status' => 'ok',
            'data' => new TarjetaNFCResource($tarjeta)
        ], 201);
    }

    public function update(Request $request, $uid)
    {
        $tarjeta = TarjetaNFC::findOrFail($uid);

        $validator = Validator::make($request->all(), [
            'estado' => 'required|in:Activa,Inactiva,Perdida',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        $tarjeta->Estado = $request->estado;
        $tarjeta->save();

        return response()->json([
            'status' => 'ok',
            'data' => new TarjetaNFCResource($tarjeta)
        ], 200);
    }

    public function destroy($uid)
    {
        $tarjeta = TarjetaNFC::findOrFail($uid);
        $tarjeta->delete();

        return response()->json([
            'status' => 'ok',
            'mensaje' => 'Tarjeta eliminada correctamente'
        ], 200);
    }
}
