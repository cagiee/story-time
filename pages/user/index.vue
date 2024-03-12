<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    layout: 'user'
  })  
</script>
<template lang="">
  <SectionUserMyProfile />
</template>