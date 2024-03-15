<script lang="ts" setup>
  import { createReusableTemplate } from '@vueuse/core'

  const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

  const user: any = useMyUserStore()

  const scrollTop = () => {
    setTimeout(() => {
      window.scrollTo(0,0)
    }, 250);
  }

  const offcanvas = ref()
  const offcanvasTogglerIcon = ref('material-symbols:menu')
  const toggleOffcanvasButtonIcon = () => {
    offcanvasTogglerIcon.value = offcanvas.value.classList.contains('showing') ? 'material-symbols:close' : 'material-symbols:menu'
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxtLink class="navbar-brand" to="/" @click.prevent="scrollTop">
        <img class="navbar-logo" src="/images/logo.svg" alt="">
      </nuxtLink>
      <div class="navbar-toggler">
        <UiButton 
          button-type="button" 
          variant="black" 
          :icon="offcanvasTogglerIcon" 
          classes="aspect-1-1" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasNavbar" 
          aria-controls="offcanvasNavbar" 
          @click="toggleOffcanvasButtonIcon" />
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <DefineTemplate>
          <ul class="navbar-nav" v-if="!user.user" ref="navbar">
            <li class="nav-items">
              <UiButton buttonType="nuxtLink" path="/register" content="Register" variant="white"/>
            </li>
            <li class="nav-items">
              <UiButton buttonType="nuxtLink" path="/login" content="Login" variant="black"/>
            </li>
          </ul>
          <ul class="navbar-nav" v-else>
            <li class="nav-items">
              <UiButton buttonType="nuxtLink" path="/user" icon="material-symbols:account-circle" :content="user.user.name" variant="black"/>
            </li>
          </ul>
        </DefineTemplate>
        <ReuseTemplate />
      </div>
    </div>
  </nav>
  <div class="offcanvas offcanvas-end" data-bs-backdrop="false" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" ref="offcanvas">
    <div class="offcanvas-body">
      <ReuseTemplate />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar{
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  padding: 10px 15px;

}
.nav-items{
  padding: 8px 0;
}

@media screen and (min-width: 992px) {
  #navbar-collapse{
    display: flex;
    justify-content: flex-end;
    padding: 8px 0;
  }

  .nav-items{
    padding: 8px;
  }
}

.offcanvas{
  padding-top: 5rem;
  z-index: 4;
}

.navbar-logo{
  height: clamp(1.8rem, 3.6vw, 3rem);
}
</style>
