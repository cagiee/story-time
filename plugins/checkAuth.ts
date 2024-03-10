export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useCookie('token')
  
  const { $api } = useNuxtApp()
  const { setUser } = useMyUserStore()
  
  if (!!token.value) {    
    const { data, error } = await $api.user.getProfile()

    await setUser(!error.value ? data.value?.data : null)
  } else {
    await setUser(null)
  }
})
