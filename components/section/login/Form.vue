<script lang="ts" setup>

  const isLoading = ref(false)

  const formSchema = {
    fields: [
      {
        label: 'Username or Email',
        name: 'identifier',
        placeholder: 'Enter your username or email',
        rules: 'required',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        rules: 'required',
      }
    ]
  }
  
  const handleLogin = async (formData: any) => {
    isLoading.value = true

    const { $api } = useNuxtApp()
    const { user, setUser } = useMyUserStore()

    const { data, error } = await $api.auth.login({
      identifier: formData.identifier,
      password: formData.password,
    })

    if(error.value){
      const { error: {message} }: any = error.value.data

      const { $toast } = useNuxtApp()
      $toast.error(message)
    } else {
      const token = useCookie('token')
      
      token.value = data.value?.data.jwt

      const { data: userProfile } = await $api.user.getProfile({
        headers: {
          authorization: `Bearer ${token.value}` || ''
        }
      })
      
      await setUser(userProfile.value?.data)
      
      navigateTo('/')
    }
    
    isLoading.value = false
  }
</script>
<template lang="">
  <div class="shadow-sm mx-auto col-12 col-lg-5">
    <Form class="login-form" @submit="handleLogin">
      <h3>Login</h3>
      <UiFormDynamicForm :schema="formSchema" v-model="isLoading" />
      <p>Don't have an account yet ? <nuxt-link to="/register">Register</nuxt-link></p>
      <UiButton buttonType="submit" classes="col-12" content="Login" variant="black" :isLoading="isLoading"/>
    </Form>
  </div>
  
</template>
<style lang="scss" scoped>
  .login-form{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    margin-top: 1rem;
    padding: 2rem;
    background-color: #ffffff;
  }
  a{
    font-weight: 600;
    color: #000000;
  }
</style>