<script lang="ts" setup>
  const registerSuccess = defineModel({ default: false })

  const { $api } = useNuxtApp()
  
  const formSchema = {
    fields: [
      {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        rules: 'required',
      },
      {
        label: 'Username',
        name: 'username',
        placeholder: 'Enter your username',
        rules: 'required',
      },
      {
        label: 'Email',
        name: 'email',
        placeholder: 'Enter your email',
        rules: 'required|email',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        rules: 'required|min:6',
      },
      {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Enter your confirm password',
        rules: 'required|confirmed:@password',
      },
    ]
  }

  const isLoading = ref(false)
  const { $toast } = useNuxtApp()
  
  const { handleSubmit } = useForm()

  const handleRegister = handleSubmit(async (formdata: any) => {
    isLoading.value = true
    const { error } = await $api.auth.register({
      name: formdata.name,
      username: formdata.username,
      email: formdata.email,
      password: formdata.password,
    })
    if(error.value){
      const { error: {message} }: any = error.value.data
      $toast.error(message)
    } else {
      registerSuccess.value = true
      $toast.success("Register successfully")
    }
    
    isLoading.value = false
  })
  // # END handle Register

</script>
<template lang="">
  <div class="shadow-sm mx-auto col-12 col-lg-5">
    <Form class="form-card" @submit="handleRegister">
      <h3>Register</h3>
      <UiFormDynamicForm :schema="formSchema" :isLoading="isLoading" />
      <UiButton buttonType="submit" classes="col-12" content="Register" variant="black" :isLoading="isLoading"/>
      <p>Already have account ? <nuxt-link to="/login">Login</nuxt-link></p>
    </Form>
  </div>
</template>
<style lang="scss" scoped>
  .form-card{
    margin-top: 1rem;
    padding: 2rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  a{
    font-weight: 600;
    color: #000000;
  }
</style>