<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import DesktopPage from '@/pages/desktop/home';
import MobilePage from '@/pages/mobile/home';

export default defineComponent({
  components: {
    DesktopPage,
    MobilePage,
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  }
});
</script>
