<script lang="ts" setup>
  const { $api } = useNuxtApp()

  const { data } = await $api.user.getProfile()
  const { setUser } = useMyUserStore()
  const user = ref(data.value?.data)
  const isLoading = ref(true)

  const showForm = defineModel({ default: false })
  
  const $toast = useToast()

  const formSchema = {
    fields: [
      {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        rules: 'required',
      },
      {
        label: 'Email',
        name: 'email',
        placeholder: 'Enter your email',
        disabled: true,
      },
      {
        label: 'About Me',
        name: 'biodata',
        placeholder: 'Enter about me',
        type: 'textarea',
      },
    ]
  }

  const initialValues = {
    name: user.value?.name,
    email: user.value?.email,
    biodata: user.value?.biodata
  }
  
  const { handleSubmit } = useForm()

  const handleUpdateProfile = async (formData: any) => {
    isLoading.value = true

    const { error } = await $api.user.updateProfile({
      name: formData.name,
      email: formData.email,
      biodata: formData.biodata,
    })

    if(error.value){
      const { error: {message} }: any = error.value.data

      $toast.error(message)
    } else {
      const { data: updatedUserData } = await $api.user.getProfile()
      setUser(updatedUserData.value?.data)
      user.value = updatedUserData.value?.data
      initialValues.name = updatedUserData.value?.data.name
      initialValues.email = updatedUserData.value?.data.email
      initialValues.biodata = updatedUserData.value?.data.biodata

      $toast.success('Successfully update profile')
    }

    hideForm()
    isLoading.value = false
  }

  const hideForm = () => {
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
      <Form class="profile-form" :initialValues="initialValues" @submit="handleUpdateProfile">
        <UiFormDynamicForm :schema="formSchema" :isLoading="isLoading" />
        <div class="row">
          <div class="col-6">
            <UiButton buttonType="button" classes="col-12" content="Cancel" variant="white" :disabled="isLoading" @click="showForm = false"/>
          </div>
          <div class="col-6">
            <UiButton buttonType="submit" classes="col-12" content="Save Change" variant="black" :isLoading="isLoading"/>
          </div>
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
  .profile-form{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
