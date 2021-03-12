<template>
  <sidebar></sidebar>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Sidebar from '@/components/sidebar/Sidebar.vue';

import { useStore } from '@/store';

export default defineComponent({
  components: {
    Sidebar,
  },
  props: {
    id: {
      type: String,
      requried: true,
    },
  },
  setup(props) {
    const { getters } = useStore();

    const positionData = computed(() => getters.getPortfolioPositions[props.id]);

    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
