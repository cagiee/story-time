<script lang="ts" setup>
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

  /**
   * Return date from any format to DD-MMMM-YYYY
   * @param {string} dateString the type string date that want to change to spesific format
   * @returns {string} result of formatted date
   */
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
  <div v-if="!isLoading && detailStory">
    <h1 class="title">{{ detailStory.title }}</h1>
    <div class="upload-date">{{ formatDate(detailStory.createdAt) }}</div>
    <div class="mt-4 relative">
      <UiButtonVariant buttonType="button" classes="wishlist-detail" variant="white" icon="material-symbols:bookmark-add-outline-sharp"/>
      <img class="cover-image" :src="getImageUrl(detailStory.cover_image.url)" alt="">
    </div>
    <div class="content" v-html="detailStory.content"></div>
  </div>
  <div v-else-if="isLoading && detailStory">
    <div class="placeholder-glow">
      <span class="placeholder col-12 placeholder-lg"></span>
      <span class="placeholder col-3 placeholder-lg mt-1"></span>
    </div>
    <div class="placeholder-glow my-4">
      <img class="cover-image placeholder placeholder-lg" alt="">
    </div>
    <div class="placeholder-glow">
      <span class="placeholder col-12 placeholder-lg"></span>
      <span class="placeholder col-10 placeholder-lg mt-1"></span>
      <span class="placeholder col-9 placeholder-lg mt-1"></span>
      <span class="placeholder col-10 placeholder-lg mt-1"></span>
      <span class="placeholder col-8 placeholder-lg mt-1"></span>
      <span class="placeholder col-7 placeholder-lg mt-1"></span>
    </div>
  </div>
  <div v-else>
    <h1>Story Not Found!</h1>
    <p class="mt-4 col-12 col-md-6">Story does not exist or was deleted. Please double check the URL address and make sure it is not an incorrect URL address.</p>
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
    margin: 1rem 0;
  }
  .placeholder{
    margin: 4px 0;
  }
  .cover-image{
    width: 100%;
    border-radius: 12px;
    &.placeholder{
      min-height: 600px;
    }
  }
</style>