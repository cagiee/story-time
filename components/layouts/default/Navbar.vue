<script lang="ts" setup>
  import ButtonVariant from '~/components/ui/ButtonVariant.vue'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxtLink class="navbar-brand" to="/">
        <img src="/images/logo.svg" alt="">
      </nuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-items">
            <ButtonVariant buttonType="nuxtLink" path="/register" content="Register" variant="white"/>
          </li>
          <li class="nav-items">
            <ButtonVariant buttonType="nuxtLink" path="/" content="Login" variant="black"/>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
</style>
