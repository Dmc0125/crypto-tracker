import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import { addPositionToLocalStorage, getFromLocalStorage, setInLocalStorage } from '@/utils/local-storage';
import { LS_POSITIONS_DATA } from '@/constants';
import { RootState } from '@/store/types';
import {
  Actions, Getters, Mutations, PositionEntryData, Position, State, Positions,
} from './types';
import { GetterTypes } from './types/getter-types';
import { MutationTypes } from './types/mutation-types';
import { ActionTypes } from './types/action-types';
import { Cryptocurrencies, CryptocurrencyData } from '../cryptocurrencies/types';

const state: State = {
  positions: {},
};

const getters: GetterTree<State, RootState> & Getters = {
  [GetterTypes.GetPortfolioPositions]: _state => _state.positions,
};

const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.AddPosition]: ({ rootState, commit }, newPosition) => {
    const { cryptocurrencies } = rootState.cryptocurrenciesState;

    const positionData = createPositionData(cryptocurrencies, newPosition);

    commit(MutationTypes.ADD_POSITION, positionData);
    addPositionToLocalStorage(positionData);
  },

  [ActionTypes.SellPosition]: ({ commit, state: _state }, positionCloseData) => {
    const { id, price: closePrice, amount: closeAmount } = positionCloseData;

    const position = _state.positions[id];

    const entrySize = position.entry.price * closeAmount;
    const closeSize = closePrice * closeAmount;

    const pnl = closeSize - entrySize;
    const pnlPercentage = (closeSize / entrySize - 1) * 100;

    if (!position.close) {
      position.close = {
        averagePrice: closePrice,
        totalSize: closeSize,
        totalAmount: closeAmount,
        totalPnl: pnl,
        totalPnlPercentage: pnlPercentage,
        values: [{
          ...positionCloseData,
          pnl,
          pnlPercentage,
          size: closeSize,
        }],
      };

      position.current = {
        ...position.current,
        amount: position.entry.amount - closeAmount,
        pnl: position.current.pnl - pnl,
      };

      commit(MutationTypes.ADD_POSITION, position);
      addPositionToLocalStorage(position);
      return;
    }

    position.close.values.push({
      ...positionCloseData,
      pnl,
      pnlPercentage,
      size: closeSize,
    });

    type TotalValues = {
      totalPrice: number;
      totalSize: number;
      totalAmount: number;
      totalPnl: number;
    }

    const {
      totalPnl, totalAmount, totalPrice, totalSize,
    } = position.close.values.reduce((acc, {
      price, size, amount, pnl: _pnl,
    }) => ({
      totalPrice: (acc.totalPrice || 0) + price,
      totalSize: (acc.totalSize || 0) + size,
      totalAmount: Number(((acc.totalAmount || 0) + amount).toFixed(8)),
      totalPnl: (acc.totalPnl || 0) + _pnl,
    }), {} as TotalValues);

    const totalClosedAmountEntrySize = position.entry.price * totalAmount;

    position.close = {
      totalAmount,
      totalSize,
      totalPnl,
      averagePrice: totalPrice / position.close.values.length,
      values: position.close.values,
      totalPnlPercentage: (totalSize / totalClosedAmountEntrySize - 1) * 100,
    };

    console.log({
      totalAmount, totalPnl, totalPrice, totalSize,
    });

    position.current = {
      ...position.current,
      amount: position.entry.amount - position.close.totalAmount,
      pnl: position.current.pnl - pnl,
    };

    commit(MutationTypes.ADD_POSITION, position);
    addPositionToLocalStorage(position);
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

    const updatedPositions = Object.values(_state.positions).reduce<Positions>((acc, position) => {
      const cryptocurrency = rootState.cryptocurrenciesState.cryptocurrencies[position.symbol];

      if (!cryptocurrency) {
        // FIX: If cryptocurrency is not in base coingecko response fetch specific cryptocurrency data
        acc[position.id] = position;
        return acc;
      }

      const updatedPosition = updatePositionData(cryptocurrency, position);
      acc[updatedPosition.id] = updatedPosition;
      return acc;
    }, {});

    commit(MutationTypes.SET_POSITIONS, updatedPositions);
    setInLocalStorage(LS_POSITIONS_DATA, updatedPositions);
  },
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_POSITION]: (_state, positionData) => {
    _state.positions[positionData.id] = positionData;
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

function createPositionData(cryptocurrencies: Cryptocurrencies, positionEntry: PositionEntryData): Position {
  const {
    symbol, quoteSymbol, amount, price: entryPrice, date, marketPair,
  } = positionEntry;

  const { usdMarketData, btcMarketData, image } = cryptocurrencies[symbol];
  const { price: currentPrice } = quoteSymbol === 'usd' ? usdMarketData : btcMarketData;

  const entrySize = entryPrice * amount;
  const currentSize = currentPrice * amount;

  return {
    marketPair,
    symbol,
    quoteSymbol,
    image,
    id: uuidv4(),
    type: 'open',
    entry: {
      price: entryPrice,
      size: entrySize,
      amount,
      date,
    },
    current: {
      price: currentPrice,
      size: currentSize,
      pnl: currentSize - entrySize,
      pnlPercentage: (currentPrice / entryPrice - 1) * 100,
      amount,
    },
  };
}

function updatePositionData(cryptocurrency: CryptocurrencyData, oldPositionData: Position): Position {
  const { usdMarketData, btcMarketData } = cryptocurrency;
  const { price } = oldPositionData.quoteSymbol === 'usd' ? usdMarketData : btcMarketData;

  const currentSize = price * oldPositionData.current.amount;

  return {
    ...oldPositionData,
    current: {
      ...oldPositionData.current,
      price,
      size: currentSize,
      pnl: currentSize - oldPositionData.entry.size,
      pnlPercentage: (oldPositionData.current.price / oldPositionData.entry.price - 1) * 100,
    },
  };
}
