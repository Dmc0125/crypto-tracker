<template>
  <form
    class="add-position"
    @submit.prevent
  >
    <h2>Add position</h2>

    <add-position-input
      label="Market pair"
      :inputValue="marketPair"
      @market-pair-input="updateMarketPair"
    />

    <div class="add-position__more-entries">
      <div
        v-for="({ price, amount }, i) in entries"
        class="more-entries__entry"
        :key="i"
      >
        <header class="entry__header">
          <h4 class="header__heading">Entry #{{ i + 1 }}</h4>

          <div class="header__actions">
            <button
              class="actions__add-entry"
              type="button"
              @click="addEntry"
            >Add entry</button>

            <button
              v-if="entries.length > 1"
              class="actions__delete-entry"
              type="button"
              @click="removeEntry(i)"
            >Delete entry</button>
          </div>
        </header>

        <add-position-input
          label="Price"
          inputType="number"
          mt-0
          :inputValue="price"
          @price-input="updatePrice(i, $event)"
        />

        <add-position-input
          label="Amount"
          inputType="number"
          :inputValue="amount"
          @amount-input="updateAmount(i, $event)"
        />
      </div>
    </div>

    <add-position-input
      label="Date"
      inputType="date"
      :inputValue="date"
      @date-input="updateDate"
    />

    <button
      class="add-position__submit"
      type="submit"
    >
      Add
    </button>

  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AddPositionInput from '@/components/add-position/AddPositionInput.vue';

const getMarketPair = () => {
  const marketPair = ref('');

  const updateMarketPair = (newMarketPair: string) => {
    marketPair.value = newMarketPair;
  };

  return {
    marketPair,
    updateMarketPair,
  };
};

const getEntries = () => {
  const entries = ref([{
    price: '',
    amount: '',
  }]);

  const updatePrice = (i: number, newPrice: string) => {
    entries.value[i].price = newPrice;
  };

  const updateAmount = (i: number, newAmount: string) => {
    entries.value[i].amount = newAmount;
  };

  const addEntry = () => {
    entries.value = [
      ...entries.value,
      {
        price: '',
        amount: '',
      },
    ];
  };

  const removeEntry = (i: number) => {
    entries.value.splice(i, 1);
  };

  return {
    entries,
    updatePrice,
    updateAmount,
    addEntry,
    removeEntry,
  };
};

const getDate = () => {
  const date = ref('');

  const updateDate = (newDate: string) => {
    date.value = newDate;
  };

  return {
    date,
    updateDate,
  };
};

export default defineComponent({
  components: {
    AddPositionInput,
  },
  setup() {
    const { marketPair, updateMarketPair } = getMarketPair();
    const {
      entries, updatePrice, updateAmount, addEntry, removeEntry,
    } = getEntries();
    const { date, updateDate } = getDate();

    return {
      marketPair,
      updateMarketPair,

      entries,
      updatePrice,
      updateAmount,
      addEntry,
      removeEntry,

      date,
      updateDate,
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
  overflow-y: auto;

  background: var(--secondary);
  box-shadow: 0 0 16px rgba(0, 0, 0, .05);
}

.add-position__more-entries {
  width: 100%;
}

.more-entries__entry {
  width: 100%;
  height: fit-content;
  margin-top: 2.5rem;
}

.entry__header {
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

.actions__add-entry {
  border: 2px solid var(--third);
  color: var(--third);

  &:hover,
  &:focus {
    border-color: var(--green);
    color: var(--green);
  }
}

.actions__delete-entry {
  margin-left: .7rem;
  border: 2px solid var(--third);
  color: var(--third);

  &:hover,
  &:focus {
    border-color: var(--red);
    color: var(--red);
  }
}

.more-entries__entry:not(:last-child) .actions__add-entry {
  display: none;
}

.add-position__submit {
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
}
</style>
