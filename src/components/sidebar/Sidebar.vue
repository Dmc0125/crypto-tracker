<template>
  <section class="sidebar">
    <slot></slot>
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
.sidebar {
  width: 25%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  padding: 4rem 3rem;
  overflow-y: auto;

  background: var(--secondary);
  box-shadow: 0 0 16px rgba(0, 0, 0, .05);
}
</style>
