<script lang="ts" setup>
  import InputVariant from "~/components/ui/InputVariant.vue";

  const registerSuccess = defineModel({ default: false })

  const { $api, $bToast } = useNuxtApp()
  
  const name = ref('Cagie')
  const username = ref('cagie')
  const email = ref('cagieeeee@gmail.com')
  const password = ref('')
  const passwordConfirmation = ref('')

  const isLoading = ref(false)
  const elementKey = ref(0);
  const toasts: Ref<Object[]> = ref([]);

  // # Password Confirmation
  const confirmationRule = ref({
    required: true,
    mustMatchWith: ''
  });
  const updateConfirmationRules = () => {
    confirmationRule.value.mustMatchWith = password.value;
    elementKey.value++
  };
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
      toasts.value.push({
        variant: 'danger',
        title: 'Failed',
        body: message
      })
    } else {
      registerSuccess.value = true
    }
    
    isLoading.value = false
  }
  // # END handle Register

</script>
<template lang="">
  <div class="shadow-sm mx-auto col-12 col-lg-5">
    <Form class="register-form" @submit="handleRegister">
      <h3>Register</h3>
      <InputVariant
        v-model="name"
        name="name"
        placeholder="Enter name" 
        label="Name" 
        :rules="{required: true}" />
      <InputVariant
        v-model="username"
        name="username"
        placeholder="Enter username" 
        label="Username" 
        :rules="{required: true, min: 3}" />
      <InputVariant
        v-model="email"
        inputType="email"
        name="email"
        placeholder="Enter email" 
        label="Email" 
        :rules="{required: true, isEmail: true}" />
      <InputVariant
        v-model="password"
        name="password"
        inputType="password"
        placeholder="Enter password" 
        label="Password" 
        :rules="{required: true, min: 6}" 
        @input="updateConfirmationRules" />
      <InputVariant
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        inputType="password" 
        placeholder="Enter password confirmation" 
        label="Password Confirmation" 
        :rules="confirmationRule" 
        :key="elementKey" />
      <UiButtonVariant buttonType="submit" classes="col-12" content="Register" variant="black" :isLoading="isLoading"/>
      <p>Already have account ? <nuxt-link to="/login">Login</nuxt-link></p>
    </Form>
  </div>
  
  <UiToast :toasts="toasts" />
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