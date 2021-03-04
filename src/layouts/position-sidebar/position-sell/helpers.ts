import { useStore } from '@/store';
import { MutationTypes } from '@/store/modules/portfolio/types/mutation-types';

export const showSellPositionSidebar = (positionId: string) => {
  const { commit } = useStore();

  commit(MutationTypes.SET_SELL_POSITION_ID, positionId);
};

export const hideSellPositionSidebar = () => {
  const { commit } = useStore();

  commit(MutationTypes.SET_SELL_POSITION_ID, '');
};
