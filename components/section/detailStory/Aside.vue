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
</script>
<template>
  <div class="aside shadow-sm">
    <h6 class="title">Author</h6>
    <div class="info">
      <img class="image" :src="getImageUrl(data.author.profile_picture.url)" alt="">
      <h5 class="name">{{ data.author.name }}</h5>
      <h5 class="biodata">{{ data.author.biodata }}</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .aside{
    padding: 20px;
    text-align: center;
    position: sticky;
    top: 7.5rem;
  }
  .title{
    font-weight: normal;
    margin: 10px 0;
    color: #8f8f8f;
  }
  .name{
    font-weight: 500;
    font-size: 1.2em;
  }
  .biodata{
    font-size: 1em;
    font-weight: 400;
    color: #8f8f8f;
    margin: 20px auto;
  }
  .image{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin: 20px auto;
  }
</style>
