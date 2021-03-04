export type QuoteSymbol = 'USDT' | 'BTC';

type PositionMarketData = {
  price: number;
  size: number;
  amount: number;
  date: Date;
}

export type PositionCloseData = {
  id: string;
  price: number;
  amount: number;
  date: Date;
}

export type PositionEntryData = {
  marketPair: string;
  symbol: string;
  quoteSymbol: QuoteSymbol;
  price: number;
  amount: number;
  date: Date;
}

export type Position = Omit<PositionEntryData, 'price' | 'amount' | 'date'> & {
  id: string;
  logo: string;
  type: 'open' | 'closed';
  entry: PositionMarketData;
  current: Omit<PositionMarketData, 'date'> & {
    pnl: number;
    pnlPercentage: number;
  };
  close?: {
    averagePrice: number;
    totalSize: number;
    totalAmount: number;
    totalPnl: number;
    totalPnlPercentage: number;
    values: (PositionMarketData & {
      pnl: number;
      pnlPercentage: number;
    })[];
  };
}

export type Positions = {
  [key: string]: Position;
}
