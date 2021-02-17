import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import { addPositionToLocalStorage, getFromLocalStorage, setInLocalStorage } from '@/utils/local-storage';
import { LS_POSITIONS_DATA } from '@/constants';
import { RootState } from '@/store/types';
import {
  Actions, Getters, Mutations, Position, State,
} from './types';
import { GetterTypes } from './types/getter-types';
import { MutationTypes } from './types/mutation-types';
import { ActionTypes } from './types/action-types';
import { CryptocurrencyData } from '../cryptocurrencies/types';

const state: State = {
  positions: [],
};

const getters: GetterTree<State, RootState> & Getters = {
  [GetterTypes.GetPortfolioPositions]: _state => _state.positions,
};

// FIX: Update positions data on each app load
const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.AddPosition]: ({ rootState, commit }, newPosition) => {
    const { cryptocurrencies } = rootState.cryptocurrenciesState;

    const {
      symbol, quoteSymbol, amount, entryPrice,
    } = newPosition;

    const {
      usdMarketData, btcMarketData, image,
    } = cryptocurrencies.find(({ symbol: _symbol }) => _symbol === symbol) as CryptocurrencyData;
    const { price: currentPrice } = quoteSymbol === 'usd' ? usdMarketData : btcMarketData;

    const entrySize = entryPrice * amount;
    const currentSize = currentPrice * amount;

    const positionData: Position = {
      ...newPosition,
      image,
      currentPrice,
      entrySize,
      currentSize,
      pnl: currentSize - entrySize,
      pnlPercentage: (currentSize / entrySize - 1) * 100,
      id: uuidv4(),
    };

    commit(MutationTypes.ADD_POSITION, positionData);
    addPositionToLocalStorage(positionData);
  },

  [ActionTypes.GetPositions]: ({ commit }) => {
    const positions = getFromLocalStorage<Position[]>(LS_POSITIONS_DATA);

    if (positions) {
      commit(MutationTypes.SET_POSITIONS, positions);
    }
  },

  [ActionTypes.UpdatePositions]: ({ commit, rootState, state: _state }) => {
    if (!_state.positions.length) {
      return;
    }

    const updatedPositions = _state.positions.map(({
      symbol, quoteSymbol, entrySize, amount, ...rest
    }) => {
      const { usdMarketData, btcMarketData } = rootState.cryptocurrenciesState.cryptocurrencies
        .find(({ symbol: _symbol }) => _symbol === symbol) as CryptocurrencyData;
      const { price } = quoteSymbol === 'usd' ? usdMarketData : btcMarketData;

      // Fix: if currency is not in cryptocurrencies return old data

      const currentSize = amount * price;

      return {
        ...rest,
        symbol,
        quoteSymbol,
        entrySize,
        amount,
        currentSize,
        currentPrice: price,
        pnl: currentSize - entrySize,
        pnlPercentage: (currentSize / entrySize - 1) * 100,
      } as Position;
    });

    commit(MutationTypes.SET_POSITIONS, updatedPositions);
    setInLocalStorage(LS_POSITIONS_DATA, updatedPositions);
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_POSITION]: (_state, newPosition) => {
    _state.positions.push(newPosition);
  },
  [MutationTypes.SET_POSITIONS]: (_state, positions) => {
    _state.positions = positions;
  },
};

const store: Module<State, RootState> = {
  state,
  getters,
  actions,
  mutations,
};

export default store;
