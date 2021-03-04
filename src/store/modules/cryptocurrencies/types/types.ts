export type MarketData = {
  marketPair: string;
  symbolQuote: string;
  priceChange: number;
  priceChangePercent: number;
  price: number;
}

export type CryptocurrencyData = {
  symbol: string;
  logo: string;
  id: string;
  usdtData?: MarketData;
  btcData: MarketData;
}

export type CryptocurrencyUsdtData = CryptocurrencyData & {
  usdtData: MarketData;
}

export type Cryptocurrencies = {
  [key: string]: CryptocurrencyData;
};

export type CryptocurrenciesResponse = {
  binanceCurrencies: Cryptocurrencies;
}
