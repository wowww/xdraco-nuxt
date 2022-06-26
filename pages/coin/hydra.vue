<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/coin/hydra';
import DesktopPage from '@/pages/desktop/coin/hydra';

export default defineComponent({
  name: 'HydraPage',
  meta: {
    hasSubNav: 'coin',
    className: 'hydra',
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
@import '~@/assets/sass/common/pages/coin/_hydra.scss';
</style>
