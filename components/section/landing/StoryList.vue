<script lang="ts" setup>
  import InputVariant from "~/components/ui/InputVariant.vue";

  const isLoading = ref(true)
  
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

  const { $api } = useNuxtApp();

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
  }

  const loadMoreStories = () => {
    pagination.value++
    fetchStories()
  }

  await fetchStories()  
  
  onMounted(() => {
    isLoading.value = false
  })
</script>
<template lang="">
  <div class="container">
    <div class="row">
      <div class="col-6 col-sm-9">
        <form action="javascript:;" @submit="searchAndSort">
          <div class="d-flex mb-3">
            <InputVariant v-model="keyword" placeholder="Search Story..."/>
            <UiButtonVariant buttonType="submit" icon="material-symbols:search" variant="black" />
          </div>
        </form>
      </div>
      <div class="col-6 col-sm-3">
        <UiSelectForm v-model="sort" :options="sortOptions" classes="w-" placeholder="Sort" @change="searchAndSort"/>
      </div>
    </div>
    <div class="row">
      <UiStoryListCard v-for="story in stories" :key="story.id" :story="story"/>
      <div v-if="isLoading" class="placeholder-glow col-6 col-md-6 col-lg-4 col-xl-3" v-for="i in 10" :key="i">
        <div class="placeholder story-card-placeholder"></div>
      </div>
      <div v-else-if="stories.length == 0" class="d-flex justify-content-center p-4">
        <div>
          <img src="/images/empty-data.svg" alt="" width="270">
          <h4 class="text-center mt-4">No data found</h4>
        </div>
      </div>
      <div v-else-if="meta?.pagination?.page < meta?.pagination?.pageCount" class="col-12" align="center">
        <UiButtonVariant buttonType="button" content="Load More" variant="white" @click="loadMoreStories" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.story-card-placeholder{
  display: block;
  height: 320px;
  margin-bottom: 24px;
}
</style>