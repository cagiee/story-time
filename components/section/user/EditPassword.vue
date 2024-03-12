<script lang="ts" setup>
  const { $api } = useNuxtApp()

  const toasts: Ref<IToast[]> = ref([])

  const showForm = ref(false)
  const currentPassword = ref()
  const newPassword = ref()
  const confirmPassword = ref()

  // # Password Confirmation
  const elementKey = ref(0);
  const confirmationRule = ref({
    required: true,
    mustMatchWith: ''
  });
  const updateConfirmationRules = () => {
    confirmationRule.value.mustMatchWith = newPassword.value;
    elementKey.value++
  };

  const hideForm = () => {
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    showForm.value = false
  }
  // # END Password Confirmation
</script>

<template>
  <div class="border-0 p-4 shadow-sm">
    <div class="header">
      <h1 class="title">Password</h1>
      <UiButtonVariant 
        v-if="!showForm"
        buttonType="button" 
        variant="white" 
        content="Edit Password" 
        icon="material-symbols:edit-square-outline" 
        @click="showForm = true"
        />
    </div>
    <div v-if="showForm">
      <Form class="d-flex flex-column gap-4">
        <UiInputVariant
          v-model="currentPassword"
          inputType="password" 
          name="currentPassword" 
          label="Old Password" 
          placeholder="Enter old password"
          :rules="{required: true}" />
        <UiInputVariant
          inputType="password" 
          name="newPassword" 
          label="New Password"
          placeholder="Enter new password" 
          v-model="newPassword"
          :rules="{required: true, min: 6}"
          @input="updateConfirmationRules" />
        <UiInputVariant
          inputType="password" 
          name="confirmPassword" 
          label="Confirmation Password" 
          placeholder="Confirmation password"
          v-model="confirmPassword"
          :rules="confirmationRule" 
          :key="elementKey" />
        <div class="d-flex justify-content-end gap-2">
          <UiButtonVariant buttonType="button" content="Cancel" variant="white" @click="hideForm" />
          <UiButtonVariant buttonType="button" content="Save" variant="black" />
        </div>
      </Form>
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
