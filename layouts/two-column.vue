<script setup lang="ts">
// Две колонки: контент слева, контент справа.
// Использует named slots: default (слева) и right (справа).
//
// Пример:
//   ---
//   layout: two-column
//   ---
//   # Левая колонка
//   Текст слева
//   ::right::
//   # Правая колонка
//   Текст справа

import SlideNumber from '../components/SlideNumber.vue'
</script>

<template>
  <div class="slidev-layout two-column">
    <div>
      <slot />
    </div>
    <div>
      <slot name="right" />
    </div>
    <SlideNumber />
  </div>
</template>
