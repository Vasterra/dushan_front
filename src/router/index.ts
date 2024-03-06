import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import DashboardPage from "../views/DashboardPage.vue"
import UiPage from "../views/UiPage.vue"
import ShowOrder from "../views/ShowOrder.vue"

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
  {
    path: "/orders/:uuid",
    name: "showOrder",
    component: ShowOrder,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
