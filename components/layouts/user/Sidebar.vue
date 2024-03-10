<script lang="ts" setup>
  const { $bModal } = useNuxtApp()

  const showLogoutModal = () => $bModal.show('logoutModal')

  const handleLogout = async () => {
    const token = useCookie('token')
    token.value = ''

    document.location = '/'
  }
</script>
<template>
  <div class="sidebar shadow-sm">
    <UiButtonVariant buttonType="nuxtLink" path="/user" content="My Profile" variant="white" classes="sidebar-button" icon="material-symbols:account-circle-full" />
    <UiButtonVariant buttonType="nuxtLink" path="/user" content="Story List" variant="white" classes="sidebar-button" icon="material-symbols:list-alt-outline" />
    <UiButtonVariant buttonType="nuxtLink" path="/user" content="Bookmark" variant="white" classes="sidebar-button" icon="material-symbols:bookmark-outline" />
    <div class="p-3">
      <!-- <UiButtonVariant buttonType="button" content="Logout" variant="white" classes="sidebar-logout-button text-danger border-danger" iconRight="material-symbols:exit-to-app" /> -->
      <UiButtonVariant buttonType="button" content="Logout" variant="white" classes="sidebar-logout-button text-danger border-danger" iconRight="material-symbols:exit-to-app" @click="showLogoutModal"/>
    </div>
  </div>
  <UiModal id="logoutModal" title="Logout" confirm-button-text="Logout" @confirm-button-click="handleLogout">
    Are you sure want to logout?
  </UiModal>
</template>
