<script lang="ts" setup>
  import getRules from "~/utils/getRules"

  const props = defineProps({
    inputType: {
      type: String,
      default: 'text'
    },
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
    options: {
      type: Array as any,
      required: false,
    },
    selectedOption: {
      type: String,
      required: false,
    },
    // modelValue: String,
  })
  const modelValue = defineModel()

  const showPassword = ref(false)

  // # Define the rules of this input
  const rules = ref()
  if (props.rules)
    rules.value = getRules(props.inputType, props.label, props.rules)  
  // # END Define the rules of this input  

</script>

<template>
  <div>
    <div class="form-group">

      <!-- Show label if label prop is exist -->
      <label v-if="label" class="mb-2" :for="props.name">{{ label }}</label>
      
      <div class="input-wrapper">

        <Field 
          :id="props.name"
          :name="props.name"
          v-model="modelValue"
          :type="inputType == 'password' && showPassword ? 'text' : inputType"
          :class="`${classes}`" 
          :placeholder="placeholder"
          :rules="rules"
          :disabled="disabled"
          />
          
        <!-- Show the reveal password icon if inputType is `password` -->
        <Icon v-if="inputType == 'password'" class="show-password-toggler" :name="showPassword ? 'material-symbols:visibility-off-rounded' : 'material-symbols:visibility-rounded'" @click="showPassword = !showPassword"/>
      </div>

      <!-- Used for show the vee-valudate error message if exist -->
      <ErrorMessage :name="props.name" class="error-message" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .input-wrapper{
    position: relative;
  }
  .show-password-toggler{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .25rem;
    font-size: 1em;
    padding: .75rem;
    width: 42px;
    height: 42px;
    cursor: pointer;
  }
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
</style>