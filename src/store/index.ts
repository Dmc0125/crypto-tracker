import { createStore, createLogger } from 'vuex';

import cryptocurrenciesState from './modules/cryptocurrencies';
import portfolioState from './modules/portfolio';

import { Store } from './types';

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    cryptocurrenciesState,
    portfolioState,
  },
});

export const useStore = () => store as Store;
