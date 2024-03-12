<script lang="ts" setup>
  const identifier = ref('testing9')
  const password = ref('12312')

  const isLoading = ref(false)
  
  const handleLogin = async () => {
    isLoading.value = true

    const { $api } = useNuxtApp()
    const { user, setUser } = useMyUserStore()

    const { data, error } = await $api.auth.login({
      identifier: identifier.value,
      password: password.value,
    })

    if(error.value){
      const { error: {message} }: any = error.value.data

      const $toast = useToast();
      let instance = $toast.error(message);
    } else {
      const token = useCookie('token')
      token.value = data.value?.data.jwt

      const { data: userProfile, error } = await $api.user.getProfile()
    
      await setUser(!error.value ? userProfile.value?.data : null)
      
      navigateTo('/')
    }
    
    isLoading.value = false
  }
</script>
<template lang="">
  <div class="shadow-sm mx-auto col-12 col-lg-5">
    <Form class="login-form" @submit="handleLogin">
      <h3>Login</h3>
      <UiInputVariant
        v-model="identifier"
        name="identifier"
        placeholder="Enter username or email" 
        label="Username or Email" 
        :rules="{required: true}" />
      <UiInputVariant
        v-model="password"
        name="password"
        inputType="password"
        placeholder="Enter password" 
        label="Password" 
        :rules="{required: true}" />
      <UiButtonVariant buttonType="submit" classes="col-12" content="Login" variant="black" :isLoading="isLoading"/>
      <p>Don't have an account yet ? <nuxt-link to="/register">Register</nuxt-link></p>
    </Form>
  </div>
  
</template>
<style lang="scss" scoped>
  .login-form{
    padding: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
  a{
    font-weight: 600;
    color: #000000;
  }
</style>