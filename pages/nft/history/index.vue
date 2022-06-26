<template>
  <mobile-page v-if="isMobile" />
  <desktop-page v-else />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MobilePage from '@/pages/nft/history/mobile';
import DesktopPage from '@/pages/nft/history/desktop';

export default defineComponent({
  name: 'NftTradeHistory',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
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
