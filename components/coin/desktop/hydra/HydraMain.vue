<template>
  <section class="section section-main">
    <div class="section__inner">
      <h2 class="section-title">
        <img src="@/assets/img/desktop/hydra/title-ss-2022.webp" height="64" alt="HYDRA" />
      </h2>
      <strong class="section-headline" v-html="$t('t.hydra-main.headline')"></strong>
      <p v-html="$t('s.hydra-main.desc1')"></p>
      <p v-html="$t('s.hydra-main.desc2')"></p>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import '@/assets/img/desktop/hydra/bg-hydra-main.webp';

export default defineComponent({
  name: 'HydraMain',
  components: {},
  data: () => ({
    //
  }),
  methods: {
    //
  },
});
</script>


