<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/hsp/playbook';
import DesktopPage from '@/pages/desktop/hsp/playbook';

export default defineComponent({
  name: 'HspPlaybook',
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
