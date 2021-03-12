import { PositionMarketData } from '../types/types';

export const getTotal = (values: PositionMarketData[]) => {
  const amount = values.reduce((acc, { amount: _amount }) => acc + Number(_amount), 0);
  const averagePrice = values.reduce((acc, { amount: _amount, price }) => Number(_amount) * Number(price) + acc, 0) / amount;

  return {
    amount,
    averagePrice,
    size: amount * averagePrice,
  };
};

export const setCurrentData = (currentPrice: number, entryAmount: number, entrySize: number, averageEntryPrice: number) => {
  const currentSize = currentPrice * entryAmount;

  return {
    price: currentPrice,
    amount: entryAmount,
    entrySize: averageEntryPrice * entryAmount,
    size: currentPrice * entryAmount,
    pnl: currentSize - entrySize,
    pnlPercentage: (currentPrice / averageEntryPrice - 1) * 100,
  };
};
