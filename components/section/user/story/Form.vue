<script lang="ts" setup>
const { $api } = useNuxtApp()
const $toast = useToast()
const route = useRoute()
const props = defineProps({
  form: String
})

const title = ref()
const category = ref()
const content = ref()
const coverImage = ref()

const detailStory = ref()

if (props.form == 'edit') {
  const { data } = await $api.stories.getDetailStory(route.params.id)
  detailStory.value = data.value?.data

  title.value = detailStory.value.title
  category.value = detailStory.value.category.id
  content.value = detailStory.value.content
  coverImage.value = detailStory.value.cover_image
}

const isLoading = ref(false)
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
  if(!content.value || content.value == '<p><br></p>')
    quillValidate.value = 'Content is required'
  else
    quillValidate.value = ''
  
  if(!coverImage.value && props.form == 'create')
    coverImageValidate.value = 'Cover Image is required'
  else
    coverImageValidate.value = ''

  return !quillValidate.value && !coverImageValidate.value
}

const handleSubmit = async () => {
  
  if(!validate())
    return
  
  isLoading.value = true

  let responseData = {} as any
  let requestError = {} as any

  switch (props.form) {
    case 'create':
      ({ data: responseData, error: requestError } = await createStory())
      break
    case 'edit':
      ({ data: responseData, error: requestError } = await updateStory())
      break
  }

  if(requestError.value){    
    const { error: {message} }: any = requestError.value.data
    $toast.error(message)
  } else {
    if (props.form == 'edit' && coverImage.value)
      await $api.stories.deleteStoryImage(detailStory.value?.cover_image.id)
    
    if (coverImage.value || props.form == 'create') {
      const {error: errorUpload} = await uploadCoverImage(responseData.value.data.id)
      if (errorUpload.value) {
        const { error: {message} }: any = errorUpload.value.data
        $toast.error(message)
        isLoading.value = false
        return
      }
    }
    
    $toast.success(`Successfully ${props.form} story`)
    navigateTo('/user/story')
  }
  isLoading.value = false
}

const createStory = async () => {
  return await $api.stories.createStory({
    data: {
      title: title.value,
      category: category.value,
      content: content.value,
    }
  })
}

const updateStory = async () => {
  return await $api.stories.updateStory(route.params.id, {
    data: {
      title: title.value,
      category: category.value,
      content: content.value,
    }
  })
}

const uploadCoverImage = async (refId: string) => {
  const formDataUpload = new FormData()
  formDataUpload.append('files', coverImage.value)
  formDataUpload.append('refId', refId)
  formDataUpload.append('ref', 'api::story.story')
  formDataUpload.append('field', 'cover_image')
  
  return await $api.stories.uploadStoryImage(formDataUpload)
}

</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">
        <icon name="material-symbols:arrow-back-rounded" class="cursor-pointer" @click="navigateTo('/user/story')" />
        {{ props.form }} Story
      </h1>
    </div>
    <Form class="d-flex flex-column gap-4" @submit="handleSubmit" @invalid-submit="validate">
      <UiFormInput 
        inputType="text"
        name="title"
        v-model="title"
        label="Title"
        placeholder="Enter a story title"
        :rules="{required: true}"
        />
      <UiFormSelect 
        name="category"
        v-model="category"
        label="Category"
        placeholder="Select a category"
        :rules="{required: true}"
        :options="categoryList"
        />
      <div class="quill-wrapper">
        <UiFormQuillEditor v-model="content" label="Content" />
        <p class="error-message" v-if="quillValidate">{{ quillValidate }}</p>
      </div>
      <div class="">
        <SectionUserStoryCoverImage v-model="coverImage" />
        <p class="error-message" v-if="coverImageValidate">{{ coverImageValidate }}</p>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <UiButton buttonType="nuxtLink" path="/user/story" variant="white" content="Cancel" />
        <UiButton buttonType="submit" variant="black" :isLoading="isLoading" content="Submit" />
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