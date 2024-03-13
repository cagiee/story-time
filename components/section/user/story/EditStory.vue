<script lang="ts" setup>
const { $api } = useNuxtApp()
const route = useRoute()

const { data } = await $api.stories.getDetailStory(route.params.id)
const detailStory = data.value?.data

const title = ref(detailStory.title)
const category = ref(detailStory.category.id)
const content = ref(detailStory.content)
const coverImage = ref(detailStory.cover_image)

const isLoading = ref(false)
const $toast = useToast()
const quillValidate = ref()
const coverImageValidate = ref()

const { data: categories } = await $api.category.getCategoryList()
const categoryList = categories.value?.data.map(item => {
  return {
    value: item.id,
    text: item.name
  }
})

const validate = () => {  
  if(!content.value || content.value == '<p><br></p>'){
    quillValidate.value = 'Content is required'
  } else {
    quillValidate.value = ''
  }  

  return !quillValidate.value
}

const handleSubmit = async () => {
  if(!validate())
    return
  
  isLoading.value = true

  const { data: updateStory, error: errorCreate }: any = await $api.stories.updateStory(route.params.id, {
    data: {
      title: title.value,
      category: category.value,
      content: content.value,
    }
  })
    
  if(errorCreate.value){
    const { error: {message} }: any = errorCreate.value.data
    $toast.error(message)
  } else {
    if(coverImage.value){
      await $api.stories.deleteStoryImage(data.value?.data.cover_image.id)

      const formDataUpload = new FormData()
      formDataUpload.append('files', coverImage.value)
      formDataUpload.append('refId', updateStory.value?.data.id)
      formDataUpload.append('ref', 'api::story.story')
      formDataUpload.append('field', 'cover_image')
      
      const { error: errorUpload } = await $api.stories.uploadStoryImage(formDataUpload)
  
      if (errorUpload.value) {
        const { error: {message} }: any = errorUpload.value.data
        $toast.error(message)
        return
      }    
    }
    $toast.success('Story updated successfully')
    navigateTo('/user/story')
  }

  isLoading.value = false
}
</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">
        <icon name="material-symbols:arrow-back-rounded" class="cursor-pointer" @click="navigateTo('/user/story')" />
        Edit Story
      </h1>
    </div>
    <Form class="d-flex flex-column gap-4" @submit="handleSubmit" @invalid-submit="validate">
      <UiInputVariant 
        inputType="text"
        name="title"
        v-model="title"
        label="Title"
        placeholder="Enter a story title"
        :rules="{required: true}"
        />
      <UiInputVariant 
        inputType="select"
        name="category"
        v-model="category"
        label="Category"
        placeholder="Select a category"
        :rules="{required: true}"
        :options="categoryList"
        />
      <div class="quill-wrapper">
        <UiQuillEditor v-model="content" label="Content" />
        <p class="error-message" v-if="quillValidate">{{ quillValidate }}</p>
      </div>
      <div class="">
        <SectionUserStoryCoverImage v-model="coverImage" />
        <p class="error-message" v-if="coverImageValidate">{{ coverImageValidate }}</p>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <UiButtonVariant buttonType="nuxtLink" path="/user/story" variant="white" content="Cancel" />
        <UiButtonVariant buttonType="submit" variant="black" :isLoading="isLoading" content="Submit" />
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
  .error-message{
    color: red;
    font-weight: 400;
    font-size: .9em;
    margin-top: .25rem;
    margin-bottom: 0;
  }
</style>