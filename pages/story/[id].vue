<script lang="ts" setup>
  import { getImageUrl } from '~/utils/getImageUrl'
  const route = useRoute()

  const isLoading = ref(true)

  const { $api } = useNuxtApp()
  const { data } = await $api.stories.getDetailStory(route.params.id)
  const detailStory = ref(data.value?.data)
  if(detailStory.value == null) {
    showError({
      statusCode: 404,
      statusMessage: "Page Not Found"
    })
  }

  useSeoMeta({
    title: detailStory.value?.title,
    ogTitle: detailStory.value?.title,
    description: detailStory.value?.content,
    ogDescription: detailStory.value?.content,
    ogImage: getImageUrl(detailStory.value?.cover_image?.formats?.thumbnail?.url || '/images/404.svg'),
  })

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
