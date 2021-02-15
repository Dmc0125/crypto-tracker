<template>
  <div
    class="add-position-input"
    :class="{ mt: !mt0, 'add-position-input--error': errorMessage.length }"
  >
    <div
      class="add-position-input__label-wrapper"
      :class="{ 'add-position-input__label-wrapper--active': inputValue.length || inputType === 'date' }"
    >
      <label class="label-wrapper__label">{{ label }}</label>
    </div>
    <input
      class="add-position-input__input"
      :type="inputType"
      :value="inputValue"
      :step="inputType === 'text' ? 0 : 0.00000001"
      @input="emitInput"
    >
    <div
      v-if="errorMessage.length"
      class="input__error"
    >
      <p class="error__message">{{ errorMessage }}</p>
    </div>
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
    inputType: {
      type: String,
      default: 'text',
    },
    mt0: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const emitInput = (e: InputEvent) => {
      const { value } = e.target as HTMLInputElement;

      emit(`${props.label.replaceAll(' ', '-').toLowerCase()}-input`, value);
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
  position: relative;

  border: 2px solid var(--third);
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

  &--error {
    border-color: var(--red);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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

.mt {
  margin-top: 2.5rem;
}

.input__error {
  width: calc(100% + 4px);
  padding: 3px 5%;
  position: absolute;
  bottom: -2px;
  left: -2px;
  transform: translateY(100%);

  background: var(--red);
  // border: 2px solid var(--red);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.error__message {
  color: var(--font-secondary);
  font-size: .9rem;
}
</style>
