<script setup lang="ts">
// Обложка доклада.
// Frontmatter-опции:
//   coverImage: '/images/bg.jpg'    — фоновое изображение справа
//   logo: true                      — показать логотип r3code в углу
//   logoSrc: '/images/custom.png'   — свой логотип (overrides default)
//   version: '20261028 rev. abc123' — строка версии в нижнем правом углу
//
// Логотип по умолчанию: /r3code-logo.png (квадратный, с белым фоном,
// одинаково читается в светлой и тёмной теме).

const props = defineProps<{
  coverImage?: string
  logo?: boolean | string
  version?: string
}>()

function logoUrl(): string | null {
  if (props.logo === false) return null
  if (typeof props.logo === 'string') return props.logo
  if (props.logo === true) return '/r3code-logo.png'
  return null
}
</script>

<template>
  <div class="slidev-layout cover relative">
    <!-- Фоновое изображение справа (половина слайда) -->
    <div v-if="coverImage" class="absolute right-0 top-0 bottom-0 w-1/2 h-full">
      <img :src="coverImage" class="w-full h-full object-cover" alt="Фон презентации">
    </div>

    <!-- Логотип в правом верхнем углу (один файл для обеих тем) -->
    <div
      v-if="logoUrl()"
      class="absolute z-20"
      style="top: 30px; right: 30px; height: 50px; width: 50px;"
    >
      <img
        :src="logoUrl()"
        style="height: 50px !important; width: 50px !important; object-fit: contain; display: block;"
        alt="Логотип"
      >
    </div>

    <!-- Версия в нижнем правом углу -->
    <p
      v-if="version"
      class="absolute bottom-0 right-3 z-20 version"
      style="margin: 0 !important; padding: 0 !important;"
    >
      {{ version }}
    </p>

    <!-- Контент слева -->
    <div class="relative z-10 w-1/2 pr-8">
      <slot />
    </div>
  </div>
</template>
