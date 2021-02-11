import { State as ApiState, ApiStore } from './modules/cryptocurrencies/types';

export type RootState = {
  apiState: ApiState;
}

export type Store = ApiStore<Pick<RootState, 'apiState'>>;
