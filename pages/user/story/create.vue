<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    layout: 'user'
  })  
</script>

<template>
  <div>
    <SectionUserStoryForm form="create" />
  </div>
</template>

<style lang="scss" scoped>

</style>
