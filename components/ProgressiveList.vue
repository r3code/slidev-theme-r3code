<script setup lang="ts">
// ProgressiveList — список с пошаговым появлением пунктов через v-click.
//
// Использование:
//   <ProgressiveList :items="['Первый', 'Второй', 'Третий']" />
//
// Или через slots (для форматированного текста):
//   <ProgressiveList>
//     <li>Первый</li>
//     <li>Второй</li>
//   </ProgressiveList>
//
// Каждый <li> получает v-show по $clicks и class="active" на текущем клике.
// Маркеры: • для пройденных, ➜ для активного (см. styles/progressive.css)
//
// ВАЖНО: $clicks — это Ref<number> из useSlideContext().
// Vue автоматически разворачивает ref в template, так что $clicks >= i
// работает как $clicks.value >= i.

import { useSlideContext } from '@slidev/client'

const { $clicks } = useSlideContext()

defineProps<{
  items?: string[]
}>()
</script>

<template>
  <ul class="progressive">
    <template v-if="items">
      <li
        v-for="(item, i) in items"
        :key="i"
        v-show="$clicks >= i"
        :class="{ active: $clicks === i }"
      >
        {{ item }}
      </li>
    </template>
    <slot v-else />
  </ul>
</template>
