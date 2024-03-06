<script lang="ts" setup>
  import InputVariant from "~/components/ui/InputVariant.vue";
  import ButtonVariant from "~/components/ui/ButtonVariant.vue";
  
  const name = ref()
  const username = ref()
  const email = ref()
  const password = ref()
  const passwordConfirmation = ref()
</script>
<template lang="">
  <div class="shadow-sm mx-auto col-sm-5 register-form">
    <h3>Register</h3>
    <Form>
      <InputVariant v-model="name" name="name" placeholder="Enter name" label="Name"/>
      <InputVariant v-model="username" name="username" placeholder="Enter username" label="Username"/>
      <InputVariant v-model="email" name="email" placeholder="Enter email" label="Email"/>
      <InputVariant v-model="password" name="password" inputType="password" placeholder="Enter password" label="Password"/>
      <InputVariant v-model="passwordConfirmation" name="passwordConfirmation" inputType="password" placeholder="Enter password confirmation" label="Password Confirmation"/>
      <ButtonVariant buttonType="submit" classes="col-12" content="Register" variant="black" />
    </Form>
  </div>
</template>
<style lang="scss">
  .register-form{
    padding: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>