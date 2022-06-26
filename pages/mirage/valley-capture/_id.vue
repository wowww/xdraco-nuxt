<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/mirage/valley-capture/_id';
import DesktopPage from '@/pages/desktop/mirage/valley-capture/_id';

export default defineComponent({
  name: 'MirageValleyPage',
  components: {
    MobilePage,
    DesktopPage,
  },
  layout: 'desktop/mirage',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
    hasBottomSticky: 'type1',
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
