<script lang="ts" setup>
  const props = defineProps({
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: '',
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    classes: {
      type: String,
      default: 'form-select',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    rules: {
      type: Object,
      required: false
    },
    options: {
      type: Array as any,
      required: false,
    },
    selectedOption: {
      type: String,
      required: false,
    },
  })
  
  const modelValue = defineModel('modelValue')
</script>

<template lang="">
  <ClientOnly >
    <select name="" v-bind="$attrs" :class='`${classes}`' id="" v-model="modelValue">
      <option value="" selected disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option.value">{{ option.text }}</option>
    </select>
  </ClientOnly>
</template>

<style lang="scss" scoped>
  .form-select{
    height: 42px;
    border-radius: 0;

    &:focus{
      border: 1px solid #000000;
      box-shadow: none;
    }
  }
</style>