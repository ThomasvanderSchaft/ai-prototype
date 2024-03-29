import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { user } from "@/state/App";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        component: () => import("@/views/Home/Index.vue"),
      },
      {
        path: "news",
        component: () => import("@/views/News/Index.vue"),
      },
      {
        path: 'companies/:id',
        name: 'CompanyDetail',
        component: () => import("@/views/Companies/Details.vue"),
      },
      {
        path: "companies",
        component: () => import("@/views/Companies/Index.vue"),

      },
      {
        path: "profile",
        component: () => import("@/views/Companies/Details.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Authentication middleware
router.beforeEach(async (to, from, next) => {
  if (to.path !== "/login") {
    if (user.value) {
      next();
    } else {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
