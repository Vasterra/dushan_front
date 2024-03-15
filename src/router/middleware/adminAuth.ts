import { useApi } from "@/stores/api"
/* eslint-disable */
// @ts-ignore
export default function adminAuth({ next }) {
  console.log(useApi().getCookie("jwtToken"))
  if (!useApi().getCookie("jwtToken")) {
    return next({
      name: "Dashboard",
    })
  }
  return next()
}
