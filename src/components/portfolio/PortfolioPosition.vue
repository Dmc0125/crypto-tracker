<template>
  <li class="position">
    <img
      class="position__image"
      :src="positionData.image"
      :alt="positionData.symbol"
    >
    <h4 class="position__market-pair">{{ positionData.marketPair.toUpperCase() }}</h4>

    <p class="position__entry-price">{{ positionData.entryPrice }}</p>
    <p class="position__amount">{{ positionData.amount }}</p>
    <p class="position__entry-size">{{ positionData.entrySize}}</p>

    <p class="position__current-price">{{ positionData.currentPrice }}</p>
    <p class="position__current-size">{{ positionData.currentSize }}</p>

    <p class="position__pnl">{{ positionData.pnlPercentage.toFixed(2) }}%</p>
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
  grid-column: 9 / 11;
}

.position__entry-size {
  grid-column: 11 / 14;
}

.position__current-price {
  grid-column: 15 / 18;
}

.position__current-size {
  grid-column: 18 / 21;
}

.position__pnl {
  grid-column: 22 / 25;
  justify-self: center;
}
</style>
