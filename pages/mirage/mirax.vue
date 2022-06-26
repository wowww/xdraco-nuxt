<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/mirage/mirax';
import DesktopPage from '@/pages/desktop/mirage/mirax';

export default defineComponent({
  name: 'MirageMiraX',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
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
