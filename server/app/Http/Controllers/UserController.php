<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();
        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }
        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        $authenticatedUser = Auth::user();

        if ($authenticatedUser->id == $id) {
            $authenticatedUser->delete();

            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }

    public function mail(Request $request)
    {
        $errors = [];
        $mails = [];
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        foreach ($request->ids as $id){
            $user = User::find($id);
            if(!$user)
                $errors[] = $id;
            else
                $mails[] = $user->email;
        }
        if(empty($errors))
            dispatch(new SendEmailJob($mails));
        else
            return response()->json(['error' => $errors], 422);
    }
}
