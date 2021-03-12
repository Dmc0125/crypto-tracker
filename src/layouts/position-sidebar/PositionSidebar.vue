<template>
  <transition
    name="slide-in"
    mode="out-in"
  >
    <sidebar
      v-if="positionData.id.length"
      :key="`${positionData.type}-${positionData.id}`"
    >
      <position-sidebar-form
        :id="positionData.id"
        :type="positionData.type"
      />
    </sidebar>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Sidebar from '@/components/sidebar/Sidebar.vue';
import PositionSidebarForm from '@/components/position-sidebar-form/PositionSidebarForm.vue';

import { useStore } from '@/store';

export default defineComponent({
  components: {
    Sidebar,
    PositionSidebarForm,
  },
  setup() {
    const { getters } = useStore();

    const positionData = computed(() => getters.getSidebarPosition);

    return {
      positionData,
    };
  },
});
</script>

<style lang="scss" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: var(--trans);
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
}
</style>
