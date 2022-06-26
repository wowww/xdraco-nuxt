<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/exd/my-items';
import DesktopPage from '@/pages/desktop/exd/my-items';

export default defineComponent({
  name: 'ExdMyItem',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
    auth: true,
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
