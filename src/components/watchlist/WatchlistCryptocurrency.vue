<template>
  <li
    class="cryptocurrency"
  >
    <img
      class="cryptocurrency__logo"
      :src="cryptocurrencyData.image"
      :alt="cryptocurrencyData.symbol"
    />
    <h4 class="cryptocurrency__symbol">{{ cryptocurrencyData.symbol.toUpperCase() }}</h4>

    <p class="cryptocurrency__usd-price">${{ usdPrice }}</p>
    <p class="cryptocurrency__btc-price">BTC {{ btcPrice }}</p>

    <p class="cryptocurrency__usd-percent-change">{{ usdPercentChange }}%</p>
    <p class="cryptocurrency__btc-percent-change">{{ btcPercentChange }}%</p>
  </li>
</template>

<script lang="ts">
/* eslint-disable no-confusing-arrow */
import {
  defineComponent, PropType, computed,
} from 'vue';

import { CryptocurrencyData } from '@/store/modules/cryptocurrencies/types';

export default defineComponent({
  props: {
    cryptocurrencyData: {
      type: Object as PropType<CryptocurrencyData>,
      required: true,
    },
  },
  setup(props) {
    const usdMarketData = computed(() => props.cryptocurrencyData.usdMarketData);
    const btcMarketData = computed(() => props.cryptocurrencyData.btcMarketData);

    const usdPrice = computed(() => usdMarketData.value.price.toFixed(2));
    const usdPercentChange = computed(() => usdMarketData.value.priceChangePercentage24h.toFixed(2));

    const btcPrice = computed(() => btcMarketData.value.price.toFixed(8));
    const btcPercentChange = computed(() => btcMarketData.value.priceChangePercentage24h.toFixed(2));

    return {
      usdPrice,
      usdPercentChange,

      btcPrice,
      btcPercentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.cryptocurrency {
  width: 100%;
  height: 3.5rem;

  display: grid;
  align-items: center;
  justify-items: end;
  grid-template-columns: repeat(24, 1fr);
}

.cryptocurrency__logo {
  height: 2rem;
  grid-column: 1 / 3;
  justify-self: end;
  margin-right: .5rem;

  border-radius: 50%;
}

.cryptocurrency__symbol {
  grid-column: 3 / 5;
  justify-self: start;
  margin-left: .5rem;
}

.cryptocurrency__usd-price {
  grid-column: 8 / 11;
}

.cryptocurrency__btc-price {
  grid-column: 12 / 16;
}

.cryptocurrency__usd-percent-change {
  grid-column: 18 / 20;
}

.cryptocurrency__btc-percent-change {
  grid-column: 21 / 23;
}
</style>
