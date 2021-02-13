import {
  DispatchOptions, CommitOptions, Store as VuexStore, ActionContext,
} from 'vuex';

import { ActionTypes } from './action-types';
import { GetterTypes } from './getter-types';
import { MutationTypes } from './mutation-types';

// STATE

export type MarketData = {
  price: number;
  marketCap: number;
  totalVolume: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
}

export type CoingeckoResponse = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export type CryptocurrencyData = Omit<
  CoingeckoResponse,
  'current_price' | 'market_cap' | 'total_volume' | 'price_change_24h' | 'price_change_percentage_24h'
> & {
  usdMarketData: MarketData;
  btcMarketData: MarketData;
}

export type State = {
  cryptocurrencies: CryptocurrencyData[];
}

// GETTERS

export type Getters = {
  [GetterTypes.GetCryptocurrencies]: (state: State) => CryptocurrencyData[];
  [GetterTypes.GetCryptocurrenciesBySymbol]: (state: State) => (symbols: string[]) => CryptocurrencyData[];
  [GetterTypes.GetSortedCurrencies]: (state: State) => CryptocurrencyData[];
}

// ACTIONS

type ActionAugments = Omit<ActionContext<State, {}>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

export type Actions = {
  [ActionTypes.GetCoingeckoData]: (context: ActionAugments) => void;
}

// MUTATIONS

export type Mutations = {
  // eslint-disable-next-line max-len
  [MutationTypes.SET_CRYPTOCURRENCIES]: (state: State, cryptocurrencyData: CryptocurrencyData[]) => void;
}

// STORE

export type ApiStore<S = State> = Omit<
  VuexStore<S>,
  'commit' | 'dispatch' | 'getters'
> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  };
} & {
  dispatch<K extends keyof Actions, P extends Parameters<Actions[K]>[1]>(
    key: K,
    payload?: P,
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}
