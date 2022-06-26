<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/exd/history';
import DesktopPage from '@/pages/desktop/exd/history';

export default defineComponent({
  name: 'ExdTradeHistory',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
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
