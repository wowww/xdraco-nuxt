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
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
</style>
