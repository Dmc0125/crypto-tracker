import {
  DispatchOptions, CommitOptions, Store as VuexStore, ActionContext,
} from 'vuex';
import { RootState } from '@/store/types';

import { ActionTypes } from './action-types';
import { GetterTypes } from './getter-types';
import { MutationTypes } from './mutation-types';
import { Cryptocurrencies, CryptocurrencyData, CryptocurrencyUsdtData } from './types';

// STATE

export type State = {
  cryptocurrencies: Cryptocurrencies;
}

// GETTERS

export type Getters = {
  [GetterTypes.GetCryptocurrencies]: (state: State) => Cryptocurrencies;
  [GetterTypes.GetCryptocurrenciesBySymbol]: (state: State) => (symbols: string[]) => CryptocurrencyData[];
  [GetterTypes.GetSortedCurrencies]: (state: State) => CryptocurrencyUsdtData[];
}

// ACTIONS

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

export type Actions = {
  [ActionTypes.GetCryptocurrencies]: (context: ActionAugments) => void;
}

// MUTATIONS

export type Mutations = {
  // eslint-disable-next-line max-len
  [MutationTypes.SET_CRYPTOCURRENCIES]: (state: State, cryptocurrencyData: Cryptocurrencies) => void;
}

// STORE

export type CryptocurrenciesStore<S = State> = Omit<
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
