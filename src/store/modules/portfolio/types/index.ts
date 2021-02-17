import {
  ActionContext, CommitOptions, DispatchOptions, Store as VuexStore,
} from 'vuex';

import { RootState } from '@/store/types';
import { ActionTypes } from './action-types';
import { GetterTypes } from './getter-types';
import { MutationTypes } from './mutation-types';

type PositionDate = {
  open: Date;
  close?: Date;
}

export type NewPosition = {
  marketPair: string;
  symbol: string;
  quoteSymbol: string;
  entryPrice: number;
  amount: number;
  date: PositionDate;
}

export type Position = NewPosition & {
  entrySize: number;
  currentPrice: number;
  currentSize: number;
  pnl: number;
  pnlPercentage: number;
  image: string;
  id: string;
}

export type State = {
  positions: Position[];
}

// GETTERS

export type Getters = {
  [GetterTypes.GetPortfolioPositions]: (state: State) => Position[];
}

// ACTIONS

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}

export type Actions = {
  [ActionTypes.AddPosition]: (context: ActionAugments, newPositionData: NewPosition) => void;
  [ActionTypes.GetPositions]: (context: ActionAugments) => void;
  [ActionTypes.UpdatePositions]: (context: ActionAugments) => void;
}

// MUTATIONS

export type Mutations = {
  [MutationTypes.ADD_POSITION]: (state: State, positionData: Position) => void;
  [MutationTypes.SET_POSITIONS]: (state: State, positions: Position[]) => void;
}

export type PortfolioStore<S = State> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
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
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}
