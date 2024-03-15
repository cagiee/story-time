<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    layout: 'user'
  })  
</script>

<template>
  <div>
    <SectionUserBookmark />
  </div>
</template>

<style>

</style>
