/* eslint-disable arrow-body-style */
import {
  GetterTree, ActionTree, MutationTree, Module,
} from 'vuex';

import { RootState } from '@/store/types';
import { ActionTypes } from '@/store/modules/cryptocurrencies/types/action-types';
import { MutationTypes } from '@/store/modules/cryptocurrencies/types/mutation-types';
import { GetterTypes } from '@/store/modules/cryptocurrencies/types/getter-types';
import {
  State, Getters, Actions, Mutations,
} from '@/store/modules/cryptocurrencies/types';
import { CryptocurrencyUsdtData, MarketData, CryptocurrenciesResponse } from '@/store/modules/cryptocurrencies/types/types';

import { API_URL } from '@/constants';

const state: State = {
  cryptocurrencies: {},
};

const getters: GetterTree<State, RootState> & Getters = {
  [GetterTypes.GetCryptocurrencies]: _state => _state.cryptocurrencies,

  [GetterTypes.GetCryptocurrenciesBySymbol]: _state => symbols => {
    if (!Object.keys(_state.cryptocurrencies).length) {
      return [];
    }

    if (symbols.length === 1) {
      return [_state.cryptocurrencies[symbols[0]]] || [];
    }

    return symbols.map(_symbol => _state.cryptocurrencies[_symbol]).filter(cryptocurrency => cryptocurrency);
  },

  [GetterTypes.GetSortedCurrencies]: _state => (Object.values(_state.cryptocurrencies)
    .filter(({ usdtData }) => usdtData) as CryptocurrencyUsdtData[])
    .sort((
      { usdtData: aUsdtData },
      { usdtData: bUsdtData },
    ) => (bUsdtData as MarketData).priceChangePercent - (aUsdtData as MarketData).priceChangePercent),
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.GetCryptocurrencies]: async ({ commit }) => {
    const cryptocurrenciesJson = await fetch(API_URL);
    const cryptocurrenciesResponse: CryptocurrenciesResponse = await cryptocurrenciesJson.json();

    commit(MutationTypes.SET_CRYPTOCURRENCIES, cryptocurrenciesResponse.binanceCurrencies);
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
