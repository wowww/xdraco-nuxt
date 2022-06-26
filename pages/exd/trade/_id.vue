<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/exd/trade/_id';
import DesktopPage from '@/pages/desktop/exd/trade/_id';

export default defineComponent({
  name: 'ExdTradeItem',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
    hasBottomSticky: 'type1',
  },
  components: {
    MobilePage,
    DesktopPage,
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
