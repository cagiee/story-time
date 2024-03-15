<script lang="ts" setup>
  // @ts-ignore
  import VueCropper from 'vue-cropperjs'

  const props = defineProps()

  const { $api, $bModal } = useNuxtApp()
  const { user: userData, setUser } = useMyUserStore() as any

  const cropper = ref()
  const inputProfileImage = ref()
  const cropperImageUrl = ref()
  const $toast = useToast()
  const isLoading = ref(true)
  const user = ref(userData) as any

  /**
   * Handles the change event for a profile image input element.
   * @param {Event} e The change event object.
   */
   const handleProfileImageChange = (e: any) => {
    const file = e.target.files[0]
    
  if (file.size > 2000000)
    return $toast.error('Maximum file size is 2MB')

  const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png']

  if (allowedExtension.indexOf(file.type) == -1)
    return $toast.error('Only .JPEG .JPG .PNG are allowed')

    if (file.size < 2000000) {
      const reader = new FileReader()  
      reader.onload = (e) => {
        setTimeout(() => {
          cropperImageUrl.value = e?.target?.result
        }, 500)
        
        $bModal.show('cropperModal')
      }
      reader.readAsDataURL(file)
    } else {
      $toast.error('Maximum file size is 2MB')
    }
  }
  /**
   * Function for set crop result to variable mamed `croppedImage`
   */
   const uploadCroppedProfileImage = async () => {
    isLoading.value = true
    const formData = new FormData()
    formData.append("refId", user.value.id as any)
    formData.append("ref", "plugin::users-permissions.user")
    formData.append("field", "profile_picture")

    cropper.value.getCroppedCanvas().toBlob(async (blob: Blob) => {
      const file = new File([blob], "profile_picture", { type: "image/png" })
      formData.append("files", file)
      
      if (user.value.profile_picture)
        await $api.user.deleteProfileImage(user.value.profile_picture.id)

      await $api.user.updateProfileImage(formData)
      const { data: updatedUserData, error } = await $api.user.getProfile()

      if (error.value) {
        const { error: {message} }: any = error.value.data

        $toast.error(message)
      } else {
        setUser(updatedUserData.value?.data)
        user.value = updatedUserData.value?.data

        $toast.success("Avatar changed successfully")
      }
      
      $bModal.hide('cropperModal')
      isLoading.value = false
    })
  }

  onMounted(() => {    
    isLoading.value = false
  })
</script>

<template>
  <div class="profile-img-wrapper mb-4">
    <div v-if="isLoading && !user.profile_picture" class="placeholder-glow">
      <div src="" class="profile-img placeholder" />
    </div>
    <img v-else 
      :src="user.profile_picture ? getImageUrl(user.profile_picture.url) : 'https://via.placeholder.com/150'" 
      class="profile-img" 
      :class="isLoading ? 'placeholder' : ''" 
      alt="Profile Image"
      />
    <UiButton buttonType="button" content="Change Avatar" variant="white" classes="w-full mt-4" @click="inputProfileImage.click()"/>
    <input type="file" class="d-none" @change="handleProfileImageChange" ref="inputProfileImage" accept=".png, .jpg, .jpeg">
  </div>
  <UiModal id="cropperModal" title="Adjust Profile" @confirm-button-click="uploadCroppedProfileImage" :is-loading="isLoading">
    <div class="img-cropper" v-if="cropperImageUrl">
      <client-only>
        <div class="placeholder-glow relative">
          <div v-if="isLoading" class="w-full h-full absolute" style="z-index: 5;" />
            <VueCropper
              ref="cropper"
              alt="Profile Image"
              :src="cropperImageUrl"
              :aspectRatio="1 / 1"
              class="w-full"
              :class="isLoading ? 'placeholder' : ''"
              :key="cropperImageUrl"
            />
          </div>
      </client-only>
    </div>
    <div v-else>
      Loading Cropper
    </div>
  </UiModal>
</template>

<style lang="scss" scoped>
  .profile-img-wrapper{
    max-width: 200px;
    width: 100%;
    .profile-img{
      width: 100%;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
    }
    
  }
</style>
