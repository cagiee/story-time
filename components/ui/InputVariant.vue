<script lang="ts" setup>
  import * as yup from 'yup';
  const emailRule = yup.string().email();
  const requiredRule = yup.string().required();

  const ruleA = yup.string().email()
  const ruleB = ruleA.required()

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
    isRequired: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: String,
  })

  const emit = defineEmits(['update:modelValue']);
  const value = ref(props.modelValue);

  const updateValue = (event: any) => {
    value.value = event.target.value;
    emit('update:modelValue', value.value);
  };
  const showPassword = ref(false)
  const rules = emailRule
  
  // if(props.inputType == 'email')
  //   rules.
</script>

<template>
  <div>
    <div class="form-group">
      <label v-if="label" class="mb-2" :for="props.name">{{ label }}</label>
      <div class="input-wrapper">
        <Field 
          :id="props.name"
          :name="props.name"
          :type="inputType == 'password' && showPassword ? 'text' : inputType"
          :class="classes" 
          :placeholder="placeholder"
          :value="value"
          :rules="ruleB"
          @input="updateValue"
          />
        <Icon v-if="inputType == 'password'" class="show-password-toggler" :name="showPassword ? 'material-symbols:visibility-off-rounded' : 'material-symbols:visibility-rounded'" @click="showPassword = !showPassword"/>
      </div>
      <ErrorMessage :name="props.name" class="error-message"/>
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
