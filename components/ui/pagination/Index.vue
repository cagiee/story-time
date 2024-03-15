<script lang="ts" setup>
  const props = defineProps({
    pagination: {
      type: Object,
      default: {
        pageCount: 1,
      }
    }
  })
  const pagination = ref(props.pagination)
  const route = useRoute()

  const currentPage = computed(() => {
    return parseInt(route.query.page as string || '1')
  }) 

  const prev = computed(() => {
    return currentPage.value > 1 ? currentPage.value - 1 : 1
  })
  const next = computed(() => {
    return currentPage.value < pagination.value.pageCount ? currentPage.value + 1 : pagination.value.pageCount
  })

  if (currentPage.value < 1 || currentPage.value > pagination.value.pageCount)
    navigateTo({ query: { page: 1 } })

  const emit = defineEmits(['paginate'])
  const paginate = async (page: any) => {
    await navigateTo({ query: { page } })
    window.scrollTo(0, 0)
    emit('paginate')
  }
</script>

<template>
  <nav aria-label="Page navigation example" v-if="pagination.pageCount > 1">
    <ul class="pagination mt-4">
      <li class="page-item" :class="currentPage == 1 ? 'disabled' : ''">
        <span @click="paginate(prev)" class="page-link" aria-label="Previous">
          &laquo;
        </span>
      </li>
      <li class="page-item" @click="paginate(i)" v-for="i in pagination.pageCount" :class="i == currentPage ? 'active' : ''">
        <span class="page-link">{{ i }}</span>
      </li>
      <li class="page-item" :class="pagination.pageCount == currentPage ? 'disabled' : ''">
        <span @click="paginate(next)" class="page-link" aria-label="Next">
          &raquo;
        </span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .page-link{
    cursor: pointer;
  }
</style>
