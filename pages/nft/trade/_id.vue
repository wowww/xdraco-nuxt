<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/mobile/nft/trade/_id';
import DesktopPage from '@/pages/desktop/nft/trade/_id';

export default defineComponent({
  name: 'NftTradeItem',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
    hasBottomSticky: 'type1',
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
