<script lang="ts" setup>
const { $api } = useNuxtApp()
const $toast = useToast()
const route = useRoute()
const props = defineProps({
  form: String
})

const initialValues = reactive({
  title: '',
  category: '',
  content: '',
  coverImage: ''
})

const detailStory = {} as any

if (props.form == 'edit') {
  const { data } = await $api.stories.getDetailStory(route.params.id)
  detailStory.value = data.value?.data
  initialValues.title = detailStory.value.title
  initialValues.category = detailStory.value.category.id
  initialValues.content = detailStory.value.content
  initialValues.coverImage = detailStory.value.cover_image.url
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

const handleSubmit = async (formData: any) => {
  
  isLoading.value = true

  let responseData = {} as any
  let requestError = {} as any

  switch (props.form) {
    case 'create':
      ({ data: responseData, error: requestError } = await createStory(formData))
      break
    case 'edit':
      ({ data: responseData, error: requestError } = await updateStory(formData))
      break
  }

  if(requestError.value){    
    const { error: {message} }: any = requestError.value.data
    $toast.error(message)
  } else {
    
    if (props.form == 'edit' && formData.coverImage instanceof File)
      await $api.stories.deleteStoryImage(detailStory.value?.cover_image.id)
    
    if (formData.coverImage instanceof File || props.form == 'create') {
      const {error: errorUpload} = await uploadCoverImage(responseData.value.data.id, formData.coverImage)
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

const createStory = async (formData: any) => {
  return await $api.stories.createStory({
    title: formData.title,
    category: formData.category,
    content: formData.content,
  })
}

const updateStory = async (formData: any) => {
  return await $api.stories.updateStory(route.params.id, {
    data: {
      title: formData.title,
      category: formData.category,
      content: formData.content,
    }
  })
}

const uploadCoverImage = async (refId: string, coverImage: any) => {
  const formDataUpload = new FormData()
  formDataUpload.append('files', coverImage)
  formDataUpload.append('refId', refId)
  formDataUpload.append('ref', 'api::story.story')
  formDataUpload.append('field', 'cover_image')
  
  return await $api.stories.uploadStoryImage(formDataUpload)
}

const formSchema = ref({
  fields: [
    {
      label: 'Title',
      name: 'title',
      placeholder: 'Enter a story title',
      rules: 'required',
    },
    {
      label: 'Category',
      name: 'category',
      placeholder: 'Select a category',
      rules: 'required',
      type: 'select',
      options: categoryList
    },
    {
      label: 'Content',
      name: 'content',
      rules: 'requiredQuill',
      type: 'quill',
    },
    {
      label: 'Cover Image',
      name: 'coverImage',
      rules: props.form == 'create' ? 'image|required' : '',
      type: 'coverImage',
    }
  ]
})
</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">
        <icon name="material-symbols:arrow-back-rounded" class="cursor-pointer" @click="navigateTo('/user/story')" />
        {{ props.form }} Story
      </h1>
    </div>
    <Form class="d-flex flex-column gap-4" :initialValues="initialValues"  @submit="handleSubmit">
      <UiFormDynamicForm :schema="formSchema" :isLoading="isLoading" />
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