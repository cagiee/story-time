<script lang="ts" setup>
  const { $api, $bModal } = useNuxtApp()
  const route = useRoute()
  const { user } = useMyUserStore() as any
  const $toast = useToast()
  const deleteLoading = ref(false)
  const tableLoading = ref(true)

  const storyList: Ref<IStory[]> = ref([])
  const pagination = ref()
  
  const loadData = async () => {
    tableLoading.value = true
    const { data }: any = await $api.stories.getStories({
      params: {
        author: user.id,
        page: route.query.page || 1,
      }
    })
    storyList.value = data.value.data
    pagination.value = data.value.meta.pagination
    tableLoading.value = false
    
  }

  loadData()

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

  const deleteDataId = ref()
  const showDeleteModal = (id: any) => {
    $bModal.show('deleteModal')
    deleteDataId.value = id
  }
  const handleDelete = async () => {
    deleteLoading.value = true
    const { error } = await $api.stories.deleteStory(deleteDataId.value)

    if (error.value) {
      const { error: {message} }: any = error.value.data
      $toast.error(message)
    } else {
      $toast.success('Story deleted successfully')
    }

    loadData()
    $bModal.hide('deleteModal')
    deleteLoading.value = false
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
        <tbody v-if="!tableLoading">
          <tr v-for="story in storyList" :key="story.id">
            <td>{{ story.title }}</td>
            <td>{{ formatDate(story.updatedAt) }}</td>
            <td class="d-flex gap-2">
              <UiButtonVariant icon="material-symbols:edit" buttonType="nuxtLink" :path="`/user/story/${story.id}/edit`" variant="white" classes="btn-sm" content="Edit" />
              <UiButtonVariant icon="material-symbols:delete" buttonType="button" variant="outline-danger" classes="btn-sm" content="Delete" @click="showDeleteModal(story.id)" />
            </td>
          </tr>
          <tr v-if="storyList.length == 0">
            <td colspan="3">
              <div class="" align="center">
                <img class="my-3" src="/images/empty-data.svg" width="100px" alt="">
                <h4>No data found</h4>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="99">Loading Data</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UiModal id="deleteModal" confirmButtonText="Delete" cancelButtonText="Cancel" title="Delete Story" @confirm-button-click="handleDelete">
    <p>Are you sure want to delete this story?</p>
  </UiModal>
</template>

<style lang="scss" scoped>
  th{
    font-weight: 600;
    padding-bottom: 10px;
  }
  td{
    vertical-align: middle;
  }
</style>
