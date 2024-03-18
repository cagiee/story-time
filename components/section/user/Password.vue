<script lang="ts" setup>
  import { createReusableTemplate } from '@vueuse/core'

  const { $api } = useNuxtApp()
  const $toast = useToast()

  const showForm = ref(false)
  const currentPassword = ref()
  const newPassword = ref()
  const confirmPassword = ref()

  // # Password Confirmation
  const elementKey = ref(0)
  const confirmationRule = ref({
    required: true,
    mustMatchWith: ''
  })
  const updateConfirmationRules = () => {
    confirmationRule.value.mustMatchWith = newPassword.value
    elementKey.value++
  }

  const hideForm = () => {
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    showForm.value = false
  }
  
  const [DefineChangePasswordButton, ReuseChangePasswordButton] = createReusableTemplate()
  // # END Password Confirmation
</script>

<template>
  <div class="user-page-card">
    <div class="header">
      <h1 class="title">Password</h1>
      <DefineChangePasswordButton v-slot="{ classes }">
        <UiButton 
          v-if="!showForm"
          buttonType="button" 
          variant="white" 
          :classes="classes"
          content="Change Password" 
          icon="material-symbols:edit-square-outline" 
          @click="showForm = true"
          />
      </DefineChangePasswordButton>
      <ReuseChangePasswordButton classes="d-none d-sm-flex btn-sm" />
    </div>
    <div v-if="showForm">
      <Form class="d-flex flex-column gap-4">
        <UiFormInput
          v-model="currentPassword"
          inputType="password" 
          name="currentPassword" 
          label="Old Password" 
          placeholder="Enter old password"
          :rules="{required: true}" />
        <UiFormInput
          inputType="password" 
          name="newPassword" 
          label="New Password"
          placeholder="Enter new password" 
          v-model="newPassword"
          :rules="{required: true, min: 6}"
          @input="updateConfirmationRules" />
        <UiFormInput
          inputType="password" 
          name="confirmPassword" 
          label="Confirmation Password" 
          placeholder="Confirmation password"
          v-model="confirmPassword"
          :rules="confirmationRule" 
          :key="elementKey" />
        <div class="d-flex justify-content-end gap-2">
          <UiButton buttonType="button" content="Cancel" variant="white" @click="hideForm" />
          <UiButton buttonType="button" content="Save" variant="black" />
        </div>
      </Form>
    </div>
    <ReuseChangePasswordButton v-else classes="d-flex d-sm-none w-full" />
  </div>
</template>

<style lang="scss" scoped>

</style>
