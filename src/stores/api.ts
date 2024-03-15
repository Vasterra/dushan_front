import { defineStore } from "pinia"
import axios from "axios"
import router from "../router"
import { useEventBus } from "@vueuse/core"

const changeIsOpenServerErrorModal = useEventBus("changeIsOpenServerErrorModal")
const changeIsOpenLoaderModal = useEventBus("changeIsOpenLoaderModal")

export const useApi = defineStore("api", {
  actions: {
    setCookie(cname: string, cvalue: any, exdays: number) {
      const d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      const expires = "expires=" + d.toUTCString()
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    },
    getCookie(cname: string) {
      const name = cname + "="
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(";")
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == " ") {
          c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ""
    },
    request() {
      const jwtTokenIggs = this.getCookie("jwtTokenIggs")

      axios.defaults.withCredentials = true

      const client = axios.create({
        baseURL: "http://127.0.0.1:8000",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          Authorization: jwtTokenIggs ? "Bearer " + jwtTokenIggs : null,
          // 'Set-cookie': document.cookie
        },
      })

      client.interceptors.response.use(
        response => {
          return Promise.resolve(response)
        },
        error => {
          const { errors } = error.response.data
          const { status } = error.response

          if (status == 401) {
            this.setCookie("jwtTokenIggs", null, 0)
            router.push({ name: "dashboard" })
          }

          let errormessage = ""

          if (typeof errors !== "undefined") {
            Object.keys(errors).forEach(key => {
              if (errors[key].length > 1) {
                let str = ""
                /* eslint-disable */
                // @ts-ignore
                errors[key].forEach(second => {
                  str += `${second}. `
                })
                if (str) errormessage += `${str}<br>`
              } else {
                errormessage += `${errors[key]}<br>`
              }
            })
          } else {
            errormessage = error.response.data.message
          }

          changeIsOpenLoaderModal.emit(false)
          changeIsOpenServerErrorModal.emit(errormessage)
        },
      )

      return client
    },
  },
})
