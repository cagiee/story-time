<script lang="ts" setup>
  definePageMeta({
    middleware: 'guest'
  })
  useSeoMeta({
    title: 'Story Time - Login',
    ogTitle: 'Story Time - Login',
    description: 'This is Story Time on a login page yow',
    ogDescription: 'This is Story Time on a login page yow',
    ogImage: ('/images/logo.svg'),
  })
</script>

<template>
  <SectionLoginForm />
</template>
