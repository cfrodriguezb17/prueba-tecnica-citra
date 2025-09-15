<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $user = Auth::user();

        if ($user->role->name !== 'Client') {
            return response()->json(['error' => 'Solo clientes pueden crear solicitudes'], 403);
        }

        $supports = User::whereHas('role', function($q) {
            $q->where('name', 'Support');
        })->orderBy('id')->get();

        $assignedId = null;

        if ($supports->count() === 1) {
            $assignedId = $supports->first()->id;
        } elseif ($supports->count() > 1) {
            $lastTicket = Ticket::whereNotNull('assigned_id')->latest()->first();

            if ($lastTicket) {
                $lastIndex = $supports->search(function($support) use ($lastTicket) {
                    return $support->id === $lastTicket->assigned_id;
                });

                $nextIndex = ($lastIndex + 1) % $supports->count();
                $assignedId = $supports[$nextIndex]->id;
            } else {
                $assignedId = $supports->first()->id;
            }
        }

        $ticket = Ticket::create([
            'title'       => $request->title,
            'description' => $request->description,
            'status'      => 'created',
            'user_id'     => $user->id,
            'assigned_id' => $assignedId,
        ]);

        return response()->json($ticket, 201);
    }
    public function index()
    {
        $user = Auth::user();

        if ($user->role->name === 'Admin') {
            $tickets = Ticket::all();
        } elseif ($user->role->name === 'Support') {
            $tickets = Ticket::where('assigned_id', $user->id)->get();
        } else {
            $tickets = Ticket::where('user_id', $user->id)->get();
        }

        return response()->json($tickets);
    }
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $ticket = Ticket::findOrFail($id);

        if (!in_array($user->role->name, ['Support', 'Admin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $request->validate([
            'status'      => 'sometimes|in:created,in_progress,finished',
            'assigned_id' => 'sometimes|exists:users,id',
            'answer'      => 'sometimes|string|nullable',
        ]);

        $ticket->update($request->only(['status', 'assigned_id', 'answer']));

        return response()->json([
            'message' => 'Ticket actualizado correctamente',
            'ticket'  => $ticket,
        ]);
    }
    public function ticketsByStatus()
    {
        $user = Auth::user();

        if ($user->role->name === 'Admin') {
            $tickets = Ticket::with(['user:id,name', 'assigned:id,name'])->get();
        } elseif ($user->role->name === 'Support') {
            $tickets = Ticket::with(['user:id,name', 'assigned:id,name'])
            ->where('assigned_id', $user->id)
            ->get();
        } else {
            $tickets = Ticket::with(['user:id,name', 'assigned:id,name'])
            ->where('user_id', $user->id)
            ->get();
        }

        $grouped = $tickets->groupBy('status');

        return response()->json($grouped);
    }
}
