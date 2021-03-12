import { v4 as uuidv4 } from 'uuid';

import { getTotal, setCurrentData } from './helpers';

import { Cryptocurrencies } from '../../cryptocurrencies/types/types';
import { newPositionData, Position } from '../types/types';

const createPositionData = (cryptocurrencies: Cryptocurrencies, positionEntry: newPositionData) => {
  const {
    symbol, quoteSymbol, marketPair, entries,
  } = positionEntry;
  const { usdtData, btcData, logo } = cryptocurrencies[symbol];

  const { averagePrice: averageEntryPrice, amount: totalEntryAmount, size: totalEntrySize } = getTotal(entries);

  console.log({ entries });

  const positionData = {
    marketPair,
    symbol,
    quoteSymbol,
    logo,
    id: uuidv4(),
    type: 'open',
    entry: {
      averagePrice: averageEntryPrice,
      totalSize: totalEntrySize,
      totalAmount: totalEntryAmount,
      values: entries,
    },
  } as Position;

  if (usdtData && quoteSymbol === 'USDT') {
    positionData.current = setCurrentData(usdtData.price, totalEntryAmount, totalEntrySize, averageEntryPrice);
    return positionData;
  }

  positionData.current = setCurrentData(btcData.price, totalEntryAmount, totalEntrySize, averageEntryPrice);

  return positionData;
};

export default createPositionData;
