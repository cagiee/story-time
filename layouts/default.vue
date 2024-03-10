<script lang="ts" setup>
  const route = useRoute()
</script>

<template>
  <header>
    <LayoutsDefaultNavbar :key="route.path"/>
  </header>
  <main>
    <div class="container">
      <slot />
    </div>
  </main>
  <LayoutsDefaultFooter />
</template>

<style lang="scss" scoped>

.container{
  margin-top: 7.5rem;
  min-height: calc(100vh - 78px);
}
</style>
