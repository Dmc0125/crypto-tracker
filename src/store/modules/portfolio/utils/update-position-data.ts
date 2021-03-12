import { getTotal, setCurrentData } from './helpers';

import { ECData, Position } from '../types/types';

const updateECData = (oldECData: ECData) => {
  const { averagePrice, amount: totalAmount, size: totalSize } = getTotal(oldECData.values);

  const updatedECData = {
    ...oldECData,
    averagePrice,
    totalSize,
    totalAmount,
  };

  return updatedECData;
};

const updateCloseData = (oldCloseData: ECData, { averagePrice: averageEntryPrice, totalSize: totalEntrySize }: ECData) => {
  const {
    averagePrice: averageClosePrice, totalSize: totalCloseSize, totalAmount: totalCloseAmount, values,
  } = updateECData(oldCloseData);

  return {
    values,
    averagePrice: averageClosePrice,
    totalSize: totalCloseSize,
    totalAmount: totalCloseAmount,
    totalPnl: totalCloseSize - totalEntrySize,
    totalPnlPercentage: (averageClosePrice / averageEntryPrice - 1) * 100,
  };
};

const updatePositionData = (oldPositionData: Position, type: 'add' | 'sell') => {
  const updatedPositionData = {
    ...oldPositionData,
  };

  if (type === 'add') {
    // UPDATE ENTRY
    updatedPositionData.entry = updateECData(oldPositionData.entry);
  } else if (type === 'sell' && oldPositionData.close) {
    // UPDATE CLOSE
    updatedPositionData.close = updateCloseData(oldPositionData.close, oldPositionData.entry);
  }

  // eslint-disable-next-line prefer-const
  let { averagePrice: averageEntryPrice, totalAmount: totalCurrentAmount, totalSize } = updatedPositionData.entry;

  if (type === 'sell' && updatedPositionData.close) {
    // If user sold, get values from close
    const { totalAmount: totalCloseAmount, totalSize: totalCloseSize } = updatedPositionData.close;

    totalCurrentAmount -= totalCloseAmount;
    totalSize -= totalCloseSize;
  }

  if (type === 'add') {
    totalCurrentAmount -= (updatedPositionData.close?.totalAmount || 0);
  }

  updatedPositionData.current = setCurrentData(oldPositionData.current.price, totalCurrentAmount, totalSize, averageEntryPrice);

  return updatedPositionData;
};

export default updatePositionData;
