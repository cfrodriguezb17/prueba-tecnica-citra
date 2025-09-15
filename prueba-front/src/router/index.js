/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Route guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Public routes
  const publicRoutes = ["/login", "/register"];

  // Check if route requires auth
  if (!publicRoutes.includes(to.path) && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  // Role-based guards
  if (to.path === "/create-ticket" && !authStore.isClient) {
    next("/");
    return;
  }

  if (
    to.path === "/handle-tickets" &&
    !(authStore.isSupport || authStore.isAdmin)
  ) {
    next("/");
    return;
  }

  if (to.path === "/list-users" && !authStore.isAdmin) {
    next("/");
    return;
  }

  // If authenticated user tries to access login/register, redirect to home
  if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    next("/");
    return;
  }

  next();
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
