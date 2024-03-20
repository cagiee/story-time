<script lang="ts" setup>
  const isLoading = defineModel({ default: false })
  defineProps({
    schema: {
      type: Object,
      required: true
    },
  })

  const showPassword = ref(false)
  
</script>

<template>
    <div class="" v-for="{ type, name, label, options, rules, placeholder, disabled } in schema.fields">
      <label :for="name" class="form-label">{{ label }}</label>
      <Field :id="name" :name="name" :label="label" :rules="rules" v-slot="{ handleChange, handleBlur, field, errors }">
        <div class="input-wrapper">
          <UiFormTextarea 
            v-if="type == 'textarea'"
            :id="name"
            v-bind="field"
            class="form-control"
            :class="{ 'is-invalid': errors.length > 0 }"
            :placeholder="placeholder"
            :disabled="disabled"
            />

          <UiFormSelect 
            v-else-if="type == 'select'"
            :id="name"
            v-bind="field"
            class="form-control"
            :class="{ 'is-invalid': errors.length > 0 }"
            :placeholder="placeholder"
            :disabled="disabled"
            :options="options"
            />

          <UiFormQuillEditor 
            v-else-if="type == 'quill'"
            :id="name"
            v-bind="field"
            class="ql-container ql-snow"
            :placeholder="placeholder"
            :disabled="disabled"
            />

          <SectionUserStoryCoverImage 
            v-else-if="type == 'coverImage'"
            :id="name"
            @change="handleChange"
            @blur="handleBlur"
            :coverImage="field.value"
            :class="{ 'is-invalid': errors.length > 0 }"
            :placeholder="placeholder"
            :disabled="disabled"
            />

          <template v-else>
            <UiFormInput
              :id="name"
              :type="type == 'password' && showPassword ? 'text' : type"
              v-bind="field"
              class="form-control"
              :class="{ 'is-invalid': errors.length > 0 }"
              :placeholder="placeholder"
              :disabled="disabled"
              />
            <Icon v-if="type == 'password'" class="show-password-toggler" :name="showPassword ? 'material-symbols:visibility-off-rounded' : 'material-symbols:visibility-rounded'" @click="showPassword = !showPassword"/>
          </template>
        </div>
        <div v-if="errors.length > 0" class="error-message">
          {{ errors[0] }}
        </div>
      </Field>
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
  .is-invalid + .show-password-toggler{
    right: 1.5rem;
  }
</style>
