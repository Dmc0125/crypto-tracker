<template>
  <section class="add-position"></section>
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
.add-position {
  width: 25%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;

  background: var(--secondary);
}
</style>
