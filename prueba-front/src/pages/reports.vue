<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Reportes de Tickets</h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-card color="orange" dark>
                  <v-card-title>Creados</v-card-title>
                  <v-card-text>
                    <h2>{{ reportData.created?.length || 0 }}</h2>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="blue" dark>
                  <v-card-title>En Progreso</v-card-title>
                  <v-card-text>
                    <h2>{{ reportData.in_progress?.length || 0 }}</h2>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="green" dark>
                  <v-card-title>Finalizados</v-card-title>
                  <v-card-text>
                    <h2>{{ reportData.finished?.length || 0 }}</h2>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Created Tickets -->
    <v-row v-if="reportData.created && reportData.created.length">
      <v-col cols="12">
        <v-card>
          <v-card-title>Tickets Creados</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reportData.created"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- In Progress Tickets -->
    <v-row v-if="reportData.in_progress && reportData.in_progress.length">
      <v-col cols="12">
        <v-card>
          <v-card-title>Tickets en Progreso</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reportData.in_progress"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Finished Tickets -->
    <v-row v-if="reportData.finished && reportData.finished.length">
      <v-col cols="12">
        <v-card>
          <v-card-title>Tickets Finalizados</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="reportData.finished"
              item-key="id"
              class="elevation-1"
            >
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
import { reportsAPI } from "@/services/api";

const reportData = ref({});
const loading = ref(false);

const headers = [
  { title: "ID", key: "id" },
  { title: "Título", key: "title" },
  { title: "Creador", key: "creator" },
  { title: "Creado", key: "created_at" },
];

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const fetchReports = async () => {
  loading.value = true;
  try {
    const response = await reportsAPI.getTicketsReport();
    reportData.value = response.data;
  } catch (error) {
    console.error("Failed to fetch reports:", error);
  }
  loading.value = false;
};

onMounted(() => {
  fetchReports();
});
</script>
