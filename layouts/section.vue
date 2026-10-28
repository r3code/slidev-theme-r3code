<script setup lang="ts">
// Разделитель секции.
// В светлой теме: чёрный фон + белый текст (использует class="bg-black text-white")
// В тёмной теме: инверсия — белый фон + чёрный текст (см. styles/layouts.css)
//
// Frontmatter:
//   sectionNum: '01' — крупный номер над заголовком (опционально)

defineProps<{
  sectionNum?: string
}>()
</script>

<template>
  <div class="slidev-layout section bg-black text-white h-full">
    <div class="my-auto">
      <div v-if="sectionNum" class="text-6xl font-bold opacity-50 mb-4">
        {{ sectionNum }}
      </div>
      <slot />
    </div>
  </div>
</template>
