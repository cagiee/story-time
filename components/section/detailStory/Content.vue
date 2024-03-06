<script lang="ts" setup>
  import { useRoute } from "vue-router"
  import { getImageUrl } from '~/utils/getImageUrl';
  import { useMyStoryStore } from "~/stores/story"

  const route = useRoute()
  const storyStore = useMyStoryStore()
  const { fetchDetailStory } = storyStore
  const { detailStory } = storeToRefs(storyStore)
  const loading = ref(true)
  
  await fetchDetailStory(route.params.id);  

  const { data } = detailStory.value as { data: any }

  loading.value = false

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

    return formattedDate
  }
</script>
<template lang="">
  <div v-if="!loading">
    <h1 class="title">{{ data.title }}</h1>
    <div class="upload-date">{{ formatDate(data.createdAt) }}</div>
    <div class="mt-4">
      <img class="cover-image" :src="getImageUrl(data.cover_image.url)" alt="">
    </div>
    <div class="content" v-html="data.content"></div>
  </div>
</template>
<style lang="scss" scoped>
  .title{
    font-weight: 700;
  }
  .upload-date{
    color: #8f8f8f;
  }
  .content{
    font-size: 18px;
    line-height: 27px;
    margin-top: 24px;
  }
  .cover-image{
    width: 100%;
    border-radius: 12px;
  }
</style>