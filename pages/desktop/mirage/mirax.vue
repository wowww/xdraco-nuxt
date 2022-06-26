<template>
  <main id="contents" class="contents mirage-mirax">
    <mirage-mira-x-contents />

    <Footer />
  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MirageMiraXContents from '@/components/mirage/MirageMiraXContents';
import Footer from '@/components/coin/Footer';

export default defineComponent({
  name: 'MirageMiraX',
  components: {
    Footer,
    MirageMiraXContents,
  },
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  methods: {
    //
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
</style>
