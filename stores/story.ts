import { defineStore } from 'pinia'

export const useMyStoryStore = defineStore({
  id: 'myStoryStore',
  state: () => ({
    detailStory: {},
    stories: [] as any,
    meta: {} as any,
    pagination: 1,
  }),
  actions: {
    async fetchStoryList(keyword?: string, sort?:string) {
      const config = useRuntimeConfig()
      try {        
        let condition = ''
        if (keyword)
          condition = `${condition}&keyword=${keyword}`
        if (sort)
          condition = `${condition}&sort=${sort}`

        this.stories = {}

        let currentStories = this.stories.data || []
        for (let i = 1; i <= this.pagination; i++) {
          const { data } = await useFetch(`${config.public.apiBaseUrl}/api/stories/?page=${i + condition}`)
          if (data.value){
            this.stories = data.value
            this.meta = this.stories.meta
            this.stories = currentStories.concat(this.stories.data)
            currentStories = this.stories
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async fetchDetailStory(id: any){
      const config = useRuntimeConfig()
      try {
        const { data } = await useFetch(`${config.public.apiBaseUrl}/api/stories/${id}`)
        if (data.value) {
          this.detailStory = data.value      
        }
      } catch (error) {
        console.error(error);
      }
    },
    incrementPagination() {
      this.pagination++ 
    },
    resetPagination() {
      this.pagination = 1
    },
  },
})
