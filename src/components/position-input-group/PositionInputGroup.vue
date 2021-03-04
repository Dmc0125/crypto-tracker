<template>
  <div class="inputs-group">
    <div
      v-for="({ price, amount }, i) in data"
      class="inputs-group__section"
      :key="i"
    >
      <header class="section__header">
        <h4 class="header__heading">{{ type }} #{{ i + 1 }}</h4>

        <div class="header__actions">
          <button
            class="actions__add-section"
            type="button"
            @click="addInputData"
          >Add {{ type.toLowerCase() }}</button>

          <button
            v-if="data.length > 1"
            class="actions__delete-setion"
            type="button"
            @click="removeInputData(i)"
          >Delete {{ type.toLowerCase() }}</button>
        </div>
      </header>

      <position-input
        label="Price"
        inputType="number"
        mt-0
        :inputValue="price"
        @price-input="updatePrice(i, $event)"
      />

      <position-input
        label="Amount"
        inputType="number"
        :inputValue="amount"
        @amount-input="updateAmount(i, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, watch, ref, PropType,
} from 'vue';

import PositionInput from '@/components/position-input/PositionInput.vue';

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
  },
  setup(_, { emit }) {
    const data = ref<InputsData[]>([{
      price: '',
      amount: '',
    }]);

    const updatePrice = (i: number, newPrice: string) => {
      data.value[i].price = newPrice;
    };

    const updateAmount = (i: number, newAmount: string) => {
      data.value[i].amount = newAmount;
    };

    const addInputData = () => {
      data.value = [
        ...data.value,
        {
          price: '',
          amount: '',
        },
      ];
    };

    const removeInputData = (i: number) => {
      data.value.splice(i, 1);
    };

    watch(() => data.value, () => {
      emit('entries-input', data.value);
    }, {
      deep: true,
    });

    return {
      data,

      updatePrice,
      updateAmount,

      addInputData,
      removeInputData,
    };
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
