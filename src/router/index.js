import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/item/:id",
      name: "item",
      component: () => import("../views/ItemView.vue"),
    },
  ],
});

export default router;
