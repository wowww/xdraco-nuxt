<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/coin/drain';
import DesktopPage from '@/pages/desktop/coin/drain';

export default defineComponent({
  name: 'DrainPage',
  meta: {
    hasSubNav: 'coin',
    className: 'drain',
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

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/coin/_drain.scss';
</style>
