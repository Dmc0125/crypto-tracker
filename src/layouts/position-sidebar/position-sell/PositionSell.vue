<template>
  <sidebar
    v-if="sellPositionId.length"
  >
    <form
      class="position-sell"
      @submit.prevent="exitPosition"
    >
      <position-sidebar-header
        heading="Close position"
        @close="hideSellPositionSidebar"
      />

      <position-input
        :input-value="currentPosition.marketPair"
        label="Market pair"
        is-readonly
      />

      <position-input-group
        type="Exit"
        @entries-input="updateExits"
      />

      <position-input
        label="Date"
        input-type="date"
        :input-value="date"
        @date-input="updateDate"
      />

      <position-sidebar-submit
        text="Sell"
      />
    </form>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import Sidebar from '@/components/sidebar/Sidebar.vue';
import PositionSidebarHeader from '@/components/position-sidebar-header/PositionSidebarHeader.vue';
import PositionInput from '@/components/position-input/PositionInput.vue';
import PositionInputGroup from '@/components/position-input-group/PositionInputGroup.vue';
import PositionSidebarSubmit from '@/components/position-sidebar-submit/PositionSidebarSubmit.vue';

import { useStore } from '@/store';
import getDate from '@/layouts/position-sidebar/get-date';
import getInputsData, { getTotal } from '@/layouts/position-sidebar/get-inputs-data';
import { hideSellPositionSidebar } from '@/layouts/position-sidebar/position-sell/helpers';
import { ActionTypes } from '@/store/modules/portfolio/types/action-types';

export default defineComponent({
  components: {
    Sidebar,
    PositionSidebarHeader,
    PositionInput,
    PositionInputGroup,
    PositionSidebarSubmit,
  },
  setup() {
    const { getters, dispatch } = useStore();

    const sellPositionId = computed(() => getters.getSellPositionId);
    const currentPosition = computed(() => getters.getPortfolioPositions[sellPositionId.value]);

    const { date, updateDate } = getDate();

    const { values: exits, updateValues: updateExits } = getInputsData();

    const exitPosition = () => {
      const { averagePrice, amount } = getTotal(exits.value);

      dispatch(ActionTypes.SellPosition, {
        amount,
        price: averagePrice,
        date: new Date(date.value),
        id: sellPositionId.value,
      });
    };

    return {
      sellPositionId,
      currentPosition,

      date,
      updateDate,

      exits,
      updateExits,

      exitPosition,

      hideSellPositionSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.position-sell {
  width: 100%;
  height: 100%;
  transform: translateX(0);
}
</style>
