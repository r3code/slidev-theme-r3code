<script setup lang="ts">
// Финальный слайд: вопросы, контакты, QR-коды.
// Без номера слайда.

const props = defineProps<{
  logo?: boolean | string
}>()

function logoUrl(): string | null {
  if (props.logo === false) return null
  if (typeof props.logo === 'string') return props.logo
  if (props.logo === true) return '/vitech-logo-black-tech.svg'
  return null
}
</script>

<template>
  <div class="slidev-layout end relative">
    <div v-if="logoUrl()" class="absolute" style="bottom: 30px; right: 30px;">
      <img
        :src="logoUrl()"
        style="height: 40px; width: auto; display: block;"
        alt="Логотип"
      >
    </div>
    <div class="my-auto w-full">
      <slot />
    </div>
  </div>
</template>
