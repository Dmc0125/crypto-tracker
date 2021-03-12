import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';

import { RootState } from '@/store/types';

import { GetterTypes } from '@/store/modules/portfolio/types/getter-types';
import { MutationTypes } from '@/store/modules/portfolio/types/mutation-types';
import { ActionTypes } from '@/store/modules/portfolio/types/action-types';
import {
  Actions, Getters, Mutations, State,
} from '@/store/modules/portfolio/types';
import { Positions } from '@/store/modules/portfolio/types/types';

import { setPositionInLocalStorage, getFromLocalStorage, setInLocalStorage } from '@/utils/local-storage';
import { LS_POSITIONS_DATA } from '@/constants';

import createPositionData from './utils/create-position-data';
import updatePositionData from './utils/update-position-data';
import { getTotal, setCurrentData } from './utils/helpers';

const state: State = {
  positions: {},

  sidebarPosition: {
    id: '',
    type: null,
  },
};

const getters: GetterTree<State, RootState> & Getters = {
  [GetterTypes.GetPortfolioPositions]: _state => _state.positions,

  [GetterTypes.GetSidebarPosition]: _state => _state.sidebarPosition,
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.AddPosition]: ({ rootState, commit }, newPosition) => {
    const { cryptocurrencies } = rootState.cryptocurrenciesState;

    const positionData = createPositionData(cryptocurrencies, newPosition);

    commit(MutationTypes.SET_POSITION, positionData);
  },

  [ActionTypes.SellPosition]: ({ commit, state: { positions } }, { id, asData }) => {
    const currentPosition = positions[id];

    // If first sell, create close object first
    if (!currentPosition.close) {
      const { averagePrice, amount, size } = getTotal(asData);

      currentPosition.close = {
        averagePrice,
        totalAmount: amount,
        totalSize: size,
        values: asData,
      };

      const updatedPositionData = updatePositionData(currentPosition, 'sell');
      commit(MutationTypes.SET_POSITION, updatedPositionData);
      return;
    }

    // On sell
    //  - push closeData to close.values
    //    - call updatePositionData()
    currentPosition.close.values = [...currentPosition.close.values, ...asData];

    const updatedPositionData = updatePositionData(currentPosition, 'sell');
    commit(MutationTypes.SET_POSITION, updatedPositionData);
  },

  [ActionTypes.AddToPosition]: ({ commit, state: { positions } }, { id, asData }) => {
    const currentPosition = positions[id];

    currentPosition.entry.values = [...currentPosition.entry.values, ...asData];

    const updatedPositionData = updatePositionData(currentPosition, 'add');
    commit(MutationTypes.SET_POSITION, updatedPositionData);
  },

  [ActionTypes.GetPositions]: ({ commit }) => {
    const positions = getFromLocalStorage<Positions>(LS_POSITIONS_DATA);

    if (positions) {
      commit(MutationTypes.SET_POSITIONS, positions);
    }
  },

  [ActionTypes.UpdatePositions]: ({ commit, rootState, state: _state }) => {
    if (!Object.values(_state.positions).length) {
      return;
    }

    const updatedPositions = Object.values(_state.positions).reduce<Positions>((positions, position) => {
      const { usdtData, btcData } = rootState.cryptocurrenciesState.cryptocurrencies[position.symbol];

      let { price } = btcData;

      if (position.quoteSymbol === 'USDT' && usdtData) {
        price = usdtData.price;
      }

      const updatedPosition = setCurrentData(price, position.current.amount, position.current.size, position.entry.averagePrice);

      positions[position.id] = {
        ...position,
        current: updatedPosition,
      };
      return positions;
    }, {});

    commit(MutationTypes.SET_POSITIONS, updatedPositions);
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_POSITION]: (_state, positionData) => {
    _state.positions[positionData.id] = positionData;
    setPositionInLocalStorage(positionData);
  },
  [MutationTypes.SET_POSITIONS]: (_state, positions) => {
    _state.positions = positions;
    setInLocalStorage(LS_POSITIONS_DATA, positions);
  },

  [MutationTypes.SET_SIDEBAR_POSITION_DATA]: (_state, sidebarPosition) => {
    _state.sidebarPosition = sidebarPosition;
  },
};

const store: Module<State, RootState> = {
  state,
  getters,
  actions,
  mutations,
};

export default store;
