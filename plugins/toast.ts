import { useToast } from "vue-toast-notification"

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      toast: useToast({
        position: 'top-right'
      }),
    }
  }
})
