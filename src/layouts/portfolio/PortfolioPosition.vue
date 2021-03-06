<template>
  <li
    class="position"
  >
    <div class="position__overlay">
      <button
        class="overlay__btn"
        @click.stop="showSidebar('Add')"
      >Add more</button>
      <button
        class="overlay__btn"
        @click.stop="showSidebar('Sell')"
      >Sell</button>
      <button class="overlay__btn">Details</button>
    </div>

    <img
      class="position__image"
      :src="positionData.logo"
      :alt="positionData.symbol"
    >
    <h4 class="position__market-pair">{{ positionData.marketPair.toUpperCase() }}</h4>

    <price
      class="position__entry-price"
      :price="positionData.entry.averagePrice"
      :quote="positionData.quoteSymbol"
    />
    <p class="position__amount">{{ Number(positionData.current.amount.toFixed(6)) }}</p>
    <price
      class="position__entry-size"
      :price="positionData.current.entrySize"
      :quote="positionData.quoteSymbol"
    />

    <price
      class="position__current-price"
      :price="positionData.current.price"
      :quote="positionData.quoteSymbol"
    />
    <price
      class="position__current-size"
      :price="positionData.current.size"
      :quote="positionData.quoteSymbol"
    />

    <percentage
      class="position__pnl"
      :percentage="positionData.current.pnlPercentage"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Price from '@/components/price/Price.vue';
import Percentage from '@/components/percentage/Percentage.vue';

import { useStore } from '@/store';

import { Position } from '@/store/modules/portfolio/types/types';
import { MutationTypes } from '@/store/modules/portfolio/types/mutation-types';

export default defineComponent({
  components: {
    Price,
    Percentage,
  },
  props: {
    positionData: {
      type: Object as PropType<Position>,
      required: true,
    },
  },
  setup(props) {
    const { commit } = useStore();

    const showSidebar = (type: 'Add' | 'Sell') => {
      commit(MutationTypes.SET_SIDEBAR_POSITION_DATA, { id: props.positionData.id, type });
    };

    return {
      showSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.position {
  width: 100%;
  height: 3.5rem;
  margin-top: .7rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  align-items: center;
  justify-items: end;

  background: var(--secondary);

  &:hover .position__overlay {
    pointer-events: all;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
}

.position__overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 30%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(0, 0, 0, .1);
  opacity: 0;
  border-radius: 5px;
  pointer-events: none;

  &:focus-within {
    pointer-events: all;
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
}

.overlay__btn {
  height: 70%;
  width: 7rem;
  border-radius: 5px;

  background: var(--accent);
  color: var(--font-secondary);
  font-weight: 500;

  &:hover,
  &:focus {
    opacity: .8;
    outline: none;
  }
}

.position__image {
  width: 2rem;
  margin-right: .5rem;
  grid-column: 1 / 2;
  justify-self: end;
}

.position__market-pair {
  grid-column: 2 / 5;
  margin-left: .5rem;
  justify-self: start;
}

.position__entry-price {
  grid-column: 5 / 8;
}

.position__amount {
  grid-column: 8 / 10;
}

.position__entry-size {
  grid-column: 11 / 14;
}

.position__current-price {
  grid-column: 15 / 18;
}

.position__current-size {
  grid-column: 19 / 22;
}

.position__pnl {
  grid-column: 23 / 25;
  justify-self: center;
}
</style>
