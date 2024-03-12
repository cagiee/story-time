<script lang="ts" setup>
  const { $api } = useNuxtApp()
  const { user } = useMyUserStore() as any

  const { data }: any = await $api.stories.getStories({
    params: {
      author: user.id
    }
  })

  const storyList = ref(data.value.data)
  const pagination = ref(data.value.meta.pagination)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedTime = date.toLocaleString('en-GB', { 
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedDate = date.toLocaleString('en-GB', { 
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const result = `${formattedTime}, ${formattedDate}`

    return result
  }
  
</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">Story List</h1>
      <UiButtonVariant 
        buttonType="nuxtLink"
        path="/user/story/create" 
        variant="black" 
        content="Create Story" 
        icon="material-symbols:add" 
        classes="btn-sm"
        />
    </div>
    <div >
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="50%">Title</th>
            <th>Last Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="story in storyList" :key="story.id">
            <td>{{ story.title }}</td>
            <td>{{ formatDate(story.updatedAt) }}</td>
            <td class="d-flex gap-2">
              <UiButtonVariant buttonType="button" variant="white" classes="btn-sm" content="Edit" />
              <UiButtonVariant buttonType="button" variant="outline-danger" classes="btn-sm" content="Delete" />
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="" align="center">
                <img class="my-3" src="/images/empty-data.svg" width="100px" alt="">
                <h4>No data found</h4>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  th{
    font-weight: 600;
  }
  th,td{
    padding-bottom: 20px;
  }
</style>
