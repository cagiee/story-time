<script lang="ts" setup>
  import Navbar from '~/components/layouts/default/Navbar.vue'
  import Content from "~/components/section/detailStory/Content.vue"
  import Aside from "~/components/section/detailStory/Aside.vue"
  import Footer from '~/components/layouts/default/Footer.vue'
</script>
<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <Content />
        </div>
        <div class="col-md-4">
          <Aside />
        </div>
      </div>
    </div>
  </main>
  <Footer />

</template>
<style lang="scss" scoped>
  .container{
    margin-top: 7.5rem;
  }
</style>
