<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Gestionar Tickets</h1>
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
              <template v-slot:item.creator="{ item }">
                {{ item.creator?.name || "Desconocido" }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon icon="mdi-pencil" @click="editTicket(item)"></v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Actualizar Ticket</span>
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
                <v-select
                  v-model="updateData.status"
                  :items="statusOptions"
                  :item-title="'text'"
                  :item-value="'value'"
                  label="Estado"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="updateData.answer"
                  label="Respuesta"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEdit">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveUpdate">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ticketsAPI } from "@/services/api";

const tickets = ref([]);
const loading = ref(false);
const editDialog = ref(false);
const selectedTicket = ref(null);
const updateData = ref({
  status: "",
  answer: "",
});

const headers = [
  { title: "ID", key: "id" },
  { title: "Título", key: "title" },
  { title: "Estado", key: "status" },
  { title: "Creador", key: "creator" },
  { title: "Creado", key: "created_at" },
  { title: "Acciones", key: "actions", sortable: false },
];

const statusOptions = [
  { text: "Creado", value: "created" },
  { text: "En Progreso", value: "in_progress" },
  { text: "Finalizado", value: "finished" },
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

const editTicket = (ticket) => {
  selectedTicket.value = ticket;
  updateData.value = {
    status: ticket.status,
    answer: ticket.answer || "",
  };
  editDialog.value = true;
};

const closeEdit = () => {
  editDialog.value = false;
  selectedTicket.value = null;
};

const saveUpdate = async () => {
  if (!selectedTicket.value) return;

  try {
    await ticketsAPI.update(selectedTicket.value.id, updateData.value);
    closeEdit();
    fetchTickets(); // Refresh list
  } catch (error) {
    console.error("Failed to update ticket:", error);
  }
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
