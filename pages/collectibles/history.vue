<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/collectibles/history';
import DesktopPage from '@/pages/desktop/collectibles/history';

export default defineComponent({
  name: 'CollectibleItem',
  meta: {
    title: 'COLLECTIBLES | XDRACO',
    hasSubNav: 'collectibles',
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
