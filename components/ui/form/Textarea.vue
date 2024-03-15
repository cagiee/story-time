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
  <div>
    
    <div class="form-group">

      <!-- Show label if label prop is exist -->
      <label v-if="label" class="mb-2" :for="props.name">{{ label }}</label>

      <div class="input-wrapper">
        <!-- Show the textarea input if inputType is `textarea` -->
        <Field 
          :name="props.name"
          v-slot="{field}"
          :rules="rules"
          >
          <textarea 
            :id="props.name"
            v-bind="field" 
            :class="classes" 
            :name="props.name" 
            :placeholder="placeholder"
            :disabled="disabled"
            v-model="modelValue"
            >
            <!-- @input="updateValue" -->
          </textarea>
        </Field>    
      </div>
    </div>
  </div>
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
