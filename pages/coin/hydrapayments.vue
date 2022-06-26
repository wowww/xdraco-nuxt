<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/coin/hydrapayments';
import DesktopPage from '@/pages/desktop/coin/hydrapayments';

export default defineComponent({
  name: 'HydraPayment',
  meta: {
    hasSubNav: 'coin',
    className: 'hydrapayments',
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
@import '~@/assets/sass/common/pages/coin/_hydra-payment.scss';
</style>
