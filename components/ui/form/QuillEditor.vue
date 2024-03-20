<script lang="ts" setup>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  
  defineOptions({
    inheritAttrs: true
  })
  
  const quill = ref()
  const modelValue = defineModel('modelValue')

  const initQuill = (value: any) => quill.value.setHTML(value)
</script>

<template>
  <client-only fallback="Loading editor...">
    <QuillEditor ref="quill" v-bind="$attrs" theme="snow" v-model:content="modelValue" id="quill" content-type="html" @ready="initQuill($attrs.value)" placeholder="insert text here..."/>
  </client-only>
</template>
