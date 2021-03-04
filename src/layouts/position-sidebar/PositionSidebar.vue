<template>
  <transition name="slide-in">
    <position-sell />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PositionSell from '@/layouts/position-sidebar/position-sell/PositionSell.vue';

export default defineComponent({
  components: {
    PositionSell,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: var(--trans);
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
}
</style>
