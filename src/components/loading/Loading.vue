<template>
  <div
    class="loading"
    :style="{ width: size, height: size }"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 50%;
  border: 6px solid var(--accent);
  border-bottom-color: var(--third);

  animation: 1s linear infinite spin;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
