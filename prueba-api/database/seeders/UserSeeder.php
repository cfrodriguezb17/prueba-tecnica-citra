<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('password'); // You can change 'password' to whatever you like

        $adminRole = Role::where('name', 'Admin')->first();
        $supportRole = Role::where('name', 'Support')->first();
        $clientRole = Role::where('name', 'Client')->first();

        // Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => $password,
            'role_id' => $adminRole->id,
        ]);

        // Support Users
        User::factory()->create([
            'name' => 'Support User One',
            'email' => 'support1@example.com',
            'password' => $password,
            'role_id' => $supportRole->id,
        ]);

        User::factory()->create([
            'name' => 'Support User Two',
            'email' => 'support2@example.com',
            'password' => $password,
            'role_id' => $supportRole->id,
        ]);

        // Client Users
        User::factory()->create([
            'name' => 'Client User One',
            'email' => 'client1@example.com',
            'password' => $password,
            'role_id' => $clientRole->id,
        ]);

        User::factory()->create([
            'name' => 'Client User Two',
            'email' => 'client2@example.com',
            'password' => $password,
            'role_id' => $clientRole->id,
        ]);
    }
}
