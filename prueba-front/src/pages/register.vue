<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registrarse</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="userData.name"
                :rules="nameRules"
                label="Nombre"
                required
                prepend-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="userData.email"
                :rules="emailRules"
                label="Correo Electrónico"
                required
                prepend-icon="mdi-email"
              ></v-text-field>

              <v-select
                v-model="userData.role_id"
                :items="roleOptions"
                item-title="text"
                item-value="value"
                label="Rol"
                required
                prepend-icon="mdi-account-group"
              ></v-select>

              <v-text-field
                v-model="userData.password"
                :rules="passwordRules"
                label="Contraseña"
                type="password"
                required
                prepend-icon="mdi-lock"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                label="Confirmar Contraseña"
                type="password"
                required
                prepend-icon="mdi-lock-check"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid"
              @click="register"
            >
              Registrarse
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="error" class="error--text">
            {{ error }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/login" class="text-decoration-none">
              <v-btn text color="primary">
                ¿Ya tienes una cuenta? Inicia Sesión
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref(null);
const valid = ref(true);
const loading = ref(false);
const error = ref("");
const confirmPassword = ref("");

const userData = ref({
  name: "",
  email: "",
  role_id: 1,
  password: "",
});

const roleOptions = [
  { text: "Cliente", value: 1 },
  { text: "Soporte", value: 2 },
  { text: "Administrador", value: 3 },
];

const nameRules = [
  (v) => !!v || "El nombre es obligatorio",
  (v) => v.length >= 2 || "El nombre debe tener al menos 2 caracteres",
];

const emailRules = [
  (v) => !!v || "El correo electrónico es obligatorio",
  (v) => /.+@.+\..+/.test(v) || "El correo electrónico debe ser válido",
];

const passwordRules = [
  (v) => !!v || "La contraseña es obligatoria",
  (v) => v.length >= 8 || "La contraseña debe tener al menos 8 caracteres",
];

const confirmPasswordRules = computed(() => [
  (v) => !!v || "Confirmar contraseña es obligatorio",
  (v) => v === userData.value.password || "Las contraseñas no coinciden",
]);

const register = async () => {
  if (!form.value.validate()) return;

  loading.value = true;
  error.value = "";

  const result = await authStore.register(userData.value);

  if (result.success) {
    router.push("/");
  } else {
    error.value = result.message;
  }

  loading.value = false;
};
</script>
