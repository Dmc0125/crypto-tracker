type MarketData = {
  price: number;
  marketCap: number;
  totalVolume: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
}

export type CoingeckoResponse = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export type CryptocurrencyData = Omit<
  CoingeckoResponse,
  'current_price' | 'market_cap' | 'total_volume' | 'price_change_24h' | 'price_change_percentage_24h'
> & {
  usdMarketData: MarketData;
  btcMarketData: MarketData;
}
