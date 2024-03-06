<script lang="ts" setup>
  import { getImageUrl } from '~/utils/getImageUrl';
  import ButtonVariant from "~/components/ui/ButtonVariant.vue";
  defineProps({
    story: Object
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: '2-digit' 
    });

    return formattedDate
  }

</script>
<template lang="">
  <div class="col-6 col-lg-4 col-xl-3">
    <div class="card story-list">
      <ButtonVariant buttonType="button" class="user-story-list" classes="rounded" variant="white" icon="material-symbols:bookmark-add-outline-sharp"/>
      <nuxt-link :to="`/story/${story.id}`" class="image">
        <img :src="getImageUrl(story.cover_image.formats.thumbnail.url)" class="" alt="...">
      </nuxt-link>
      <div class="card-body">
        <nuxt-link :to="`/story/${story.id}`" class="title">{{ story.title }}</nuxt-link>
        <p class="text">{{ story.content }}</p>
        <h5 class="author">by {{ story.author.name }}</h5>
        <h5 class="upload_date">{{ formatDate(story.createdAt) }}</h5>
        <span class="badge badge-secondary">{{ story.category.name }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.story-list{
  margin-bottom: 25px;
  position: relative;

  .title{
    font-size: 1.25rem;
    color: #0e0e0e;
    text-decoration: none;
    font-weight: 600;
    display: -webkit-box;
    line-height: 1.4;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  
    &:hover{
      text-decoration: underline;
    }
  }
  .text{
    font-size: .96rem;
    color: #8f8f8f;
    display: -webkit-box;
    line-height: 1.4;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .author, .upload_date{
    font-size: .75rem;
    color: #8f8f8f;
    font-weight: normal;
  }
  .image{
    height: 160px;
  
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .badge-secondary{
    background-color: #eee;
    color: #0e0e0e;
    font-weight: 500;
  }
  
  .user-story-list{
    position: absolute;
    top: .25rem;
    right: .25rem;
    transition: .3s;
  }

  &:hover .user-story-list{
    opacity: 1;
  }
}
</style>