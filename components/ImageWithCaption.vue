<script setup lang="ts">
// ImageWithCaption — картинка по центру + подпись снизу.
// Картинка гарантированно не вылезает за края слайда (absolute top/bottom в пикселях).
//
// Использование:
//   <ImageWithCaption
//     src="/images/meme.jpg"
//     caption="И ВАРИАНТЫ УПРАВЛЯТЬ TTL"
//     alt="Мем"
//   />
//
// Props:
//   src      — путь к картинке (обязательный)
//   caption  — подпись снизу (опционально)
//   alt      — alt-текст (опционально)
//   topPad   — отступ сверху в px (по умолчанию 130 — под заголовок)
//   bottomPad — отступ снизу в px (по умолчанию 90 — под подпись)

withDefaults(defineProps<{
  src: string
  caption?: string
  alt?: string
  topPad?: number
  bottomPad?: number
}>(), {
  topPad: 130,
  bottomPad: 90,
})
</script>

<template>
  <div>
    <div
      class="absolute left-0 right-0"
      :style="{
        top: `${topPad}px`,
        bottom: caption ? `${bottomPad}px` : '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <img
        :src="src"
        :alt="alt || ''"
        style="max-width: 100%; max-height: 100%; object-fit: contain;"
      >
    </div>
    <p
      v-if="caption"
      class="absolute left-0 right-0 text-center text-2xl font-bold"
      :style="{ bottom: '30px' }"
    >
      {{ caption }}
    </p>
  </div>
</template>
