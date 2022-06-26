<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/exd/item/_id';
import DesktopPage from '@/pages/desktop/exd/item/_id';

export default defineComponent({
  name: 'ExdItem',
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
