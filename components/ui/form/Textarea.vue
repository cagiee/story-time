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
      default: 'form-control',
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
  })
  const modelValue = defineModel()

  // # Define the rules of this input
  const rules = ref()
  if (props.rules)
    rules.value = getRules('textarea', props.label, props.rules)  
  // # END Define the rules of this input   
</script>

<template>
  <textarea 
    :id="props.name"
    v-bind="$attrs" 
    :class="classes" 
    :name="props.name" 
    :placeholder="placeholder"
    :disabled="disabled"
    v-model="modelValue"
    >
  </textarea>
</template>

<style lang="scss" scoped>
  .form-control{
    height: 42px;
    border-radius: 0;

    &:focus{
      border: 1px solid #000000;
      box-shadow: none;
    }
  }
  .form-group{
    position: relative;
  }
  textarea{
    min-height: 100px;
  }
</style>
