<script setup lang="ts">
// Counter — анимированный счётчик для KPI-слайдов.
// Считает от 0 до target при появлении слайда.
//
// Использование:
//   <Counter :target="100" :duration="1500" />

import { ref, onMounted, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{
  target: number
  duration?: number
}>(), {
  duration: 1500,
})

const { $slidev } = useSlideContext()
const current = ref(0)
const started = ref(false)

function animate() {
  if (started.value)
    return
  started.value = true
  const start = performance.now()
  const step = (now: number) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / props.duration, 1)
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3)
    current.value = Math.round(eased * props.target)
    if (progress < 1)
      requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  // Запуск при первом рендере
  setTimeout(animate, 100)
})

// Перезапуск при переходе на слайд
watch(
  () => ($slidev as any)?.nav?.currentPage?.value,
  () => {
    started.value = false
    current.value = 0
    setTimeout(animate, 200)
  },
)
</script>

<template>
  <span class="counter">{{ current }}</span>
</template>
