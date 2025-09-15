<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="credentials.email"
                :rules="emailRules"
                label="Correo Electrónico"
                required
                prepend-icon="mdi-email"
              ></v-text-field>

              <v-text-field
                v-model="credentials.password"
                :rules="passwordRules"
                label="Contraseña"
                type="password"
                required
                prepend-icon="mdi-lock"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid"
              @click="login"
            >
              Iniciar Sesión
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="error" class="error--text">
            {{ error }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/register" class="text-decoration-none">
              <v-btn text color="primary">
                ¿No tienes una cuenta? Regístrate
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref(null);
const valid = ref(true);
const loading = ref(false);
const error = ref("");

const credentials = ref({
  email: "",
  password: "",
});

const emailRules = [
  (v) => !!v || "El correo electrónico es obligatorio",
  (v) => /.+@.+\..+/.test(v) || "El correo electrónico debe ser válido",
];

const passwordRules = [
  (v) => !!v || "La contraseña es obligatoria",
  (v) => v.length >= 8 || "La contraseña debe tener al menos 8 caracteres",
];

const login = async () => {
  if (!form.value.validate()) return;

  loading.value = true;
  error.value = "";

  const result = await authStore.login(credentials.value);

  if (result.success) {
    router.push("/");
  } else {
    error.value = result.message;
  }

  loading.value = false;
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push("/");
  }
});
</script>
