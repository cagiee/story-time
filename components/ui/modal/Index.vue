<script lang="ts" setup>
  defineProps({
    id: String,
    title: String,
    classes: {
      type: String,
      default: '',
      required: false,
    },
    confirmButtonText: {
      type: String,
      default: 'Save Change',
      required: false
    },
    cancelButtonText: {
      type: String,
      default: 'Close',
      required: false
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    }
  })
</script>
<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div :class="`modal-dialog ${classes}`">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <UiButton button-type="button" variant="white" :content="cancelButtonText" data-bs-dismiss="modal" />
          <UiButton button-type="button" variant="black" :content="confirmButtonText" @click="$emit('confirmButtonClick')" :is-loading="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>
