<script lang="ts" setup>
  import { getImageUrl } from '~/utils/getImageUrl';

  const props = defineProps({
    story: Object
  })

  const { user } = useMyUserStore();
  const $toast = useToast()
  const img = useImage()
  
  const story = ref(props.story)

  /**
   * Return date from any format to DD-mm-YY
   * @param {string} dateString the type string date that want to change to spesific format
   * @returns {string} result of formatted date
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: '2-digit' 
    });

    return formattedDate
  }

  const bookmarked = ref(false)

  const icon = computed(() => {
    return !bookmarked.value ? "material-symbols:bookmark-add-outline-sharp" : "material-symbols:bookmark"
  })
  
  const bookmarkStory = async () => {
    const maxBookmarkCapacity = 30

    const currentBookmark = JSON.parse(localStorage.getItem('bookmark') || '[]')

    if (!user)
      return navigateTo('/login')

    if (!story.value)
      return $toast.error('Story undefined')

    const foundedIndex = currentBookmark.findIndex((item: any) => item.id == story.value?.id)

    if(currentBookmark.length >= maxBookmarkCapacity && foundedIndex == -1) {
      return $toast.error("You have reached the maximum bookmark capacity limit (30)")
    }

    if (foundedIndex == -1){
      currentBookmark.push({
        id: story.value.id,
        title: story.value.title,
        author: {
          name: story.value.author.name,
          username: story.value.author.username,
        },
        category: {
          name: story.value.category.name
        },
        cover_image: {
          url: story.value.cover_image.url
        },
        updatedAt: story.value.updatedAt,
      })
      bookmarked.value = true
      $toast.success('Successfully added story to bookmark')
    }
    else{
      currentBookmark.splice(foundedIndex, 1)
      bookmarked.value = false
      $toast.success('Successfully removed story from bookmark')
    }
    
    const newBookmark = JSON.stringify(currentBookmark)
    
    localStorage.setItem('bookmark', newBookmark)
  }

  onMounted(() => {
    const currentBookmark = JSON.parse(localStorage.getItem('bookmark') || '[]')
    const foundedIndex = currentBookmark.findIndex((item: any) => item.id == story.value?.id)
    bookmarked.value = foundedIndex > -1
  })
</script>
<template lang="">
  <div class="equal-height-col">
    <div class="card story-list">
      <UiButtonVariant 
        buttonType="button" 
        class="btn-story-wishlist" 
        classes="wishlist" 
        variant="white" 
        :icon="icon"
        @click="bookmarkStory"
      />
      <nuxt-link :to="`/story/${story.id}`" class="image">
        <nuxt-img 
          :src="story.cover_image.url ? getImageUrl(story.cover_image.url) : '/images/404.svg'" 
          :placeholder="img(`/images/404.svg`, { h: 1, f: 'png', blur: 1, q: 50 })"
          @error="$event.target.src = '/images/404.svg'"
          class="" 
          alt="..." />
      </nuxt-link>
      <div class="card-body">
        <nuxt-link :to="`/story/${story.id}`" class="title">{{ story.title }}</nuxt-link>
        <p class="text">{{ story.content }}</p>
        <h5 class="author">by {{ story.author.name }}</h5>
        <h5 class="upload_date">{{ formatDate(story.updatedAt) }}</h5>
        <span class="badge badge-secondary">{{ story.category.name }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.story-list{
  height: 100%;
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

  .btn-story-wishlist{
    opacity: 0;
  }

  &:hover .btn-story-wishlist{
    opacity: 1;
  }
}
</style>