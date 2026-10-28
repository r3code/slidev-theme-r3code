<script setup lang="ts">
// Крупная KPI-цифра по центру слайда.
//
// Пример:
//   ---
//   layout: stat
//   ---
//   <div class="big-number">100</div>
//   сервисов в продакшене
//
// Или через frontmatter:
//   ---
//   layout: stat
//   number: '100'
//   label: 'сервисов в продакшене'
//   ---

import SlideNumber from '../components/SlideNumber.vue'

defineProps<{
  number?: string | number
  label?: string
}>()
</script>

<template>
  <div class="slidev-layout stat h-full">
    <div class="my-auto">
      <div v-if="number" class="big-number">
        {{ number }}
      </div>
      <div v-if="label" class="text-2xl mt-4">
        {{ label }}
      </div>
      <slot />
    </div>
    <SlideNumber />
  </div>
</template>
