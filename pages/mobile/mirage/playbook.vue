<template>
  <main id="contents" class="contents mirage-playbook">
    <mirage-playbook-contents />

    <Footer />
  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import MiragePlaybookContents from '@/components/mirage/MiragePlaybookContents';
import Footer from '@/components/coin/Footer';

export default defineComponent({
  components: {
    Footer,
    MiragePlaybookContents,
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
</style>
