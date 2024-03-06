<script lang="ts" setup>
  const props = defineProps({
    modelValue: String,
    placeholder: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      default: [{
        text: '',
        value: ''
      }]
    },
    selected: {
      type: String,
      required: false
    }
  })

  const emit = defineEmits(['update:modelValue']);
  const value = ref(props.modelValue)

  const updateValue = (event: any) => {
    value.value = event.target.value;
    emit('update:modelValue', value.value);
  }
</script>
<template lang="">
  <select class="form-select" @change="updateValue">
    <option value="" selected>{{ placeholder || '' }}</option>
    <option v-for="(option, i) in options" :key="i" :value="option.value">{{ option.text }}</option>
  </select>
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