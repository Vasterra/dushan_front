import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"
import { createYmaps } from "vue-yandex-maps"
import VCalendar from "v-calendar"
import "v-calendar/style.css"
import VueGoogleMaps from "@fawmi/vue-google-maps"

/* eslint-disable */
createApp(App)
  .use(
    createYmaps({
      apikey: "c1965cdf-4572-4ca1-85ab-83180413589d",
      lang: "en_US",
    }),
  )
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyB24wu7Q3KzQrVyyeC9pWFnXhJDPhIurYg",
    },
  })
  .use(VCalendar, {})
  .use(router)
  .use(createPinia())
  .mount("#app")
