<template>
  <section class="loading-overlay">
    <div class="loading"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.loading-overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--primary);
}

.loading {
  width: 7rem;
  height: 7rem;

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
