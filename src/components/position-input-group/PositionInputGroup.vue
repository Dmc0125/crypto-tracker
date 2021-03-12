<template>
  <div class="inputs-group">
    <div
      v-for="({ price, amount, date }, i) in inputsValue"
      class="inputs-group__section"
      :key="i"
    >
      <header class="section__header">
        <h4 class="header__heading">{{ type }} #{{ i + 1 }}</h4>

        <div class="header__actions">
          <button
            class="actions__add-section"
            type="button"
            @click="update.addInputData"
          >Add {{ type.toLowerCase() }}</button>

          <button
            v-if="inputsValue.length > 1"
            class="actions__delete-setion"
            type="button"
            @click="update.removeInputData(i)"
          >Delete {{ type.toLowerCase() }}</button>
        </div>
      </header>

      <position-input
        label="Price"
        inputType="number"
        mt-0
        :inputValue="price"
        @price-input="update.price(i, $event)"
      />

      <position-input
        label="Amount"
        inputType="number"
        :inputValue="amount"
        @amount-input="update.amount(i, $event)"
      />

      <position-input
        label="Date"
        input-type="date"
        :input-value="date"
        @date-input="update.date(i, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from 'vue';

import PositionInput from '@/components/position-input/PositionInput.vue';
import { UpdateFns } from '@/utils/get-inputs-data';

import { InputsData } from './types';

export default defineComponent({
  components: {
    PositionInput,
  },
  props: {
    type: {
      type: String as PropType<'Entry' | 'Close'>,
      required: true,
    },
    inputsValue: {
      type: Array as PropType<InputsData[]>,
      required: true,
    },
    update: {
      type: Object as PropType<UpdateFns>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.inputs-group {
  width: 100%;
}

.inputs-group__section {
  width: 100%;
  height: fit-content;
  margin-top: 2.5rem;
}

.section__header {
  width: 100%;
  margin-bottom: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__heading {
  opacity: .7;
}

.header__actions {
  display: flex;
  align-items: center;

  button {
    padding: 2px .5rem;

    font-weight: 500;
    font-size: .9rem;
    background: none;
    border-radius: 5px;
    opacity: 1;
    transition: var(--trans);

    &:focus,
    &:hover {
      outline: 0;
      opacity: .7;
    }
  }
}

.actions__add-section {
  border: 2px solid var(--third);
  color: var(--third);

  &:hover,
  &:focus {
    border-color: var(--green);
    color: var(--green);
  }
}

.actions__delete-setion {
  margin-left: .7rem;
  border: 2px solid var(--third);
  color: var(--third);

  &:hover,
  &:focus {
    border-color: var(--red);
    color: var(--red);
  }
}

.more-inputs-group__section:not(:last-child) .actions__add-section {
  display: none;
}
</style>
