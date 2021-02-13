/* eslint-disable arrow-body-style */
import {
  GetterTree, ActionTree, MutationTree, Module,
} from 'vuex';

import { API_URL } from '@/constants';
import { RootState } from '@/store/types';
import {
  State, Getters, Actions, Mutations, CoingeckoResponse, CryptocurrencyData,
} from './types';
import { ActionTypes } from './types/action-types';
import { MutationTypes } from './types/mutation-types';

const state: State = {
  cryptocurrencies: [],
};

const getters: GetterTree<State, RootState> & Getters = {
  getCryptocurrencies: _state => _state.cryptocurrencies,
  getCryptocurrenciesBySymbol: _state => symbols => {
    if (!_state.cryptocurrencies.length) {
      return [];
    }

    return symbols.map(_symbol => (
      (_state.cryptocurrencies.find(({ symbol }) => symbol === _symbol.toLowerCase()) as CryptocurrencyData)
    ));
  },
  getSortedCurrencies: _state => _state.cryptocurrencies
    .sort(({ usdMarketData: aUsdData }, { usdMarketData: bUsdData }) => bUsdData.priceChangePercentage24h - aUsdData.priceChangePercentage24h),
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.GetCoingeckoData]: async ({ commit }) => {
    const usdJson = await fetch(`${API_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    const usdCoingeckoResponse: CoingeckoResponse[] = await usdJson.json();

    const btcJson = await fetch(`${API_URL}coins/markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    const btcCoingeckoResponse: CoingeckoResponse[] = await btcJson.json();

    const cryptocurrencyData = usdCoingeckoResponse.map<CryptocurrencyData>(({
      current_price, price_change_24h, price_change_percentage_24h, market_cap, total_volume, ...rest
    }, i) => {
      const {
        current_price: btcCurrentPrice,
        price_change_24h: btcPriceChange24h,
        price_change_percentage_24h: btcPriceChangePercentage24h,
        market_cap: btcMarketCap,
        total_volume: btcTotalVolume,
      } = btcCoingeckoResponse[i];

      return {
        ...rest,
        usdMarketData: {
          price: current_price,
          priceChange24h: price_change_24h,
          priceChangePercentage24h: price_change_percentage_24h,
          marketCap: market_cap,
          totalVolume: total_volume,
        },
        btcMarketData: {
          price: btcCurrentPrice,
          priceChange24h: btcPriceChange24h,
          priceChangePercentage24h: btcPriceChangePercentage24h,
          marketCap: btcMarketCap,
          totalVolume: btcTotalVolume,
        },
      };
    });

    commit(MutationTypes.SET_CRYPTOCURRENCIES, cryptocurrencyData);
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CRYPTOCURRENCIES]: (_state, cryptocurrencyData) => {
    _state.cryptocurrencies = cryptocurrencyData;
  },
};

const store: Module<State, RootState> = {
  state,
  getters,
  actions,
  mutations,
};

export default store;
