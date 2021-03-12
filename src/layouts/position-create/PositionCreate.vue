<template>
  <sidebar>
    <form
      class="position-create"
      @submit.prevent="addPosition"
    >
      <h2>Add position</h2>

      <position-input
        label="Market pair"
        :inputValue="marketPair"
        :error-message="marketPairErrorMessage"
        @market-pair-input="updateMarketPair"
      />

      <position-input-group
        type="Entry"
        :inputs-value="entries"
        :update="updateEntries"
      />

      <position-sidebar-submit text="Add" />
    </form>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Sidebar from '@/components/sidebar/Sidebar.vue';
import PositionInput from '@/components/position-input/PositionInput.vue';
import PositionInputGroup from '@/components/position-input-group/PositionInputGroup.vue';
import PositionSidebarSubmit from '@/components/position-sidebar-submit/PositionSidebarSubmit.vue';

import { useStore } from '@/store';
import { ActionTypes } from '@/store/modules/portfolio/types/action-types';

import getMarketPair from '@/utils/get-market-pair';
import getInputsData from '@/utils/get-inputs-data';

export default defineComponent({
  components: {
    Sidebar,
    PositionInput,
    PositionInputGroup,
    PositionSidebarSubmit,
  },
  setup() {
    const { dispatch } = useStore();

    const {
      marketPair, symbols, isValid: isMarketPairValid, errorMessage: marketPairErrorMessage, updateMarketPair,
    } = getMarketPair();

    const { values: entries, update: updateEntries, getValues } = getInputsData();

    const addPosition = () => {
      isMarketPairValid();

      if (marketPairErrorMessage.value.length) {
        return;
      }

      const [symbol, quoteSymbol] = symbols.value;

      dispatch(ActionTypes.AddPosition, {
        quoteSymbol,
        symbol,
        entries: getValues(),
        marketPair: marketPair.value,
      });

      updateEntries.clearInputsData();
      marketPair.value = '';
    };

    return {
      entries,
      updateEntries,

      marketPair,
      updateMarketPair,
      marketPairErrorMessage,

      addPosition,
    };
  },
});
</script>

<style lang="scss" scoped>
.position-create {
  width: 100%;
  height: 100%;
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

.position-create__submit {
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
