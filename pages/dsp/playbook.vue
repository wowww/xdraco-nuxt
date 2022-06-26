<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/dsp/playbook';
import DesktopPage from '@/pages/desktop/dsp/playbook';

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
