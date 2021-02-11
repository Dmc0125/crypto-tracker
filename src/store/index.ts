import { createStore, createLogger } from 'vuex';

import apiState from './modules/cryptocurrencies';

import { Store } from './types';

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    apiState,
  },
});

export const useStore = () => store as Store;
