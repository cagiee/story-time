<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    layout: 'user'
  })  
</script>
<template lang="">
  <div class="d-flex flex-column gap-4">
    <SectionUserMyProfile />
    <SectionUserEditPassword />
  </div>
</template>