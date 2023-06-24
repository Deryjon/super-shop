import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateProduct from "../views/CreateProduct.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create",
      name: "create-product",
      component: CreateProduct,
    },
    {
      path: "/edit/:id",
      name: "edit-product",
      component: CreateProduct,
    },
  ],
});

export default router;