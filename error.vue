<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <header>
    <LayoutsDefaultNavbar />
  </header>
  <main>
    <div class="container">
      <img v-if="error?.statusCode == 404" src="/images/404.svg" width="300" alt="">
      <p v-else class="error-status-code">{{ error?.statusCode }}</p>
      <p class="error-message">{{ error?.message }}</p>
      <UiButton button-type="nuxtLink" path="/" content="Back to home" variant="black" />
    </div>
  </main>
  <LayoutsDefaultFooter />
</template>

<style lang="scss" scoped>
  .error-message{
    margin: 1rem 0;
  }

  .error-status-code{
    font-size: 10em;
    font-weight: 700;
    margin: 0;
    padding: 0;
  }

  .container{
    min-height: calc(100vh - 78px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2.75rem;
  }
</style>