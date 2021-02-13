<template>
  <li
    class="cryptocurrency"
  >
    <img
      class="cryptocurrency__logo"
      :src="cryptocurrencyData.logo"
      :alt="cryptocurrencyData.symbol"
    />
    <h4 class="cryptocurrency__symbol">{{ cryptocurrencyData.symbol }}</h4>

    <p class="cryptocurrency__usd-price">${{ usdPrice }}</p>
    <p class="cryptocurrency__btc-price">BTC {{ btcPrice }}</p>

    <p class="cryptocurrency__usd-percent-change">{{ usdPercentChange }}%</p>
    <p class="cryptocurrency__btc-percent-change">{{ btcPercentChange }}%</p>
  </li>
</template>

<script lang="ts">
/* eslint-disable no-confusing-arrow */
import {
  computed, defineComponent, PropType,
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
    const usdData = computed(() => props.cryptocurrencyData.usdData);
    const btcData = computed(() => props.cryptocurrencyData.btcData);

    const usdPrice = computed(() => Number(usdData.value?.price || 0).toFixed(2));
    const btcPrice = computed(() => Number(btcData.value?.price || 1).toFixed(8));

    const usdPercentChange = computed(() => Number(usdData.value?.priceChangePercent || 0).toFixed(2));
    const btcPercentChange = computed(() => Number(btcData.value?.priceChangePercent || 0).toFixed(2));

    return {
      usdPrice,
      btcPrice,

      usdPercentChange,
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
  grid-column: 1 / 3;
  justify-self: end;
  margin-right: .5rem;

  border-radius: 50%;
  box-shadow: 0 0 12px rgba(0, 0, 0, .15);
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
