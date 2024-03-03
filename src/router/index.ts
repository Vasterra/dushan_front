import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import DashboardPage from "../views/DashboardPage.vue"
import UiPage from "../views/UiPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPage,
  },
  {
    path: "/ui",
    name: "ui",
    component: UiPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
