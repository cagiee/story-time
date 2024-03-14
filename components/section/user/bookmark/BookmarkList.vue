<script lang="ts" setup>
  const route = useRoute()
  const stories = ref([] as any)
  const pagination = ref({
    pageCount: 1
  })
  
  function paginateBookmark(array: any[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }

  const loadBookmark = async () => {
    stories.value = JSON.parse(localStorage.getItem('bookmark') || '[]')
    const currentPage = parseInt(route.query.page as string) || 1
    const pageSize = 6

    pagination.value.pageCount = Math.ceil(stories.value.length / pageSize)

    stories.value = paginateBookmark(stories.value.reverse(), pageSize, currentPage)
    
    if (pagination.value.pageCount < currentPage){
      await navigateTo({ query: {page: pagination.value.pageCount} })
      loadBookmark()
    }
  }

  onMounted(() => {
    loadBookmark()
  })
  watch(
    () => route.fullPath,
    () => {
      loadBookmark()
    },
  )
</script>
<template lang="">
  <h1 class="title">Bookmark</h1>
  <div class="row equal-height-row row-gap-4">
    <UiStoryListCard v-for="story in stories" :key="story.id" :story="story" class="col-6 col-md-4" @loadBookmark="loadBookmark"/>
    <div class="" v-if="stories.length == 0" align="center">
      <img src="/images/empty-data.svg" class="my-4" width="100px" alt="">
      <h4>No data found</h4>
    </div>
  </div>
  <ClientOnly >
    <UiPagination :pagination="pagination" />
  </ClientOnly>
</template>

<style lang="scss" scoped>
.title{
  font-size: 1.5em;
  margin-bottom: 16px;
}  
</style>