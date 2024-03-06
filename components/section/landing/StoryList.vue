<script lang="ts" setup>
  import { useMyStoryStore } from "~/stores/story"
  import StoryListCard from "~/components/ui/StoryListCard.vue";
  import SelectForm from "~/components/ui/SelectForm.vue";
  import InputVariant from "~/components/ui/InputVariant.vue";
  import ButtonVariant from "~/components/ui/ButtonVariant.vue";

  const storyStore = useMyStoryStore()
  const { fetchStoryList, incrementPagination, resetPagination } = storyStore
  const { stories, meta } = storeToRefs(storyStore)
  const loading = ref(true)

  await fetchStoryList()

  const data = stories.value
  
  const sort = ref("")
  const keyword = ref("")
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

  const searchAndSortStoryList = async () => {
    loading.value = true
    await resetPagination()
    await fetchStoryList(keyword.value, sort.value)
    loading.value = false
  }

  const fetchMoreStory = async () => {
    loading.value = true
    await incrementPagination()
    await fetchStoryList(keyword.value, sort.value)
    loading.value = false
  }
  
  loading.value = false
</script>
<template lang="">
  <div class="container">
    <div class="row">
      <div class="col-6 col-sm-9">
        <form action="javascript:;">
          <div class="d-flex mb-3">
            <InputVariant v-model="keyword" placeholder="Search Story..."/>
            <ButtonVariant buttonType="submit" icon="material-symbols:search" variant="black" @click="searchAndSortStoryList"/>
          </div>
        </form>
      </div>
      <div class="col-6 col-sm-3">
        <SelectForm v-model="sort" :options="sortOptions" classes="w-" placeholder="Sort" @change="searchAndSortStoryList"/>
      </div>
    </div>
    <div class="row">
      <StoryListCard v-for="story in stories" :key="story.id" :story="story"/>
      <div v-if="loading" class="placeholder-glow col-6 col-md-6 col-lg-4 col-xl-3" v-for="i in 10" :key="i">
        <div class="placeholder story-card-placeholder"></div>
      </div>
      <div v-else-if="stories.length == 0" class="d-flex justify-content-center p-4">
        <div>
          <img src="/images/empty-data.svg" alt="" width="270">
          <h4 class="text-center mt-4">No data found</h4>
        </div>
      </div>
      <div v-else-if="meta.pagination.page < meta.pagination.pageCount" class="col-12" align="center">
        <ButtonVariant buttonType="button" content="Load More" variant="white" @click="fetchMoreStory"/>
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