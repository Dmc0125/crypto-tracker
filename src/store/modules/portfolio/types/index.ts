import {
  ActionContext, CommitOptions, DispatchOptions, Store as VuexStore,
} from 'vuex';

import { RootState } from '@/store/types';
import { ActionTypes } from './action-types';
import { GetterTypes } from './getter-types';
import { MutationTypes } from './mutation-types';
import {
  Positions, Position, newPositionData, PositionASData, SidebarPosition,
} from './types';

export type State = {
  positions: Positions;
  sidebarPosition: SidebarPosition;
}

// GETTERS

export type Getters = {
  [GetterTypes.GetPortfolioPositions]: (state: State) => Positions;
  [GetterTypes.GetSidebarPosition]: (state: State) => SidebarPosition;
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
  [ActionTypes.AddPosition]: (context: ActionAugments, positionEntryData: newPositionData) => void;
  [ActionTypes.SellPosition]: (context: ActionAugments, positionCloseData: PositionASData) => void;
  [ActionTypes.AddToPosition]: (context: ActionAugments, positionAddData: PositionASData) => void;
  [ActionTypes.GetPositions]: (context: ActionAugments) => void;
  [ActionTypes.UpdatePositions]: (context: ActionAugments) => void;
}

// MUTATIONS

export type Mutations = {
  [MutationTypes.SET_POSITION]: (state: State, positionData: Position) => void;
  [MutationTypes.SET_POSITIONS]: (state: State, positions: Positions) => void;

  [MutationTypes.SET_SIDEBAR_POSITION_DATA]: (state: State, positionId: SidebarPosition) => void;
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
