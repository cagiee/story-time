export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token')
  const { $api } = useNuxtApp()
  const { user, setUser } = useMyUserStore()
  
  const checkAuth = async () => {
    if (!!token.value) {    
      const { data, error } = await $api.user.getProfile()
      await setUser(!error.value ? data.value?.data : null)
    } else {
      await setUser(null)
    }
  }

  checkAuth()

})
