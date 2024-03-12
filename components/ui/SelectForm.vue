<script lang="ts" setup>
  const props = defineProps({
    modelValue: String,
    placeholder: {
      type: String,
      required: false
    },
    label: {
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
    },
  })

  // # Value setting for emit to parent element
  const emit = defineEmits(['update:modelValue']);
  const value = ref(props.modelValue)
  const updateValue = (event: any) => {
    value.value = event.target.value;
    emit('update:modelValue', value.value);
  }
  // # End setting for emit to parent element

</script>
<template lang="">
  <div class="form-group">
    <label v-if="label" class="mb-2">{{ label }}</label>
    <div class="select-wrapper">
      <select class="form-select" @change="updateValue">
        <option value="" selected disabled>{{ placeholder || '' }}</option>
        <option v-for="(option, i) in options" :key="i" :value="option.value">{{ option.text }}</option>
      </select>
    </div>
  </div>
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