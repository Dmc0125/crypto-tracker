<template>
  <form
    class="position-form"
    @submit.prevent="submitForm"
  >
    <position-sidebar-header
      :heading="`${type} position`"
    />

    <position-input
      :input-value="marketPair"
      label="Market pair"
      is-readonly
    />

    <position-input-group
      :type="type === 'Add' ? 'Entry' : 'Exit'"
      :inputs-value="values"
      :update="updateValues"
    />

    <position-sidebar-submit
      :text="type"
    />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import PositionSidebarHeader from '@/components/position-sidebar-header/PositionSidebarHeader.vue';
import PositionInput from '@/components/position-input/PositionInput.vue';
import PositionInputGroup from '@/components/position-input-group/PositionInputGroup.vue';
import PositionSidebarSubmit from '@/components/position-sidebar-submit/PositionSidebarSubmit.vue';

import getInputsData from '@/utils/get-inputs-data';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/modules/portfolio/types/action-types';

export default defineComponent({
  components: {
    PositionSidebarHeader,
    PositionInput,
    PositionInputGroup,
    PositionSidebarSubmit,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<'Sell' | 'Add'>,
      required: true,
    },
  },
  setup(props) {
    const { getters, dispatch } = useStore();

    const marketPair = computed(() => getters.getPortfolioPositions[props.id].marketPair);

    const { values, update: updateValues, getValues } = getInputsData();

    const exitPosition = () => {
      dispatch(ActionTypes.SellPosition, {
        id: props.id,
        asData: getValues(),
      });
    };

    const addToPosition = () => {
      dispatch(ActionTypes.AddToPosition, {
        id: props.id,
        asData: getValues(),
      });
    };

    const submitForm = () => {
      if (props.type === 'Add') {
        addToPosition();
        updateValues.clearInputsData();
        return;
      }

      exitPosition();
      updateValues.clearInputsData();
    };

    return {
      marketPair,

      values,
      updateValues,

      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.position-form {
  width: 100%;
  height: 100%;
  transform: translateX(0);
}
</style>
