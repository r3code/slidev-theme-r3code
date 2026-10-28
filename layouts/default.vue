<script setup lang="ts">
// Базовый контентный слайд с номером в углу.
// Номер скрыт на первом и последнем слайдах автоматически (через <SlideNumber />).

import SlideNumber from '../components/SlideNumber.vue'
</script>

<template>
  <div class="slidev-layout default">
    <slot />
    <SlideNumber />
  </div>
</template>
