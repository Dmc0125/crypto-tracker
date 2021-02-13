import {
  DispatchOptions, CommitOptions, Store as VuexStore, ActionContext,
} from 'vuex';

import { ActionTypes } from './action-types';
import { GetterTypes } from './getter-types';
import { MutationTypes } from './mutation-types';

// STATE

export type BinanceResponse = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

export type PairMarketData = {
  marketPair: string;
  price: string;
  priceChangePercent: string;
}

export type CryptocurrencyData = {
  id: string;
  symbol: string;
  logo: string;
  btcData: PairMarketData | null;
  usdData: PairMarketData | null;
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
  [ActionTypes.GetBinanceData]: (context: ActionAugments) => void;
  [ActionTypes.ConnectWebsocket]: (context: ActionAugments) => void;
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
