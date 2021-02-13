<template>
  <section class="add-position">
    <h2>Add position</h2>

    <add-position-input
      label="Symbol"
      :inputValue="symbol"
      @symbol-input="updateSymbol"
    />

  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AddPositionInput from '@/components/add-position/AddPositionInput.vue';

export default defineComponent({
  components: {
    AddPositionInput,
  },
  setup() {
    const symbol = ref('');

    const updateSymbol = (newSymbol: string) => {
      symbol.value = newSymbol;
    };

    return {
      symbol,
      updateSymbol,
    };
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
  padding: 4rem 3rem;

  background: var(--secondary);
  box-shadow: 0 0 16px rgba(0, 0, 0, .05);
}
</style>
