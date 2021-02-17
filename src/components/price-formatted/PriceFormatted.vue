<template>
  <p>{{ priceFormatted }}</p>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  props: {
    price: {
      type: Number,
      required: true,
    },
    quote: {
      type: String as PropType<'usd' | 'btc'>,
      required: true,
    },
  },
  setup(props) {
    const priceFormatted = computed(() => {
      if (props.quote === 'usd') {
        if (props.price >= 1) {
          return `$${props.price.toFixed(2)}`;
        }

        return `$${props.price.toFixed(6)}`;
      }

      return `BTC ${props.price.toFixed(8)}`;
    });

    return {
      priceFormatted,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
