<template>
  <div class="big-movers-card">
    <div class="card__logo">
      <img
        :src="cryptocurrencyData.logo"
        :alt="`${cryptocurrencyData.symbol}`"
      >
    </div>

    <h4 class="card__symbol">{{ cryptocurrencyData.symbol.toUpperCase() }}</h4>

    <div class="card__price-data">
      <h5 class="price-data__heading">Price</h5>
      <price
        class="price-data__price"
        :price="cryptocurrencyData.usdtData.price"
        :quote="cryptocurrencyData.usdtData.symbolQuote"
      />
    </div>

    <div class="card__percent-data">
      <h5 class="percent-data__heading">Price change</h5>
      <percentage
        class="percent-data__change"
        :percentage="cryptocurrencyData.usdtData.priceChangePercent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Price from '@/components/price/Price.vue';
import Percentage from '@/components/percentage/Percentage.vue';

import { CryptocurrencyUsdtData } from '@/store/modules/cryptocurrencies/types/types';

export default defineComponent({
  components: {
    Price,
    Percentage,
  },
  props: {
    cryptocurrencyData: {
      type: Object as PropType<CryptocurrencyUsdtData>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.big-movers-card {
  width: 20%;
  height: 150px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  border: 1px solid var(--primary);
  border-radius: 5px;
  box-shadow: 0 0 16px rgba(0, 0, 0, .05);
}

.card__logo {
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  img {
    height: 2rem;
    border-radius: 50%;
  }
}

.card__symbol {
  grid-column: 2 / 3;
}

.card__price-data {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.card__percent-data {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.price-data__heading,
.percent-data__heading {
  opacity: .7;
}

.price-data__price,
.percent-data__change {
  margin-top: 4px;
}
</style>
