<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/exd/list';
import DesktopPage from '@/pages/desktop/exd/list';

export default defineComponent({
  name: 'ExdList',
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
