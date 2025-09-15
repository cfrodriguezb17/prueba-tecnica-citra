<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Bienvenido a la App de Tickets</h1>
          </v-card-title>
          <v-card-text>
            <p v-if="authStore.isAuthenticated">
              ¡Hola {{ authStore.user?.name }}! Has iniciado sesión como
              {{ authStore.userRole }}.
            </p>
            <p v-else>
              Por favor, inicia sesión para acceder al sistema de tickets.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="authStore.isAuthenticated">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Acciones Rápidas</v-card-title>
          <v-card-text>
            <v-btn
              v-if="authStore.isClient"
              color="primary"
              block
              to="/create-ticket"
              class="mb-2"
            >
              Crear Nuevo Ticket
            </v-btn>
            <v-btn color="secondary" block to="/my-tickets">
              Ver Mis Tickets
            </v-btn>
            <v-btn
              v-if="authStore.isSupport || authStore.isAdmin"
              color="info"
              block
              to="/handle-tickets"
            >
              Gestionar Tickets
            </v-btn>
            <v-btn
              v-if="authStore.isAdmin"
              color="warning"
              block
              to="/list-users"
            >
              Gestionar Usuarios
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Reportes</v-card-title>
          <v-card-text>
            <v-btn color="success" block to="/reports"> Ver Reportes </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>
