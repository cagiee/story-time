<script lang="ts" setup>
  import { useRoute } from "vue-router"
  import { getImageUrl } from '~/utils/getImageUrl'

  defineProps({
    detailStory: {
      type: Object
    },
    isLoading: {
      type: Boolean,
      default: false
    },
  })
</script>
<template>
  <div v-if="!isLoading && detailStory" class="aside shadow-sm">
    <h6 class="title">Author</h6>
    <div class="info">
      <img class="image" :src="getImageUrl(detailStory?.author.profile_picture.url)" alt="">
      <h5 class="name">{{ detailStory.author.name }}</h5>
      <h5 class="biodata">{{ detailStory.author.biodata }}</h5>
    </div>
  </div>
  <div v-else-if="isLoading && detailStory" class="placeholder-glow aside shadow-sm">
    <h6 class="placeholder title">Author</h6>
    <div class="info">
      <div class="placeholder image"></div>
      <div class="col-12">
        <h5 class="placeholder name">Test 123</h5>
      </div>
      <div class="col-12">
        <h5 class="placeholder biodata">Test 12312312</h5>
      </div>
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
