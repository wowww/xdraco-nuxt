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
  name: 'MiragePlaybook',
  components: {
    Footer,
    MiragePlaybookContents,
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
