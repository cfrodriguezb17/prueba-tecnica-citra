/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Stores
import { useAuthStore } from "@/stores/auth";

// Styles
import "unfonts.css";

const app = createApp(App);

registerPlugins(app);

// Initialize auth store
const authStore = useAuthStore();
authStore.initializeAuth();

app.mount("#app");
