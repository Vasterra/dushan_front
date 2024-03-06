import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import DashboardPage from "../views/DashboardPage.vue"
import UiPage from "../views/UiPage.vue"
import ShowOrder from "../views/ShowOrder.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPage,
    meta: {
      title: "Dashboard",
      metaTags: [
        {
          name: "description",
          content: "Dashboard",
        },
        {
          property: "og:description",
          content: "Dashboard",
        },
      ],
    },
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
    meta: {
      title: "Order show",
      metaTags: [
        {
          name: "description",
          content: "Order show",
        },
        {
          property: "og:description",
          content: "Order show",
        },
      ],
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((toRoute, fromRoute, next) => {
  /* eslint-disable */
  // @ts-ignore
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "Home"

  next()
})

export default router
