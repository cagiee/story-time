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
    content: {
      type: String,
      default: '',
      required: false,
    },
  })

</script>

<template>

  <button 
    v-if="buttonType=='button' || buttonType=='submit'" 
    :type="buttonType == 'submit' ? 'submit' : 'button'" 
    :class="`btn btn-${variant} ${classes}`">
    <Icon v-if="icon" :name="icon" class="icon"/>
    {{ content }}
  </button>

  <nuxt-link 
    v-else-if="buttonType=='nuxtLink'"
    :to="path">
    <button 
      type="button" 
      :class="`btn btn-${variant} ${classes}`">
      <Icon v-if="icon" :name="icon" class="icon"/>
      {{ content }}
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

    &.rounded{
      border-radius: 50% !important;
      width: 3rem;
      height: 3rem;
      padding: 0;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cccccc;
      font-size: 1.2em;
      font-weight: normal;
    }

    .icon{
      display: flex;
      font-size: 1.25em;
      align-items: center;
    }
  }
</style>
