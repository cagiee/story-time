<script lang="ts" setup>
useSeoMeta({
    title: 'Story Time',
    ogTitle: 'Story Time',
    description: 'This is Story Time Yeah',
    ogDescription: 'This is Story Time Yeah',
    ogImage: getImageUrl('/images/icon.png', true),
  })
</script>

<template>
  <SectionLandingHero />
  <SectionLandingStoryList />
</template>
