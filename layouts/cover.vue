<script setup lang="ts">
// Обложка доклада.
// Frontmatter-опции:
//   coverImage: '/images/bg.jpg'    — фоновое изображение справа
//   logo: true                      — показать логотип Ви.Tech в углу
//   logoSrc: '/images/custom.svg'   — свой логотип
//   version: '20261028 rev. abc123' — строка версии в нижнем правом углу

const props = defineProps<{
  coverImage?: string
  logo?: boolean | string
  version?: string
}>()

function logoUrl(): string | null {
  if (props.logo === false) return null
  if (typeof props.logo === 'string') return props.logo
  if (props.logo === true) return '/vitech-logo-white-tech.svg'
  return null
}
</script>

<template>
  <div class="slidev-layout cover relative">
    <!-- Фоновое изображение справа (половина слайда) -->
    <div v-if="coverImage" class="absolute right-0 top-0 bottom-0 w-1/2 h-full">
      <img :src="coverImage" class="w-full h-full object-cover" alt="Фон презентации">
    </div>

    <!-- Логотип в правом верхнем углу -->
    <div
      v-if="logoUrl()"
      class="absolute z-20"
      style="top: 30px; right: 30px; height: 50px;"
    >
      <img
        :src="logoUrl()"
        style="height: 50px !important; width: auto !important; display: block;"
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
