<script lang="ts" setup>
  const props = defineProps({
    toasts: {
      type: Object as PropType<IToast[]>
    }
  })

  const { $bToast } = useNuxtApp()

  onUpdated(() => {
    $bToast.show(`toast-${props.toasts?.length}`)
  })
</script>

<template>
  
  <div class="toast-container position-fixed top-0 end-0">
    <div v-for="(toast, i) in toasts" :id="`toast-${i + 1}`" :class="`toast m-2 toast-${toast.variant}`" role="alert"> 
      <div :class="`toast-header`"> 
        {{ toast.title }}
      </div> 
      <div :class="`toast-body`"> 
        <p class=""> 
          {{ toast.body }}
        </p>
      </div> 
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .toast-danger{
    .toast-header{
      background-color: #ffdbdb;
      color: #851c1c;
      font-weight: 700;
    }
    .toast-body{
      background-color: #fff1f1;
      color: #851c1c;
    }
  }
  .toast-success{
    .toast-header{
      background-color: #d6efdd;
      color: #155724;
      font-weight: 700;
    }
    .toast-body{
      background-color: #e6f5e9;
      color: #155724;
    }
  }
</style>
