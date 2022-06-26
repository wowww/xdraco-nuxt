<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/inventory';
import DesktopPage from '@/pages/desktop/inventory';

export default defineComponent({
  name: 'InventoryItemPage',
  layout: 'desktop/inventory',
  components: {
    MobilePage,
    DesktopPage,
  },
  meta: {
    title: 'Inventory | XDRACO',
    hasSubNav: 'inventory',
    auth: true,
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
