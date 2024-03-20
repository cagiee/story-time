<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  coverImage: {
    type: String,
    default: '',
    required: false
  }
})

const inputCoverImage = ref()
const coverImagePreview = ref(props.coverImage ? getImageUrl(props.coverImage) : null)

const { $toast } = useNuxtApp()

const handleCoverImageChange = (event: any) => {
  const file = event.target.files[0]

  if (file.size > 2000000)
    return $toast.error('Maximum file size is 2MB')

  const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png']

  if (allowedExtension.indexOf(file.type) == -1)
    return $toast.error('Only .JPEG .JPG .PNG are allowed')

  const reader = new FileReader()
  reader.onload = (e: any) => {
    coverImagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)

}
const clearCoverImage = () => {  
  coverImagePreview.value = inputCoverImage.value.value = null
}
</script>

<template>
  <div class="cover-image">
    <div class="story-cover-img-wrapper">
      <UiButton v-if="coverImagePreview" buttonType="button" variant="danger" classes="rounded-full" class="btn-clear-cover-image" icon="material-symbols:close" @Click="clearCoverImage" />
      <div class="story-cover-img" :class="!coverImagePreview ? 'dashed-border' : ''" @click="inputCoverImage.click()">
        <div class="" align="center" v-if="!coverImagePreview">
          <Icon name="material-symbols:add-circle-rounded" class="col-12" />
          Add image
        </div>
        <img v-else :src="coverImagePreview" alt="" class="cover-image-preview">
      </div>
      <input type="file" v-bind="$attrs" @change="handleCoverImageChange" class="d-none" ref="inputCoverImage" accept=".png, .jpg, .jpeg"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.story-cover-img{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 300px;
    font-size: 1em;
    cursor: pointer;
    border: 1px solid #ced4da;

    &.dashed-border{
      border: 2px dashed #ced4da !important;
    }
  }

  .cover-image-preview{
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    max-width: 300px;
    object-fit: contain;
  }

  .btn-clear-cover-image{
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%);
  }
  .story-cover-img-wrapper{
    position: relative;
    width: 100%;
    max-width: 300px;
  }
</style>
