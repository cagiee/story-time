<script lang="ts" setup>
  import * as yup from 'yup';

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

  // # Value setting for emit to parent element
  // const emit = defineEmits(['update:modelValue']);
  
  // const value = ref(modelValue.value);
  // const updateValue = (event: any) => {
  //   value.value = event.target.value
  //   emit('update:modelValue', value.value)
  // };
  // # End setting for emit to parent element

  // # Define the rules of this input
  let currentRules = null
  if (props.rules) {
    let tempRules = null

    if (props.inputType == 'number') {
      tempRules = yup.number()
    } else if (props.inputType == 'email' && props.rules.isEmail){
      tempRules = yup.string().email(`The ${props.label} field must be a valid email`)
    } else {
      tempRules = yup.string()
      if (props.rules.mustMatchWith) {
        tempRules = tempRules.oneOf([props.rules.mustMatchWith, null], `The ${props.label} field does not match`)
      }
    }

    if (props.rules.required)
      tempRules = tempRules.required(`${props.label} is a required field`)
    if (props.rules.min)
      tempRules = tempRules.min(props.rules.min, `${props.label} must be at least ${props.rules.min} characters`)

    currentRules = tempRules
  }
  const rules = props.rules ? currentRules : null
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
          v-if="inputType == 'textarea'"
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

        <!-- Show the combobox input if inputType is `select` -->
        <Field
          v-else-if="inputType == 'select'"
          :name="props.name"
          v-slot="{field}"
          v-model="modelValue"
          >
          <!-- @change="updateValue" -->
          <select name="" v-bind="field" :class='`form-select ${classes}`' :rules="rules" id="">
            <option value="" disabled>{{ placeholder }}</option>
            <option v-for="option in options" :key="option" :value="option.value">{{ option.text }}</option>
          </select>
        </Field>
        
        <!-- Show the input form if inputType is not `textarea` and not `select` -->
        <Field 
          v-else
          :id="props.name"
          :name="props.name"
          v-model="modelValue"
          :type="inputType == 'password' && showPassword ? 'text' : inputType"
          :class="`${classes}`" 
          :placeholder="placeholder"
          :rules="rules"
          :disabled="disabled"
          />
          <!-- @input="updateValue" -->

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
.error-message{
  color: red;
  font-weight: 400;
  font-size: .9em;
  margin-top: .25rem;
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
  textarea{
    min-height: 100px;
  }
  .form-select{
    height: 42px;
    border-radius: 0;

    &:focus{
      border: 1px solid #000000;
      box-shadow: none;
    }
  }
</style>