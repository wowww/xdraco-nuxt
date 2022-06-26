<template>
  <div>
    <div class="top-banner">
      <div class="top-inner">
        <h1 class="bi-top">MiraX</h1>
        <p class="desc" v-html="$t('s.mirax-guide.top.desc1')"></p>
      </div>
    </div>

    <section class="section">
      <div class="section__inner">
        <div class="concept">
          <p class="concept-desc">
            <strong>MiraX</strong>
            <span v-html="$t('s.mirax-guide.concept.desc1')"></span>
          </p>
        </div>
        <div class="intro">
          <h2 class="section-title" v-html="$t('t.mirax-guide.intro')"></h2>
          <p class="desc" v-html="$t('s.mirax-guide.intro.desc1')"></p>
          <p class="desc" v-html="$t('s.mirax-guide.intro.desc2')"></p>
        </div>
        <div class="wrap-define" :class="{ 'is-reverse': !isMobile }">
          <dl class="define">
            <dt v-html="$t('t.mirax-guide.obtaining')"></dt>
            <dd class="desc" v-html="$t('s.mirax-guide.obtaining.desc1')"></dd>
          </dl>
          <div class="wrap-img">
            <img v-if="isMobile" src="@/assets/img/mobile/mirage-mirax/img-obtaining.webp" alt="" />
            <img v-else src="@/assets/img/desktop/mirage-mirax/img-obtaining.webp" alt="" />
          </div>
        </div>
        <div class="wrap-define">
          <dl class="define">
            <dt v-html="$t('t.mirax-guide.maximum')"></dt>
            <dd class="desc" v-html="$t('s.mirax-guide.maximum.desc1')"></dd>
          </dl>
          <div class="wrap-img no-gutter">
            <img v-if="isMobile" src="@/assets/img/mobile/mirage-mirax/img-maximum.webp" alt="" />
            <img v-else src="@/assets/img/desktop/mirage-mirax/img-maximum.webp" alt="" />
          </div>
        </div>
        <dl class="define">
          <dt v-html="$t('t.mirax-guide.applying')"></dt>
          <dd>
            <p class="desc" v-html="$t('s.mirax-guide.applying.desc1')"></p>
            <p class="desc" v-html="$t('s.mirax-guide.applying.desc2')"></p>
            <figure class="figure-img" :class="{ 'no-gutter': isMobile }">
              <figcaption v-html="$t('w.mirage-playbook.sec2.part2.caption')"></figcaption>
              <img src="@/assets/img/common/mirage-mirax/img-mirage-score-formula.webp" alt="MIRAGE Score formula" />
            </figure>
            <p class="caution" v-html="$t('s.mirax-guide.applying.caution1')"></p>
            <div class="applying-step">
              <div class="wrap-step step1">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl class="mirage-score" :class="{ invisible: !isMobile }">
                    <dt v-html="$t('w.mirage.score')"></dt>
                    <dd>380,632</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd>0</dd>
                  </dl>
                </div>
                <div v-if="!isMobile" class="step-desc" v-html="$t('s.mirax-guide.applying.desc3-br')"></div>
              </div>
              <div class="summary">
                <div class="summary__inner">
                  <strong v-if="isMobile" class="txt" v-html="$t('s.mirax-guide.applying.desc3')"></strong>
                  <strong v-else class="txt" v-html="$t('w.mirax-guide.import')"></strong>
                </div>
              </div>
              <div class="wrap-step step2">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl class="mirage-score">
                    <dt v-html="$t('w.mirage.score')"></dt>
                    <dd>380,632</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd>0</dd>
                  </dl>
                </div>
                <div v-if="isMobile" class="step-desc" v-html="$t('s.mirax-guide.applying.desc4')"></div>
                <div v-else class="step-desc" v-html="$t('s.mirax-guide.applying.desc4-br')"></div>
              </div>
              <div class="summary">
                <div class="summary__inner">
                  <strong class="txt gain">
                    <span class="icon-mirax">MiraX</span>
                    <strong class="gain-value">+100</strong>
                  </strong>
                </div>
              </div>
              <div class="wrap-step step3">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl class="mirage-score">
                    <dt v-html="$t('w.mirage.score')"></dt>
                    <dd>381,022</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd>100</dd>
                  </dl>
                  <div v-if="isMobile" class="step-desc">
                    <span v-html="$t('w.mirage.score')"></span><br />
                    <em>+590</em>
                  </div>
                </div>
                <div v-if="!isMobile" class="step-desc">
                  <span v-html="$t('w.mirage.score')"></span><br />
                  <em>+590</em>
                </div>
              </div>
              <div class="summary">
                <div class="summary__inner">
                  <strong v-if="isMobile" class="txt" v-html="$t('s.mirax-guide.applying.desc5')"></strong>
                  <strong v-else class="txt" v-html="$t('w.mirage.seal')"></strong>
                </div>
              </div>
              <div class="wrap-step step4">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl class="mirage-score" :class="{ invisible: !isMobile }">
                    <dt v-html="$t('w.mirage.score')"></dt>
                    <dd>381,022</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd>100</dd>
                  </dl>
                </div>
                <div v-if="!isMobile" class="step-desc" v-html="$t('s.mirax-guide.applying.desc5-br')"></div>
              </div>
            </div>
          </dd>
        </dl>
        <div class="section-remark">
          <strong v-html="$t('s.mirax-guide.remark')"></strong>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';

export default defineComponent({
  name: 'MirageMiraXContents',
  components: {
    //
  },
  setup() {
    onBeforeMount(() => {
      //
    });

    onMounted(() => {
      //
    });

  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  mounted() {
    //
  },
  methods: {
    //
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/mirage-mirax';
</style>
