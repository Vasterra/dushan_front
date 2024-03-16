import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import DashboardPage from "../views/DashboardPage.vue"
import UiPage from "../views/UiPage.vue"
import ShowOrder from "../views/ShowOrder.vue"
import AdminOrders from "../views/admin/adminOrders.vue"
import AdminLogin from "../views/admin/adminLogin.vue"
import adminAuth from "@/router/middleware/adminAuth"
import { useApi } from "@/stores/api"

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
  {
    path: "/admin/orders",
    name: "adminOrders",
    component: AdminOrders,
    meta: {
      title: "Orders",
      metaTags: [
        {
          name: "description",
          content: "Orders",
        },
        {
          property: "og:description",
          content: "Orders",
        },
      ],
    },
  },
  {
    path: "/admin/login",
    name: "adminLogin",
    component: AdminLogin,
    meta: {
      title: "Login",
      metaTags: [
        {
          name: "description",
          content: "Login",
        },
        {
          property: "og:description",
          content: "Login",
        },
      ],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((toRoute, fromRoute, next) => {
  /* eslint-disable */
  // @ts-ignore
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "Home"
  if (
    !useApi().getCookie("jwtToken") &&
    toRoute.path.toString().startsWith("/admin") &&
    toRoute.path !== "/admin/login"
  ) {
    next({
      name: "dashboard",
    })
  }

  if (useApi().getCookie("jwtToken") && toRoute.path === "/admin/login") {
    next({
      name: "adminOrders",
    })
  }
  next()
})

export default router
