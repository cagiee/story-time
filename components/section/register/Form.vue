<script lang="ts" setup>
  const registerSuccess = defineModel({ default: false })

  const { $api } = useNuxtApp()
  
  const name = ref('Cagie')
  const username = ref('cagie')
  const email = ref('cagieeeee@gmail.com')
  const password = ref('')
  const passwordConfirmation = ref('')

  const isLoading = ref(false)
  const $toast = useToast()
  
  // # Password Confirmation
  const elementKey = ref(0)
  const confirmationRule = ref({
    required: true,
    mustMatchWith: ''
  })
  const updateConfirmationRules = () => {
    confirmationRule.value.mustMatchWith = password.value
    elementKey.value++
  }
  // # END Password Confirmation

  
  // # handle Register
  const handleRegister = async () => {
    isLoading.value = true
    const { data, error } = await $api.auth.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    })
    if(error.value){
      const { error: {message} }: any = error.value.data
      $toast.error(message)
    } else {
      registerSuccess.value = true
      $toast.success("Register successfully")
    }
    
    isLoading.value = false
  }
  // # END handle Register

</script>
<template lang="">
  <div class="shadow-sm mx-auto col-12 col-lg-5">
    <Form class="register-form" @submit="handleRegister">
      <h3>Register</h3>
      <UiFormInput
        v-model="name"
        name="name"
        placeholder="Enter name" 
        label="Name" 
        :rules="{required: true}" />
      <UiFormInput
        v-model="username"
        name="username"
        placeholder="Enter username" 
        label="Username" 
        :rules="{required: true, min: 3}" />
      <UiFormInput
        v-model="email"
        inputType="email"
        name="email"
        placeholder="Enter email" 
        label="Email" 
        :rules="{required: true, isEmail: true}" />
      <UiFormInput
        v-model="password"
        name="password"
        inputType="password"
        placeholder="Enter password" 
        label="Password" 
        :rules="{required: true, min: 6}" 
        @input="updateConfirmationRules" />
      <UiFormInput
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        inputType="password" 
        placeholder="Enter password confirmation" 
        label="Password Confirmation" 
        :rules="confirmationRule" 
        :key="elementKey" />
      <UiButton buttonType="submit" classes="col-12" content="Register" variant="black" :isLoading="isLoading"/>
      <p>Already have account ? <nuxt-link to="/login">Login</nuxt-link></p>
    </Form>
  </div>
</template>
<style lang="scss" scoped>
  .register-form{
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