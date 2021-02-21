type PositionDate = {
  open: Date;
  close?: Date;
}

type PositionMarketData = {
  price: number;
  size: number;
  amount: number;
  date: PositionDate;
}

export type PositionCloseData = {
  id: string;
  price: number;
  amount: number;
  date: PositionDate;
}

export type PositionEntryData = {
  marketPair: string;
  symbol: string;
  quoteSymbol: string;
  price: number;
  amount: number;
  date: PositionDate;
}

export type Position = Omit<PositionEntryData, 'price' | 'amount' | 'date'> & {
  id: string;
  image: string;
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
