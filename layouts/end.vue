<script setup lang="ts">
// Финальный слайд: вопросы, контакты, QR-коды.
// Без номера слайда.
//
// Frontmatter:
//   logo: true                      — показать логотип r3code в углу
//   logoSrc: '/images/custom.png'   — свой логотип
//
// Логотип по умолчанию: /r3code-logo.png
// Пути резолвятся через resolveAssetUrl для поддержки --base на GitHub Pages.

import { resolveAssetUrl } from '../layoutHelper'

const props = defineProps<{
  logo?: boolean | string
}>()

function logoUrl(): string | null {
  if (props.logo === false) return null
  if (typeof props.logo === 'string') return resolveAssetUrl(props.logo)
  if (props.logo === true) return resolveAssetUrl('/r3code-logo.png')
  return null
}
</script>

<template>
  <div class="slidev-layout end relative">
    <div v-if="logoUrl()" class="absolute" style="bottom: 30px; right: 30px; width: 40px; height: 40px;">
      <img
        :src="logoUrl()"
        style="height: 40px; width: 40px; object-fit: contain; display: block;"
        alt="Логотип"
      >
    </div>
    <div class="my-auto w-full">
      <slot />
    </div>
  </div>
</template>
