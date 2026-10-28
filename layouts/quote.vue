<script setup lang="ts">
// Центрированная цитата крупным шрифтом.
//
// Пример:
//   ---
//   layout: quote
//   author: 'Линус Торвальдс'
//   ---
//   Talk is cheap. Show me the code.

import SlideNumber from '../components/SlideNumber.vue'

defineProps<{
  author?: string
}>()
</script>

<template>
  <div class="slidev-layout quote h-full">
    <div class="my-auto">
      <blockquote class="quote-text">
        <slot />
      </blockquote>
      <p v-if="author" class="quote-author">
        — {{ author }}
      </p>
    </div>
    <SlideNumber />
  </div>
</template>
