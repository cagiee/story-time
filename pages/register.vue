<script lang="ts" setup>
  import Navbar from '~/components/layouts/default/Navbar.vue'
  import Footer from '~/components/layouts/default/Footer.vue'
  import RegisterForm from '~/components/section/register/RegisterForm.vue'
</script>
<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container">
      <RegisterForm />
    </div>
  </main>
  <Footer />

</template>
<style lang="scss" scoped>
  .container{
    margin-top: 7.5rem;
    min-height: 100vh;
  }
</style>
