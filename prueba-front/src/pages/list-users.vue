<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Todos los Usuarios</h1>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="users"
              :loading="loading"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:item.role="{ item }">
                <v-chip :color="getRoleColor(item.role_id)" dark>
                  {{ getRoleText(item.role_id) }}
                </v-chip>
              </template>
              <template v-slot:item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usersAPI } from "@/services/api";

const users = ref([]);
const loading = ref(false);

const headers = [
  { title: "ID", key: "id" },
  { title: "Nombre", key: "name" },
  { title: "Correo Electrónico", key: "email" },
  { title: "Rol", key: "role" },
  { title: "Creado", key: "created_at" },
];

const getRoleColor = (roleId) => {
  switch (roleId) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "red";
    default:
      return "grey";
  }
};

const getRoleText = (roleId) => {
  switch (roleId) {
    case 1:
      return "Cliente";
    case 2:
      return "Soporte";
    case 3:
      return "Administrador";
    default:
      return "Desconocido";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await usersAPI.list();
    users.value = response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
  loading.value = false;
};

onMounted(() => {
  fetchUsers();
});
</script>
