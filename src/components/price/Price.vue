<template>
  <p>{{ priceFormatted }}</p>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { QuoteSymbol } from '@/store/modules/portfolio/types/types';

export default defineComponent({
  props: {
    price: {
      type: Number,
      required: true,
    },
    quote: {
      type: String as PropType<QuoteSymbol>,
      required: true,
    },
  },
  setup(props) {
    const quotes = {
      USDT: '$',
      BTC: 'BTC',
    };

    const formatPrice = (price: number, quote: QuoteSymbol) => {
      if (Math.abs(price) >= 1) {
        return price.toFixed(2);
      }

      return price.toFixed(quote === 'BTC' ? 8 : 6);
    };

    const priceFormatted = computed(() => {
      const price = Math.abs(Number(formatPrice(props.price, props.quote)));

      if (props.price < 0) {
        return `-${quotes[props.quote]}${price}`;
      }

      return `${quotes[props.quote]}${price}`;
    });

    return {
      priceFormatted,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
