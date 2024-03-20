<script lang="ts" setup>
  defineOptions({
    inheritAttrs: true
  })
  const props = defineProps({
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: false
    },
    id: {
      type: String,
      default: '',
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  })

  const showPassword = ref(false)

</script>

<template v-slot>
  <input 
    :id="props.id"
    v-bind="$attrs"
    :type="type == 'password' && showPassword ? 'text' : type"
    :placeholder="placeholder"
    :disabled="disabled"
    />
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