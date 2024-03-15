<script lang="ts" setup>
  definePageMeta({
    middleware: 'guest'
  })
  const registerSuccess = ref(false)
</script>
<template>
  <SectionRegisterForm v-if="!registerSuccess" v-model="registerSuccess"/>
  <SectionRegisterSuccess v-else/>
</template>
<style lang="scss" scoped>
</style>
