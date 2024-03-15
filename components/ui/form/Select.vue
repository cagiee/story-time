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
  const modelValue = defineModel()

  // # Define the rules of this input
  const rules = ref()
  if (props.rules)
    rules.value = getRules('select', props.label, props.rules)  
  // # END Define the rules of this input  
</script>

<template lang="">
  <div class="form-group">

    <!-- Show label if label prop is exist -->
    <label v-if="label" class="mb-2" :for="props.name">{{ label }}</label>

    <div class="input-wrapper">
      <ClientOnly>
        <Field
          :name="props.name"
          v-slot="{field}"
          v-model="modelValue"
          >
          <select name="" v-bind="field" :class='`${classes}`' :rules="rules" id="">
            <option value="" disabled>{{ placeholder }}</option>
            <option v-for="option in options" :key="option" :value="option.value">{{ option.text }}</option>
          </select>
        </Field>
      </ClientOnly>
    </div>

    <!-- Used for show the vee-valudate error message if exist -->
    <ErrorMessage :name="props.name" class="error-message" />
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