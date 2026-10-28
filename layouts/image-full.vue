<script setup lang="ts">
// Картинка на весь слайд с заголовком поверх.
//
// Frontmatter:
//   image: '/images/photo.jpg'  — фоновое изображение
//   dim: true                   — затемнить картинку для читаемости текста

import { handleBackground } from '../layoutHelper'
import SlideNumber from '../components/SlideNumber.vue'

const props = defineProps<{
  image?: string
  dim?: boolean
}>()

const bgStyle = props.image ? handleBackground(props.image, props.dim) : {}
</script>

<template>
  <div class="slidev-layout image-full h-full" :style="bgStyle">
    <div class="image-full-content">
      <slot />
    </div>
    <SlideNumber />
  </div>
</template>
