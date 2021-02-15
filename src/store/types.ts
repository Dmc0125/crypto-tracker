import { State as CryptocurrenciesState, CryptocurrenciesStore } from './modules/cryptocurrencies/types';
import { State as PortfolioState, PortfolioStore } from './modules/portfolio/types';

export type RootState = {
  cryptocurrenciesState: CryptocurrenciesState;
  portfolioState: PortfolioState;
}

export type Store = CryptocurrenciesStore<Pick<RootState, 'cryptocurrenciesState'>> & PortfolioStore<Pick<RootState, 'portfolioState'>>;
