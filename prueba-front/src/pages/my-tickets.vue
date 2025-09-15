<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Mis Tickets</h1>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="createTicket">
              <v-icon left>mdi-plus</v-icon>
              Crear Ticket
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="tickets"
              :loading="loading"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" dark>
                  {{ getStatusText(item.status) }}
                </v-chip>
              </template>
              <template v-slot:item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon icon="mdi-eye" @click="viewTicket(item)"></v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ticket Detail Dialog -->
    <v-dialog v-model="ticketDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles del Ticket</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <strong>Título:</strong> {{ selectedTicket?.title }}
              </v-col>
              <v-col cols="12">
                <strong>Descripción:</strong> {{ selectedTicket?.description }}
              </v-col>
              <v-col cols="12">
                <strong>Respuesta:</strong>
                {{ selectedTicket?.answer || "Sin respuesta aún" }}
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeTicketDialog"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ticketsAPI } from "@/services/api";

const router = useRouter();

const tickets = ref([]);
const loading = ref(false);
const ticketDialog = ref(false);
const selectedTicket = ref(null);

const headers = [
  { title: "ID", key: "id" },
  { title: "Título", key: "title" },
  { title: "Estado", key: "status" },
  { title: "Creado", key: "created_at" },
  { title: "Acciones", key: "actions", sortable: false },
];

const getStatusColor = (status) => {
  switch (status) {
    case "created":
      return "orange";
    case "in_progress":
      return "blue";
    case "finished":
      return "green";
    default:
      return "grey";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "created":
      return "Creado";
    case "in_progress":
      return "En Progreso";
    case "finished":
      return "Finalizado";
    default:
      return status;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const createTicket = () => {
  router.push("/create-ticket");
};

const viewTicket = (ticket) => {
  selectedTicket.value = ticket;
  ticketDialog.value = true;
};

const closeTicketDialog = () => {
  ticketDialog.value = false;
  selectedTicket.value = null;
};

const fetchTickets = async () => {
  loading.value = true;
  try {
    const response = await ticketsAPI.list();
    tickets.value = response.data;
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
  }
  loading.value = false;
};

onMounted(() => {
  fetchTickets();
});
</script>
