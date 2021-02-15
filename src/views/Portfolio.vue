<template>
  <section class="portfolio-wrapper">
    <section class="portfolio">
      <ul class="portfolio__header">
        <li class="header__market-pair">Market pair</li>

        <li class="header__entry-price">Entry price</li>
        <li class="header__amount">Amount</li>
        <li class="header__entry-size">Entry size</li>

        <li class="header__current-price">Current price</li>
        <li class="header__current-size">Current size</li>

        <li class="header__pnl">PnL</li>
      </ul>

      <ul class="portoflio-positions">
        <portfolio-position
          v-for="position in positions"
          :key="position.id"
          :position-data="position"
        />
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useStore } from '@/store';

import PortfolioPosition from '@/components/portfolio/PortfolioPosition.vue';

export default defineComponent({
  components: {
    PortfolioPosition,
  },
  setup() {
    const { getters } = useStore();

    const positions = computed(() => getters.getPortfolioPositions);

    return {
      positions,
    };
  },
});
</script>

<style lang="scss" scoped>
.portfolio-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 2rem;
}

.portfolio {
  width: 100%;
  height: fit-content;
}

.portfolio__header {
  width: 100%;
  height: 3rem;

  display: grid;
  grid-template-columns: repeat(24, 1fr);
  align-items: center;
  justify-items: end;

  li {
    font-size: .9rem;
    font-weight: 600;
  }
}

.header__market-pair {
  grid-column: 1 / 4;
  justify-self: center;
}

.header__entry-price {
  grid-column: 5 / 8;
}

.header__amount {
  grid-column: 8 / 11;
}

.header__entry-size {
  grid-column: 11 / 14;
}

.header__current-price {
  grid-column: 15 / 18;
}

.header__current-size {
  grid-column: 18 / 21;
}

.header__pnl {
  grid-column: 22 / 25;
  justify-self: center;
}

.portfolio-positions {
  width: 100%;
  height: fit-content;
}
</style>
