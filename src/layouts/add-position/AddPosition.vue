<template>
  <form
    class="add-position"
    @submit.prevent="addPosition"
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
      :inputValue="_date"
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
import { defineComponent } from 'vue';

import { useStore } from '@/store';
import { NewPosition } from '@/store/modules/portfolio/types';
import { ActionTypes } from '@/store/modules/portfolio/types/action-types';

import AddPositionInput from '@/layouts/add-position/AddPositionInput.vue';
import getMarketPair from './add-position-helpers/get-market-pair';
import getEntries from './add-position-helpers/get-entries';
import getDate from './add-position-helpers/get-date';

export default defineComponent({
  components: {
    AddPositionInput,
  },
  setup() {
    const { dispatch } = useStore();

    const { marketPair, updateMarketPair, getSymbols } = getMarketPair();
    const {
      entries, updatePrice, updateAmount, addEntry, removeEntry, getEntryData,
    } = getEntries();
    const { date: _date, updateDate } = getDate();

    const addPosition = () => {
      const [symbol, quoteSymbol] = getSymbols();
      const { amount, averagePrice } = getEntryData();

      const newPosition: NewPosition = {
        symbol: symbol.toLowerCase(),
        quoteSymbol: quoteSymbol.toLowerCase(),
        amount,
        marketPair: marketPair.value.toLowerCase(),
        entryPrice: averagePrice,
        date: {
          open: new Date(_date.value),
        },
      };

      dispatch(ActionTypes.AddPosition, newPosition);
    };

    return {
      marketPair,
      updateMarketPair,

      entries,
      updatePrice,
      updateAmount,
      addEntry,
      removeEntry,

      _date,
      updateDate,

      addPosition,
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
