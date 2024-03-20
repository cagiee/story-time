<script lang="ts" setup>
  definePageMeta({
    middleware: 'guest'
  })
  useSeoMeta({
    title: 'Story Time - Register',
    ogTitle: 'Story Time - Register',
    description: 'This is Story Time on a register page yow',
    ogDescription: 'This is Story Time on a register page yow',
    ogImage: getImageUrl('/images/icon.png', true),
  })
  const registerSuccess = ref(false)
</script>
<template>
  <SectionRegisterForm v-if="!registerSuccess" v-model="registerSuccess"/>
  <SectionRegisterSuccess v-else/>
</template>
<style lang="scss" scoped>
</style>
