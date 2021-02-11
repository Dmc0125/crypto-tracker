/* eslint-disable arrow-body-style */
import {
  GetterTree, ActionTree, MutationTree, Module,
} from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '@/store/types';
import {
  State, Getters, Actions, Mutations, BinanceResponse, CryptocurrencyData,
} from './types';
import { ActionTypes } from './types/action-types';
import { MutationTypes } from './types/mutation-types';

const API_URL = 'https://api.binance.com/api/v3/ticker/24hr';

const state: State = {
  cryptocurrencies: [],
};

const getters: GetterTree<State, RootState> & Getters = {
  getCryptocurrencies: _state => _state.cryptocurrencies,
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.GetBinanceData]: async ({ commit }) => {
    const json = await fetch(API_URL);
    const binanceResponse: BinanceResponse[] = await json.json();

    const cryptocurrencyData = createCryptocurrencyData(binanceResponse);

    commit(MutationTypes.SET_CRYPTOCURRENCIES, cryptocurrencyData);
  },
  [ActionTypes.ConnectWebsocket]: ({ commit }) => {
    const bnbWebsocket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    bnbWebsocket.onopen = () => {
      console.log('Connected to websocket');
    };

    bnbWebsocket.onmessage = (e) => {
      // console.log(e.data);
    };
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

function createCryptocurrencyData(binanceResponse: BinanceResponse[]) {
  const btcAndUsdPairsSymbols = getBtcAndUsdPairsSymbol(binanceResponse);

  console.log(btcAndUsdPairsSymbols);

  const cryptocurrencyData = setCryptocurrencyData(binanceResponse, btcAndUsdPairsSymbols);

  return cryptocurrencyData;
}

function getBtcAndUsdPairsSymbol(binanceResponse: BinanceResponse[]) {
  const btcAndUsdPairsSymbols = new Set(binanceResponse.reduce((acc, { symbol }) => {
    if (symbol.endsWith('BTC') || symbol.endsWith('USD')) {
      const _symbol = symbol.slice(0, -3);
      return [...acc, _symbol];
    }

    if (symbol.endsWith('USD')) {
      const _symbol = symbol.slice(0, -4);
      return [...acc, _symbol];
    }

    return acc;
  }, [] as string[]));

  return btcAndUsdPairsSymbols;
}

function setCryptocurrencyData(
  binanceResponse: BinanceResponse[], btcAndUsdPairsSymbols: Set<string>,
) {
  const cryptocurrencyData = [...btcAndUsdPairsSymbols].map(symbol => {
    const btcPairData = binanceResponse.find(({ symbol: _symbol }) => _symbol === `${symbol}BTC`);
    const usdPairData = binanceResponse.find(({ symbol: _symbol }) => _symbol === `${symbol}USD` || _symbol === `${symbol}USDT`);

    const _cryptocurrencyData: CryptocurrencyData = {
      symbol,
      id: uuidv4(),
      logo: `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/32`,
      btcData: null,
      usdData: null,
    };

    if (btcPairData) {
      _cryptocurrencyData.btcData = {
        marketPair: `${symbol}BTC`,
        price: btcPairData.lastPrice,
        priceChangePercent: btcPairData.priceChangePercent,
      };
    }

    if (usdPairData) {
      _cryptocurrencyData.usdData = {
        marketPair: `${symbol}USD`,
        price: usdPairData.lastPrice,
        priceChangePercent: usdPairData.priceChangePercent,
      };
    }

    return _cryptocurrencyData;
  });

  return cryptocurrencyData;
}
