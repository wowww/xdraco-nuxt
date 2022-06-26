<template>
  <section class="section section-defi">
    <div class="section__inner">
      <h3 class="section-title">DeFi of HYDRA</h3>
      <dl class="section-define">
        <div>
          <dt>
            <img src="@/assets/img/desktop/hydra/img-hsp-black.webp" width="108" alt="HSP" />
          </dt>
          <dd>
            <p v-html="$t('s.hydra-defi.hsp.desc1')"></p>
            <a :href="getXDracoHost + '/hsp'" class="link-detail" v-html="$t('s.notice.hsp-open.link')" target="_blank"></a>
          </dd>
        </div>
        <div>
          <dt>
            <img src="@/assets/img/desktop/hydra/img-hsp-101-black.webp" width="154" alt="HSP101" />
          </dt>
          <dd>
            <p v-html="$t('s.hydra-defi.hsp101.desc2')"></p>
            <span class="soon" v-html="$t('s.hydra-defi.hsp101.link')"></span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraDefi',
  components: {
    //
  },
  data: () => ({
    //
  }),
  computed: {
    getXDracoHost() {
      return process.env.VUE_APP_XDRACO_HOST;
    },
  },
  methods: {
    //
  },
  beforeMount: () => {
    //
  },
  mounted: () => {
    //
  },
});
</script>
