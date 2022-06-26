<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/coin/price';
import DesktopPage from '@/pages/desktop/coin/price';

export default defineComponent({
  name: 'PricePage',
  meta: {
    hasSubNav: 'coin',
    className: 'price',
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
@import '~@/assets/sass/components/_derby.scss';
@import '~@/assets/sass/components/_summary-coin.scss';
@import '~@/assets/sass/common/pages/coin/_price.scss';
</style>
