<script lang="ts" setup>
</script>
<template>
  <div>
    <header>
      <LayoutsDefaultNavbar />
    </header>
    <main>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 d-none d-lg-block">
            <LayoutsUserSidebar />
          </div>
          <div class="col-lg-9">
            <slot />
          </div>
        </div>
      </div>
    </main>
    <LayoutsDefaultFooter />
  </div>
</template>

<style lang="scss" scoped>
.container{
  margin-top: 5.5rem;
  min-height: calc(100vh - 78px);
}
</style>
