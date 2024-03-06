<script lang="ts" setup>
  import Hero from '~/components/section/landing/Hero.vue'
  import StoryList from '~/components/section/landing/StoryList.vue'
  import Footer from '~/components/layouts/default/Footer.vue'

  import Navbar from '~/components/layouts/default/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container">
      <Hero />
      <StoryList />
      <Footer />
    </div>
  </main>
</template>

<style>

</style>
