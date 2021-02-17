<template>
  <li class="position">
    <img
      class="position__image"
      :src="positionData.image"
      :alt="positionData.symbol"
    >
    <h4 class="position__market-pair">{{ positionData.marketPair.toUpperCase() }}</h4>

    <price-formatted
      class="position__entry-price"
      :price="positionData.entryPrice"
      :quote="positionData.quoteSymbol"
    />
    <p class="position__amount">{{ positionData.amount }}</p>
    <price-formatted
      class="position__entry-size"
      :price="positionData.entrySize"
      :quote="positionData.quoteSymbol"
    />

    <price-formatted
      class="position__current-price"
      :price="positionData.currentPrice"
      :quote="positionData.quoteSymbol"
    />
    <price-formatted
      class="position__current-size"
      :price="positionData.currentSize"
      :quote="positionData.quoteSymbol"
    />

    <percent-formatted
      class="position__pnl"
      :percentage="positionData.pnlPercentage"
    >{{ positionData.pnlPercentage }}</percent-formatted>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Position } from '@/store/modules/portfolio/types';

export default defineComponent({
  props: {
    positionData: {
      type: Object as PropType<Position>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.position {
  width: 100%;
  height: 3.5rem;

  display: grid;
  grid-template-columns: repeat(24, 1fr);
  align-items: center;
  justify-items: end;
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
