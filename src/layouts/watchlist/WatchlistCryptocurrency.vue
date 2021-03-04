<template>
  <li
    class="cryptocurrency"
  >
    <img
      class="cryptocurrency__logo"
      :src="cryptocurrencyData.logo"
      :alt="cryptocurrencyData.symbol"
    />
    <h4 class="cryptocurrency__symbol">{{ cryptocurrencyData.symbol.toUpperCase() }}</h4>

    <price
      class="cryptocurrency__price"
      :price="price"
      :quote="quote"
    />

    <price
      class="cryptocurrency__change"
      :price="change"
      :quote="quote"
    />

    <percentage
      class="cryptocurrency__percent-change"
      :percentage="percentChange"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import Price from '@/components/price/Price.vue';
import Percentage from '@/components/percentage/Percentage.vue';

import { CryptocurrencyData } from '@/store/modules/cryptocurrencies/types/types';

export default defineComponent({
  components: {
    Price,
    Percentage,
  },
  props: {
    cryptocurrencyData: {
      type: Object as PropType<CryptocurrencyData>,
      required: true,
    },
  },
  setup(props) {
    const marketData = computed(() => {
      if (props.cryptocurrencyData.usdtData) {
        return props.cryptocurrencyData.usdtData;
      }

      return props.cryptocurrencyData.btcData;
    });

    const price = computed(() => marketData.value.price);
    const change = computed(() => marketData.value.priceChange);
    const percentChange = computed(() => marketData.value.priceChangePercent);
    const quote = computed(() => marketData.value.symbolQuote);

    return {
      price,
      change,
      percentChange,
      quote,
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
}

.cryptocurrency__symbol {
  grid-column: 3 / 5;
  justify-self: start;
  margin-left: .5rem;
}

.cryptocurrency__price {
  grid-column: 10 / 14;
}

.cryptocurrency__change {
  grid-column: 15 / 19;
}

.cryptocurrency__percent-change {
  grid-column: 20 / 24;
}
</style>
