<script lang="ts" setup>
  import Content from "~/components/section/detailStory/Content.vue"
  import Aside from "~/components/section/detailStory/Aside.vue"

  const route = useRoute()

  const isLoading = ref(true)

  const { $api } = useNuxtApp()
  const { data, error } = await $api.stories.getDetailStory(route.params.id)
  const detailStory = ref(data.value?.data)

  onMounted(() => isLoading.value = false)
</script>
<template>
  <div class="row">
    <div class="col-md-8">
      <Content :detailStory="detailStory" :isLoading="isLoading" />
    </div>
    <div class="col-md-4">
      <Aside :detailStory="detailStory" :isLoading="isLoading" />
    </div>
  </div>
</template>
