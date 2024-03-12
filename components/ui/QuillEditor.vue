
<script lang="ts" setup>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  const props = defineProps({
    modelValue: String,
    label: String,
  })

  const quill = ref()

  // # Value setting for emit to parent element
  const emit = defineEmits(['update:modelValue']);
  const value = ref(props.modelValue);
  const updateValue = () => {
    emit('update:modelValue', quill.value.getHTML());
  };
  // # End setting for emit to parent element
</script>

<template>
  <div class="">
    <label v-if="label" class="mb-2" for="quill">{{ label }}</label>
    <client-only fallback="Loading editor...">
      <QuillEditor ref="quill" theme="snow" id="quill" @text-change="updateValue" :content="value" placeholder="insert text here..."/>
    </client-only>
  </div>
</template>
