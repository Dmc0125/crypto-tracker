<template>
  <section class="watchlist-wrapper">
    <section
      v-if="watchlistCryptocurrencies.length"
      class="biggest-movers"
    >
      <watchlist-big-movers-card
        v-for="cryptocurrencyData in biggestMovers"
        :key="cryptocurrencyData.id"
        :cryptocurrency-data="cryptocurrencyData"
      />
    </section>

    <section
      v-if="watchlistCryptocurrencies.length"
      class="watchlist"
    >
      <ul class="watchlist__header">
        <li class="header__symbol">Symbol</li>

        <li class="header__usd-price">USD Price</li>
        <li class="header__btc-price">BTC Price</li>

        <li class="header__usd-percent-change">USD change</li>
        <li class="header__btc-percent-change">BTC change</li>
      </ul>

      <ul class="watchlist__cryptocurrencies">
        <watchlist-cryptocurrency
          v-for="cryptocurrencyData in watchlistCryptocurrencies"
          :key="cryptocurrencyData.id"
          :cryptocurrency-data="cryptocurrencyData"
        />
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import {
  computed, defineComponent, watchEffect,
} from 'vue';

import { useStore } from '@/store';

import WatchlistCryptocurrency from '@/layouts/watchlist/WatchlistCryptocurrency.vue';
import WatchlistBigMoversCard from '@/layouts/watchlist/WatchlistBigMoversCard.vue';

export default defineComponent({
  components: {
    WatchlistCryptocurrency,
    WatchlistBigMoversCard,
  },
  setup() {
    const { getters } = useStore();

    const sortedCurrencies = computed(() => getters.getSortedCurrencies);
    const biggestMovers = computed(() => sortedCurrencies.value.slice(0, 2).concat(sortedCurrencies.value.slice(-2)));
    const watchlistCryptocurrencies = computed(() => getters.getCryptocurrenciesBySymbol(['BTC', 'ETH', 'LTC', 'DOT', 'LINK', 'FTT', 'BNB']));

    return {
      watchlistCryptocurrencies,
      biggestMovers,
    };
  },
});
</script>

<style lang="scss" scoped>
.watchlist-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 2rem;

  display: grid;
  grid-template-rows: 10rem 1fr;
  align-items: center;
}

.biggest-movers {
  width: 100%;
  height: fit-content;

  display: flex;
  justify-content: space-around;
}

.watchlist {
  width: 100%;
}

.watchlist__header {
  width: 100%;
  height: 3rem;

  display: grid;
  align-items: center;
  justify-items: end;
  grid-template-columns: repeat(24, 1fr);

  li {
    font-size: .9rem;
    font-weight: 600;
  }
}

.header__symbol {
  grid-column: 1 / 5;
  justify-self: center;
}

.header__usd-price {
  grid-column: 8 / 11;
}

.header__btc-price {
  grid-column: 12 / 16;
}

.header__usd-percent-change {
  grid-column: 18 / 20;
}

.header__btc-percent-change {
  grid-column: 21 / 23;
}

.watchlist__cryptocurrencies {
  width: 100%;
}
</style>
