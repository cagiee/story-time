<script lang="ts" setup>
  import { createReusableTemplate } from '@vueuse/core'

  const showForm = ref(false)

  const [DefineEditProfileButton, ReuseEditProfileButton] = createReusableTemplate()
</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">My Profile</h1>
      <DefineEditProfileButton v-slot="{ classes }">
        <UiButton 
          v-if="!showForm"
          buttonType="button" 
          variant="white" 
          content="Edit Profile"
          :classes="classes"
          icon="material-symbols:edit-square-outline" 
          @click="showForm = true"
          />
      </DefineEditProfileButton>
      <ReuseEditProfileButton classes="d-none d-sm-flex btn-sm" />
    </div>
    <div class="row">
      <div class="col-lg-3" align="center">
        <SectionUserProfileImage />
      </div>
      <div class="col-lg-9">
        <SectionUserProfileForm v-model="showForm"/>
        <ReuseEditProfileButton classes="d-flex d-sm-none w-full" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
