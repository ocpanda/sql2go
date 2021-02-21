import { ref, computed } from 'vue'

const loadStatus = ref(false)
const isLoading = computed(() => loadStatus.value)

const load = () => {
  return loadStatus.value = true
}

const unLoad = () => {
  return loadStatus.value = false
}

export function useLoading () {
  return {
    isLoading,
    load,
    unLoad,
  }
}