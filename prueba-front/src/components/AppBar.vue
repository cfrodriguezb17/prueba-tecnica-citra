<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>App de Tickets</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="logout" v-if="authStore.isAuthenticated">
      <v-icon left>mdi-logout</v-icon>
      Cerrar Sesión
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-if="authStore.isAuthenticated">
        <v-list-item-content>
          <v-list-item-title>{{ authStore.user?.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ authStore.userRole }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <!-- Common items -->
      <v-list-item to="/" v-if="authStore.isAuthenticated">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Client items -->
      <v-list-item to="/create-ticket" v-if="authStore.isClient">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Crear Ticket</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/my-tickets" v-if="authStore.isAuthenticated">
        <v-list-item-icon>
          <v-icon>mdi-ticket</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Mis Tickets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Support/Admin items -->
      <v-list-item
        to="/handle-tickets"
        v-if="authStore.isSupport || authStore.isAdmin"
      >
        <v-list-item-icon>
          <v-icon>mdi-tools</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Gestionar Tickets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/list-tickets" v-if="authStore.isAuthenticated">
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Todos los Tickets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Admin items -->
      <v-list-item to="/list-users" v-if="authStore.isAdmin">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/reports" v-if="authStore.isAuthenticated">
        <v-list-item-icon>
          <v-icon>mdi-chart-bar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Reportes</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Auth items -->
      <v-list-item to="/login" v-if="!authStore.isAuthenticated">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Iniciar Sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/register" v-if="!authStore.isAuthenticated">
        <v-list-item-icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Registrarse</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const drawer = ref(false);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
