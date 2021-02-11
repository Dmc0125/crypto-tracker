<template>
  <section>
  </section>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, watch,
} from 'vue';

import { useStore } from './store';

import { ActionTypes } from './store/modules/cryptocurrencies/types/action-types';

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();

    onMounted(() => {
      dispatch(ActionTypes.GetBinanceData);

      dispatch(ActionTypes.ConnectWebsocket);
    });

    const cryptocurrencies = computed(() => getters.getCryptocurrencies);

    watch(() => cryptocurrencies.value, () => {
      console.log(cryptocurrencies.value);
    }, {
      deep: true,
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
