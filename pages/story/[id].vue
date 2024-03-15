<script lang="ts" setup>
  const route = useRoute()

  const isLoading = ref(true)

  const { $api } = useNuxtApp()
  const { data } = await $api.stories.getDetailStory(route.params.id)
  const detailStory = ref(data.value?.data)

  onMounted(() => isLoading.value = false)
</script>
<template>
  <div class="row">
    <div class="col-md-8">
      <SectionDetailStoryContent :detailStory="detailStory" :isLoading="isLoading" />
    </div>
    <div class="col-md-4">
      <SectionDetailStoryAside :detailStory="detailStory" :isLoading="isLoading" />
    </div>
  </div>
</template>
