<script lang="ts" setup>
  const props = defineProps({
    buttonType: {
      type: String,
    },
    variant: {
      type: String,
    },
    classes: {
      type: String,
      default: '',
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    iconRight: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      default: '',
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false,
    },
  })

</script>

<template>

  <button 
    v-if="buttonType=='button' || buttonType=='submit'" 
    :type="buttonType == 'submit' ? 'submit' : 'button'" 
    :disabled="isLoading"
    :class="`btn btn-${variant} ${classes}`">
    <Icon v-if="icon && !isLoading" :name="icon" class="icon"/>
    <div v-else-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span class="w-full" v-if="content">
      {{ content }}
    </span>
    <Icon v-if="iconRight" :name="iconRight" class="icon"/>
  </button>

  <nuxt-link 
    v-else-if="buttonType=='nuxtLink'"
    :to="path">
    <button 
      type="button" 
      :disabled="isLoading"
      :class="`btn btn-${variant} ${classes}`">
      <Icon v-if="icon && !isLoading" :name="icon" class="icon"/>
      <div v-else-if="isLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="w-full" v-if="content">
        {{ content }}
      </span>
      <Icon v-if="iconRight" :name="iconRight" class="icon"/>
    </button>
  </nuxt-link>
</template>

<style lang="scss" scoped>
  .btn{
    border-radius: 0;
    padding: 0 1.5rem;
    height: 42px;
    font-weight: 600;
    font-size: 1.1em;
    display: flex;
    justify-content: center;
    align-items: center;

    &.btn-black{
      background-color: #343434;
      border: 1px solid #343434;
      color: #ffffff;

      &:hover{
        background-color: #000000;
        color: #ffffff;
      }
    }

    &.btn-white{
      background-color: #ffffff;
      color: #343434;
      border: 1px solid #343434;
    }

    &.wishlist, &.wishlist-detail{
      border-radius: 50% !important;
      width: 3rem;
      height: 3rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cccccc;
      font-size: 1.2em;
      font-weight: 400;
      position: absolute;
      top: .25rem;
      right: .25rem;
      transition: .3s;
    }

    &.wishlist-detail{
      font-size: 1.5em;
      width: 3.6rem;
      height: 3.6rem;
      top: .5rem;
      right: .5rem;
    }

    &.btn-sm{
      padding: 0 1rem;
      height: 36px;
      font-size: .9em;
    }

    .icon{
      display: flex;
      font-size: 1.25em;
      align-items: center;
      margin: 0 .25rem;
    }

    .spinner-border{
      width: 18px;
      height: 18px;
      margin-right: .75rem;
    }

    &.sidebar-button {
      width: 100%;
      border: 0;
      border-bottom: 1px solid #eeeeee;
      padding: 10px;
      height: 48px;
      font-size: 16px;
      font-weight: 400;
      justify-content: start;
      text-align: left;
      gap: .5rem;
      color: #8f8f8f;

      &:hover{
        color: #0e0e0e;
        background-color: #eee;
      }
    }
    &.sidebar-logout-button{
      width: 100%;
      padding: 10px;
      height: 48px;
      font-size: 16px;
      font-weight: 400;
      justify-content: start;
      text-align: left;
      gap: .5rem;

      &:hover{
        color: #ffffff !important;
        background-color: red;
      }
    }

    &.rounded-full{
      border-radius: 50%;
      padding: 0;
      aspect-ratio: 1 / 1;
    }
  }
</style>
