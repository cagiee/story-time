<script lang="ts" setup>
  const isLoading = ref(false)
  
  const sort = ref("")
  const keyword = ref("")
  const pagination = ref(1)
  const sortOptions = ref([
    {
      text: 'Newest',
      value: 'newest',
    },
    {
      text: 'Oldest',
      value: 'oldest',
    },
    {
      text: 'A-Z',
      value: 'a-z',
    },
    {
      text: 'Z-A',
      value: 'z-a',
    },
  ])

  const { $api, $bModal } = useNuxtApp()

  const stories = ref([])
  const meta = ref()

  const fetchStories = async () => {
    isLoading.value = true
    const { data, pending, error } = await $api.stories.getStories({
      params: {
        page: pagination.value,
        sort: sort.value,
        keyword: keyword.value,
      }
    })
    stories.value = stories.value.concat(data.value?.data as [])
    meta.value = data.value?.meta
    isLoading.value = false
  }

  const searchAndSort = () => {
    stories.value = []
    pagination.value = 1
    fetchStories()
    $bModal.hide('sortingModal')
  }



  const loadMoreStories = () => {
    pagination.value++
    fetchStories()
  }

  await fetchStories()  
  
  onMounted(() => {
    // isLoading.value = false
  })
</script>
<template lang="">
  <div class="row">
    <div class="col-sm-9">
      <form action="javascript:;" @submit="searchAndSort">
          <div class="d-flex col-12 col-md-5 mb-3">
            <UiFormInput v-model="keyword" class="w-full" placeholder="Search Story..."/>
            <UiButton buttonType="submit" icon="material-symbols:search" classes="aspect-1-1" variant="black" />
            <UiButton buttonType="button" icon="octicon:sort-desc-16" classes="d-sm-none aspect-1-1" style="margin-left: 12px" @click="$bModal.show('sortingModal')" variant="white" />
          </div>
      </form>
    </div>
    <div class="col-sm-3">
      <UiFormSelect class="d-none d-sm-block" v-model="sort" :options="sortOptions" placeholder="Sort" @change="searchAndSort"/>
    </div>  
  </div>
  <div class="row equal-height-row g-2">
    <UiStoryCard v-for="story in stories" :key="story.id" :story="story" class="col-6 col-md-4 col-xl-3" />
    <div v-if="isLoading" class="placeholder-glow col-6 col-md-6 col-lg-4 col-xl-3" v-for="i in 10" :key="i">
      <div class="placeholder story-card-placeholder"></div>
    </div>
    <div v-else-if="stories.length == 0" class="d-flex justify-content-center p-4">
      <div>
        <img src="/images/empty-data.svg" alt="" width="270">
        <h4 class="text-center mt-4">No data found</h4>
      </div>
    </div>
    <div v-else-if="meta?.pagination?.page < meta?.pagination?.pageCount" class="col-12 mt-4" align="center">
      <UiButton buttonType="button" content="Load More" variant="white" @click="loadMoreStories" />
    </div>
  </div>
  <UiModal id="sortingModal" title="Sort" confirmButtonText="Apply" classes="modal-dialog-centered" @confirm-button-click="searchAndSort">
    <UiFormSelect class="" v-model="sort" :options="sortOptions" placeholder="Sort" />
  </UiModal>
</template>
<style lang="scss" scoped>
.story-card-placeholder{
  display: block;
  height: 320px;
  margin-bottom: 24px;
}
</style>