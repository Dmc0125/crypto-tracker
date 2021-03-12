<template>
  <button
    class="position-sidebar-submit"
    :class="text === 'Add' ? 'position-sidebar-submit--add' : 'position-sidebar-submit--sell'"
    type="submit"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.position-sidebar-submit {
  width: fit-content;
  height: 3rem;
  margin-top: 2.5rem;
  padding: 0 1.6rem;

  border: 2px solid var(--accent);
  border-radius: 5px;
  background: none;
  color: var(--accent);
  font-weight: 500;

  &:focus,
  &:hover {
    outline: none;
    background: var(--accent);
    color: var(--font-secondary);
    transition: var(--trans);
  }

  &--add {
    color: var(--green);
    border-color: var(--green);

    &:focus,
    &:hover {
      background: var(--green);
      color: var(--font-secondary);
    }
  }

  &--sell {
    color: var(--red);
    border-color: var(--red);

    &:focus,
    &:hover {
      background: var(--red);
      color: var(--font-secondary);
    }
  }
}
</style>
