<script lang="ts" setup>
const { $api } = useNuxtApp()

const title = ref()
const category = ref()
const content = ref()
const coverImage = ref()

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
  
  if(!coverImage.value){
    coverImageValidate.value = 'Cover Image is required'
  } else {
    coverImageValidate.value = ''
  }
  

  return !quillValidate.value && !coverImageValidate.value
}

const handleSubmit = async () => {
  
  if(!validate())
    return
  
  isLoading.value = true
  const formDataCreate = new FormData()
  formDataCreate.append('title', title.value)
  formDataCreate.append('category', category.value)
  formDataCreate.append('content', content.value)

  const { data: newStory, error: errorCreate }: any = await $api.stories.createStory(formDataCreate)
    
  if(errorCreate.value){
    const { error: {message} }: any = errorCreate.value.data
    $toast.error(message)
  } else {
    
    const formDataUpload = new FormData()
    formDataUpload.append('files', coverImage.value)
    formDataUpload.append('refId', newStory.value?.data.id)
    formDataUpload.append('ref', 'api::story.story')
    formDataUpload.append('field', 'cover_image')
    
    const { error: errorUpload } = await $api.stories.uploadStoryImage(formDataUpload)

    if (errorUpload.value) {
      const { error: {message} }: any = errorUpload.value.data
      $toast.error(message)
    } else {
      $toast.success('Successfully create new story')
      navigateTo('/user/story')
    }    
  }
  isLoading.value = false
}

</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">
        <icon name="material-symbols:arrow-back-rounded" class="cursor-pointer" @click="navigateTo('/user/story')" />
        Create Story
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