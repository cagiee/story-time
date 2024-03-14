<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    layout: 'user'
  })  
</script>

<template>
  <div>
    <SectionUserBookmarkList />
  </div>
</template>

<style>

</style>
