<template>
  <header class="positions-header">
    <button
      class="positions-header__close-btn"
      type="button"
      @click="emitClose"
    >
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- eslint-disable-next-line max-len -->
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.646 4.646a.5.5 0 01.708 0L12 11.293l6.646-6.647a.5.5 0 01.708.708L12.707 12l6.647 6.646a.5.5 0 01-.708.708L12 12.707l-6.646 6.647a.5.5 0 01-.708-.708L11.293 12 4.646 5.354a.5.5 0 010-.708z" fill="currentColor" />
      </svg>
    </button>

    <h2>{{ heading }}</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
  setup(_, { emit }) {
    const emitClose = () => {
      emit('close');
    };

    return {
      emitClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.positions-header {
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.positions-header__close-btn {
  width: 2rem;
  height: 2rem;
  background: none;

  color: var(--font-primary);

  &:hover,
  &:focus {
    outline: none;
    opacity: .7;
  }
}
</style>
