<template>
  <div class="add-position-input">
    <div
      class="add-position-input__label-wrapper"
      :class="{ 'add-position-input__label-wrapper--active': inputValue.length }"
    >
      <label class="label-wrapper__label">{{ label }}</label>
    </div>
    <input
      class="add-position-input__input"
      type="text"
      :value="inputValue"
      @input="emitInput"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const emitInput = (e: InputEvent) => {
      const { value } = e.target as HTMLInputElement;

      emit(`${props.label.toLowerCase()}-input`, value);
    };

    return {
      emitInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-position-input {
  width: 100%;
  height: 3rem;
  margin-top: 2.5rem;
  position: relative;

  border: 2px solid var(--primary);
  border-radius: 5px;

  &:focus-within .add-position-input__label-wrapper,
  .add-position-input__label-wrapper--active {
    padding: 0 5px;
    transform: translateY(-2rem);
    background: var(--secondary);

    .label-wrapper__label {
      font-size: .8rem;
    }
  }

  &:focus-within {
    border-color: var(--accent);
  }
}

.add-position-input__label-wrapper {
  width: fit-content;
  height: fit-content;
  padding: 0;
  top: 50%;
  left: 1.5rem;
  transform: translateY(-50%);
  position: absolute;

  pointer-events: none;
  transition: all 200ms ease-in-out;

  .label-wrapper__label {
    font-size: 1rem;
    transition: all 200ms ease-in-out;
  }
}

.add-position-input__input {
  width: 100%;
  height: 100%;
  padding: .5rem 1.5rem;

  background: inherit;
}
</style>
