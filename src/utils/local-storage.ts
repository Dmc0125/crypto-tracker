import { LS_POSITIONS_DATA } from '@/constants';
import { Position } from '@/store/modules/portfolio/types/types';

export const getFromLocalStorage = <K>(key: string): null | K => {
  const lsData = localStorage.getItem(key);

  if (!lsData) {
    return null;
  }

  return JSON.parse(lsData);
};

export const setInLocalStorage = <K>(key: string, value: K) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addPositionToLocalStorage = (position: Position) => {
  const lsData = localStorage.getItem(LS_POSITIONS_DATA);

  if (!lsData) {
    localStorage.setItem(LS_POSITIONS_DATA, JSON.stringify({
      [position.id]: position,
    }));
    return;
  }

  const lsPositions = JSON.parse(lsData);
  lsPositions[position.id] = position;
  localStorage.setItem(LS_POSITIONS_DATA, JSON.stringify(lsPositions));
};
