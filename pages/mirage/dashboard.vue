<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/mirage/dashboard';
import DesktopPage from '@/pages/desktop/mirage/dashboard';

export default defineComponent({
  name: 'MirageDashboardPage',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
    hasBottomSticky: 'type1',
  },
  components: {
    MobilePage,
    DesktopPage,
  },
  layout: 'desktop/mirage',
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
