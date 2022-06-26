<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/dsp/rounds';
import DesktopPage from '@/pages/desktop/dsp/rounds';

export default defineComponent({
  meta: {
    title: 'DSP | XDRACO',
    hasSubNav: 'dsp',
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
