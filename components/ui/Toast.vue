<script lang="ts" setup>
  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    variant: String,
    title: String,
    body: String,
  })

  const { $bToast } = useNuxtApp()

  onMounted(() => {
    $bToast.show(props.id)
  })
</script>

<template>
  <div :id="id" :class="`toast m-2 text-${props.variant} bg-${props.variant}`" role="alert"> 
    <div class="toast-header"> 
      {{ props.title }}
    </div> 
    <div class="toast-body"> 
      <p class=""> 
        {{ props.body }}
      </p>
    </div> 
  </div>
</template>

<style>

</style>
