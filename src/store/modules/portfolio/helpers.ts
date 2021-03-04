import { v4 as uuidv4 } from 'uuid';

import { Cryptocurrencies, CryptocurrencyData, MarketData } from '../cryptocurrencies/types/types';
import { PositionEntryData, Position } from './types/types';

type UpdateCurrentDataParams = {
  marketData: MarketData;
  amount: number;
  entrySize: number;
  entryPrice: number;
}

const updateCurrentData = ({
  marketData,
  amount,
  entrySize,
  entryPrice,
}: UpdateCurrentDataParams) => {
  const currentSize = marketData.price * amount;

  const currentData = {
    amount,
    price: marketData.price,
    size: currentSize,
    pnl: currentSize - entrySize,
    pnlPercentage: (marketData.price / entryPrice - 1) * 100,
  };

  return currentData;
};

// eslint-disable-next-line consistent-return
export const createPositionData = (cryptocurrencies: Cryptocurrencies, positionEntry: PositionEntryData) => {
  const {
    symbol, quoteSymbol, amount, price: entryPrice, date, marketPair,
  } = positionEntry;
  const { usdtData, btcData, logo } = cryptocurrencies[symbol];

  const positionData = {
    marketPair,
    symbol,
    quoteSymbol,
    logo,
    id: uuidv4(),
    type: 'open',
  } as Position;

  const entrySize = amount * entryPrice;

  if (usdtData && quoteSymbol === 'USDT') {
    positionData.entry = {
      date,
      amount,
      price: entryPrice,
      size: entrySize,
    };

    positionData.current = updateCurrentData({
      marketData: usdtData,
      amount,
      entrySize,
      entryPrice,
    });

    return positionData;
  }

  if (btcData && quoteSymbol === 'BTC') {
    positionData.entry = {
      date,
      amount,
      price: entryPrice,
      size: entrySize,
    };

    positionData.current = updateCurrentData({
      marketData: btcData,
      entrySize,
      entryPrice,
      amount,
    });

    return positionData;
  }
};

export const updatePositionData = (cryptocurrency: CryptocurrencyData, oldPositionData: Position) => {
  const { usdtData, btcData } = cryptocurrency;

  if (usdtData && oldPositionData.quoteSymbol === 'USDT') {
    const updatedCurrentData = updateCurrentData({
      marketData: usdtData,
      amount: oldPositionData.current.amount,
      entryPrice: oldPositionData.entry.price,
      entrySize: oldPositionData.entry.size,
    });

    return {
      ...oldPositionData,
      current: updatedCurrentData,
    };
  }

  const updatedCurrentData = updateCurrentData({
    marketData: btcData,
    amount: oldPositionData.current.amount,
    entryPrice: oldPositionData.entry.price,
    entrySize: oldPositionData.entry.size,
  });

  return {
    ...oldPositionData,
    current: updatedCurrentData,
  };
};
