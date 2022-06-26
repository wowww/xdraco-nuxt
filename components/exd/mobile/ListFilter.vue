<template>
  <v-select
    :key="`list-filter-${filterKey}`"
    class="select-filter"
    :placeholder="placeholder"
    :value="filter[filterKey]"
    :items="items"
    :menu-props="{ bottom: true, offsetY: true, contentClass: 'layer-filter' }"
    dark
    dense
    outlined
    :disabled="disabled"
    @change="change"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';

const { useState, useMutations } = createNamespacedHelpers('search');

export default defineComponent({
  name: 'ListFilter',
  props: {
    placeholder: {
      type: String,
    },
    filterKey: {
      type: String,
    },
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup({ collectible, filterKey }) {
    const { filter } = useState(['filter']);
    const { setFilter } = useMutations(['setFilter']);

    const change = (value) => {
      const changedFilter = { ...filter.value };
      changedFilter[filterKey] = value;

      setFilter(changedFilter);
    };

    return {
      filter,
      change,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
