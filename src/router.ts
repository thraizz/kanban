import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "./user";
import HomeVue from "./views/Home.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: HomeVue,
      },
      meta: {
        title: "Home",
      },
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      component: () => import("./views/Registration.vue"),
      meta: {
        title: "Registration",
      },
    },
    {
      path: "/boards/new",
      component: () => import("./views/NewBoard.vue"),
      meta: {
        title: "New Board",
        showBack: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useUser();
  if (to.path == "/projects/new" && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});
