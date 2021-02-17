<template>
  <p :class="Number(percentage.toFixed(2)) >= 0 ? 'percentage--green' : 'percentage--red'">
    {{ Math.abs(Number(percentage.toFixed(2))) }}%
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.percentage--green {
  color: var(--green);
}

.percentage--red {
  color: var(--red);
}
</style>
