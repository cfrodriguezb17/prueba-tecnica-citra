<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card>
          <v-card-title>
            <h1>Crear Nuevo Ticket</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="ticket.title"
                :rules="titleRules"
                label="Título"
                required
                prepend-icon="mdi-title"
              ></v-text-field>

              <v-textarea
                v-model="ticket.description"
                :rules="descriptionRules"
                label="Descripción"
                required
                prepend-icon="mdi-text"
                rows="4"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid"
              @click="createTicket"
            >
              Crear Ticket
            </v-btn>
            <v-btn @click="cancel"> Cancelar </v-btn>
          </v-card-actions>
          <v-card-text v-if="error" class="error--text">
            {{ error }}
          </v-card-text>
          <v-card-text v-if="success" class="success--text">
            ¡Ticket creado exitosamente!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ticketsAPI } from "@/services/api";

const router = useRouter();

const form = ref(null);
const valid = ref(true);
const loading = ref(false);
const error = ref("");
const success = ref(false);

const ticket = ref({
  title: "",
  description: "",
});

const titleRules = [
  (v) => !!v || "El título es obligatorio",
  (v) => v.length >= 5 || "El título debe tener al menos 5 caracteres",
];

const descriptionRules = [
  (v) => !!v || "La descripción es obligatoria",
  (v) => v.length >= 10 || "La descripción debe tener al menos 10 caracteres",
];

const createTicket = async () => {
  if (!form.value.validate()) return;

  loading.value = true;
  error.value = "";
  success.value = false;

  try {
    await ticketsAPI.create(ticket.value);
    success.value = true;
    ticket.value = { title: "", description: "" };
    form.value.reset();
  } catch (err) {
    error.value = err.response?.data?.message || "Error al crear el ticket";
  }

  loading.value = false;
};

const cancel = () => {
  router.push("/");
};
</script>
