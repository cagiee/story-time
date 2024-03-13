
<script lang="ts" setup>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  const props = defineProps({
    modelValue: String,
    label: String,
  })

  const quill = ref()

  // # Value setting for emit to parent element
  // const emit = defineEmits(['update:modelValue']);
  // const updateValue = () => {
  //   emit('update:modelValue', {text: quill.value.getText(), html: quill.value.getHTML()});
  // };
  // # End setting for emit to parent element

  const modelValue = defineModel('modelValue')
  
  const initQuill = () => {
    modelValue.value ? quill.value.setHTML(modelValue.value) : ''
  }
</script>

<template>
  <div class="">
    <label v-if="label" class="mb-2" for="quill">{{ label }}</label>
    <div class="">
      <client-only fallback="Loading editor...">
        <QuillEditor ref="quill" theme="snow" id="quill" v-model:content="modelValue" content-type="html" @ready="initQuill" placeholder="insert text here..."/>
      </client-only>
    </div>
  </div>
</template>
