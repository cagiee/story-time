<script lang="ts" setup>
  const { $bModal } = useNuxtApp()
  const { setUser } = useMyUserStore()

  const showLogoutModal = () => $bModal.show('logoutModal')

  const handleLogout = () => {
    const token = useCookie('token')
    token.value = ''
    $bModal.hide('logoutModal')
    localStorage.setItem('bookmark', '[]')
    setUser(null)
    navigateTo('/')
  }
</script>
<template>
  <div class="sidebar shadow-sm mb-4">
    <div class="" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <UiButton buttonType="nuxtLink" path="/user" content="My Profile" variant="white" classes="sidebar-button" icon="material-symbols:account-circle-full" @click="$emit('toggleOffcanvasButtonIcon')" />
    </div>
    <div class="" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <UiButton buttonType="nuxtLink" path="/user/story" content="Story List" variant="white" classes="sidebar-button" icon="material-symbols:list-alt-outline" @click="$emit('toggleOffcanvasButtonIcon')" />
    </div>
    <div class="" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <UiButton buttonType="nuxtLink" path="/user/bookmark" content="Bookmark" variant="white" classes="sidebar-button" icon="material-symbols:bookmark-outline" @click="$emit('toggleOffcanvasButtonIcon')" />
    </div>
    <div class="p-3">
      <UiButton buttonType="button" content="Logout" variant="white" classes="sidebar-logout-button text-danger border-danger" iconRight="material-symbols:exit-to-app" @click="showLogoutModal"/>
    </div>
  </div>
  <Teleport to="body">
    <UiModal id="logoutModal" title="Logout" confirm-button-text="Logout" @confirm-button-click="handleLogout">
      Are you sure want to logout?
    </UiModal>
  </Teleport>
</template>
