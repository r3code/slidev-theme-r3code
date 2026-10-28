<script setup lang="ts">
// SlideNumber — номер слайда в правом верхнем углу.
// Автоматически скрыт на первом (cover) и последнем (end) слайдах.

import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

const current = ref(0)
const total = ref(0)

function read() {
  try {
    const nav = ($slidev as any)?.nav
    if (nav) {
      const c = (nav as any).currentPage
      const t = (nav as any).total
      current.value = c?.value ?? (typeof c === 'function' ? c() : c) ?? 0
      total.value = t?.value ?? (typeof t === 'function' ? t() : t) ?? 0
    }
  }
  catch {
    // ignore
  }
}

const show = computed(() => current.value > 1 && current.value < total.value)

let pollInterval: any = null

onMounted(() => {
  read()
  pollInterval = setInterval(read, 200)
})

onUnmounted(() => {
  if (pollInterval)
    clearInterval(pollInterval)
})
</script>

<template>
  <div v-if="show" class="slide-number">
    {{ current }}
  </div>
</template>
