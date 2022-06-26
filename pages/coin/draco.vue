<template>
  <mobile-page v-if="isMobile"/>
  <desktop-page v-else/>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/coin/draco';
import DesktopPage from '@/pages/desktop/coin/draco';

export default defineComponent({
  name: 'DracoPage',
  meta: {
    hasSubNav: 'coin',
    className: 'draco',
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
@import '~@/assets/sass/common/pages/coin/_draco.scss';
</style>
