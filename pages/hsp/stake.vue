<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/hsp/stake';
import DesktopPage from '@/pages/desktop/hsp/stake';

export default defineComponent({
  name: 'HspStake',
  meta: {
    title: 'HSP | XDRACO',
    hasSubNav: 'hsp',
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
