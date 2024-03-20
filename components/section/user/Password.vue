<script lang="ts" setup>
  import { createReusableTemplate } from '@vueuse/core'

  const { $api } = useNuxtApp()
  const { $toast } = useNuxtApp()

  const showForm = ref(false)
 
  const formSchema = {
    fields: [
      {
        label: 'Old Password',
        name: 'oldPassword',
        type: 'password',
        placeholder: 'Enter your old password',
        rules: 'required|min:6',
      },
      {
        label: 'New Password',
        name: 'newPassword',
        type: 'password',
        placeholder: 'Enter your new password',
        rules: 'required|min:6',
      },
      {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Enter your confirm password',
        rules: 'required|confirmed:@password',
      },
    ]
  }

  // # Password Confirmation
  const elementKey = ref(0)
  const confirmationRule = ref({
    required: true,
    mustMatchWith: ''
  })

  const hideForm = () => {
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
        <UiFormDynamicForm :schema="formSchema" />
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
