export type SidebarPosition = {
  id: string;
  type: 'Sell' | 'Add' | 'Details' | null;
}

export type QuoteSymbol = 'USDT' | 'BTC';

export type newPositionData = {
  marketPair: string;
  symbol: string;
  quoteSymbol: QuoteSymbol;
  entries: PositionMarketData[];
}

/**
 * Add/Sell position data
*/
export type PositionASData = {
  id: string;
  asData: PositionMarketData[];
}

/**
 * Entry and close values
 */
// type ECDataValues = PositionMarketData & {
//   pnl: number;
//   pnlPercentage: number;
// }

export type PositionMarketData = {
  price: number;
  size: number;
  amount: number;
  date: Date;
}

/**
 * Entry and close properties
 */
export type ECData = {
  averagePrice: number;
  totalSize: number;
  totalAmount: number;
  values: PositionMarketData[];
}

export type Position = Omit<newPositionData, 'entries'> & {
  id: string;
  logo: string;
  type: 'open' | 'closed';
  entry: ECData;
  current: Omit<PositionMarketData, 'date'> & {
    entrySize: number;
    pnl: number;
    pnlPercentage: number;
  };
  close?: ECData;
}

export type Positions = {
  [key: string]: Position;
}
