import { createRouter, createWebHistory } from "vue-router";

const MenuView = () => import("../views/MenuView.vue");
const GameView = () => import("../views/GameView.vue");

const routes = [
  {
    path: "/",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
