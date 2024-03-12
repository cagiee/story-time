<script lang="ts" setup>
  const { $api } = useNuxtApp()

  const { data } = await $api.user.getProfile()
  const user = ref(data.value?.data)
  const toasts: Ref<IToast[]> = ref([])

  const showForm = ref(false)

</script>

<template>
  <div class="border-0 p-4 shadow-sm">
    <div class="header">
      <h1 class="title">My Profile</h1>
      <UiButtonVariant 
        v-if="!showForm"
        buttonType="button" 
        variant="white" 
        content="Edit Profile" 
        icon="material-symbols:edit-square-outline" 
        @click="showForm = true"
        />
    </div>
    <div class="row">
      <div class="col-lg-3">
        <SectionUserProfileImage />
      </div>
      <div class="col-lg-9">
        <SectionUserEditProfile v-model="showForm"/>
      </div>
    </div>
  </div>
  <div class="toast-container position-fixed top-0 end-0">
    <UiToast 
      v-for="(toast, i) in toasts" 
      :id="`toast${i}`" 
      :title="toast.title" 
      :body="toast.body" 
      :variant="toast.variant"  
      :key="i" />
  </div>
</template>

<style lang="scss" scoped>
  .title{
    font-size: 1.75em;
  }

  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
</style>
