<script lang="ts" setup>
  const { $api } = useNuxtApp()

  const { data } = await $api.user.getProfile()
  const { setUser } = useMyUserStore()
  const user = ref(data.value?.data)
  const isLoading = ref(true)

  const showForm = defineModel({ default: false })
  
  const $toast = useToast()

  const name = ref(user.value?.name)
  const email = ref(user.value?.email)
  const biodata = ref(user.value?.biodata)

  const handleUpdateProfile = async () => {
    isLoading.value = true
    const formData = new FormData()
    formData.append('name', name.value as string)
    formData.append('biodata', biodata.value as string)

    const { error } = await $api.user.updateProfile(formData)

    if(error.value){
      const { error: {message} }: any = error.value.data

      $toast.error(message)
    } else {
      const { data: updatedUserData } = await $api.user.getProfile()
      setUser(updatedUserData.value?.data)
      user.value = updatedUserData.value?.data

      $toast.success('Successfully update profile')
    }

    hideForm()
    isLoading.value = false
  }

  const hideForm = () => {
    name.value = user.value?.name
    email.value = user.value?.email
    biodata.value = user.value?.biodata
    showForm.value = false
  }

  isLoading.value = false
</script>

<template>
  <div>
    <table v-if="!showForm" class="profile-info-table table table-borderless">
      <tr>
        <th>Nama</th>
        <td>{{ user?.name }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{ user?.email }}</td>
      </tr>
      <tr>
        <th>Biodata</th>
        <td>{{ user?.biodata || '-'}}</td>
      </tr>
    </table>
    <div v-else>
      <Form class="d-flex flex-column gap-3" @submit="handleUpdateProfile">
        <UiFormInput
          inputType="text"
          v-model="name"
          name="name"
          placeholder="Enter your name" 
          label="Name" 
          :rules="{required: true}" />
        <UiFormInput 
          inputType="email" 
          v-model="email"
          name="Email" 
          placeholder="Enter your email"
          label="Email" 
          :disabled="true" 
          />
        <UiFormTextarea 
          v-model="biodata"
          name="aboutMe" 
          placeholder="Enter about me"
          label="About me" 
          />
        <div class="d-flex justify-content-end gap-2">
          <UiButton buttonType="button" content="Cancel" variant="white" @click="hideForm" />
          <UiButton buttonType="submit" content="Save" variant="black" :isLoading="isLoading" />
        </div>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile-info-table{
    th{
      width: 20%;
      font-weight: 500;
    }
    th, td{
      padding-right: 8px;
      padding-bottom: 20px;
    }
  }
</style>
