<script lang="ts" setup>
  const showForm = ref(false)
</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">My Profile</h1>
      <UiButton 
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
        <SectionUserProfileForm v-model="showForm"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
