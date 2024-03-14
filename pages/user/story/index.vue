<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    layout: 'user'
  })  
</script>

<template>
  <div>
    <SectionUserStoryList />
  </div>
</template>

<style lang="scss" scoped>

</style>
