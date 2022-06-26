<template>
  <section class="section section-refinery">
    <div class="section__inner">
      <h3 class="section-title" v-html="$t('t.hydra-refinery.title')"></h3>
      <p class="section-headline" v-html="$t('s.hydra-refinery.desc1')"></p>
      <div class="wrap-define" v-viewer="viewerOption">
        <dl class="define-step">
          <dt v-html="$t('t.hydra-refinery.step1.title')"></dt>
          <dd>
            <div class="desc">
              <p v-html="$t('s.hydra-refinery.step1.desc1')"></p>
            </div>
            <div class="wrap-img">
              <ol class="chart">
                <li>
                  <span class="level">Lv.1 (Lv.60) ➝</span>
                  <span class="quantity">1</span>
                </li>
                <li>
                  <span class="level">Lv.2 (Lv.65) ➝</span>
                  <span class="quantity">2</span>
                </li>
                <li>
                  <span class="level">Lv.3 (Lv.70) ➝</span>
                  <span class="quantity">5</span>
                </li>
                <li>
                  <span class="level">Lv.4 (Lv.75) ➝</span>
                  <span class="quantity">6</span>
                </li>
                <li>
                  <span class="level">Lv.5 (Lv.80) ➝</span>
                  <span class="quantity">7</span>
                </li>
                <li>
                  <span class="level">Lv.6 (Lv.85) ➝</span>
                  <span class="quantity">10</span>
                </li>
                <li>
                  <span class="level">Lv.7 (Lv.90) ➝</span>
                  <span class="quantity">11</span>
                </li>
                <li>
                  <span class="level">Lv.8 (Lv.95) ➝</span>
                  <span class="quantity">12</span>
                </li>
                <li>
                  <span class="level">Lv.9 (Lv.100) ➝</span>
                  <span class="quantity">15</span>
                </li>
                <li>
                  <span class="level">Lv.10 (Lv.110) ➝</span>
                  <span class="quantity">16</span>
                </li>
                <li>
                  <span class="level">Lv.11 (Lv.120) ➝</span>
                  <span class="quantity">17</span>
                </li>
                <li>
                  <span class="level">Lv.12 (Lv.130) ➝</span>
                  <span class="quantity">20</span>
                </li>
                <li>
                  <span class="level">Lv.13 (Lv.140) ➝</span>
                  <span class="quantity">21</span>
                </li>
                <li>
                  <span class="level">Lv.14 (Lv.150) ➝</span>
                  <span class="quantity">22</span>
                </li>
                <li>
                  <span class="level">Lv.15 (Lv.160) ➝</span>
                  <span class="quantity">25</span>
                </li>
              </ol>
              <div class="chart-caption" v-html="$t('w.hydra-refinery.step1.caption')"></div>
            </div>
          </dd>
        </dl>
        <dl class="define-step">
          <dt v-html="$t('t.hydra-refinery.step2.title')"></dt>
          <dd>
            <div class="desc">
              <p v-html="$t('s.hydra-refinery.step2.desc1')"></p>
              <p v-html="$t('s.hydra-refinery.step2.desc2')"></p>
            </div>
            <div class="wrap-img">
              <div class="area">
                <figure class="wrap-image by-viewer">
                  <img src="@/assets/img/desktop/hydra/img-game-menu1.webp" :alt="$t('s.guide.smeltery.step.1.screen.2')" />
                </figure>
                <figcaption v-html="$t('s.guide.smeltery.step.1.screen.2')"></figcaption>
              </div>
            </div>
          </dd>
        </dl>
        <dl class="define-step">
          <dt v-html="$t('t.hydra-refinery.step3.title')"></dt>
          <dd>
            <div class="desc">
              <p v-html="$t('s.hydra-refinery.step3.desc1')"></p>
              <p v-html="$t('s.hydra-refinery.step3.desc2')"></p>
              <p v-html="$t('s.hydra-refinery.step3.desc3')"></p>
              <div class="btn-calc-wrap">
                <refining-calculator />
              </div>
            </div>
            <div class="wrap-img">
              <div class="area">
                <figure class="wrap-image by-viewer">
                  <img src="@/assets/img/desktop/hydra/img-game-menu2.webp" :alt="$t('w.hydra-refinery.step3.caption')" />
                </figure>
                <figcaption v-html="$t('w.hydra-refinery.step3.caption')"></figcaption>
              </div>
            </div>
          </dd>
        </dl>
        <dl class="define-step">
          <dt v-html="$t('t.hydra-refinery.step4.title')"></dt>
          <dd>
            <div class="desc">
              <p v-html="$t('s.hydra-refinery.step4.desc1')"></p>
              <strong class="txt-caution" v-html="$t('s.hydra-refinery.step4.caution')"></strong>
            </div>
            <div class="wrap-img">
              <div class="area">
                <figure class="wrap-image by-viewer">
                  <img src="@/assets/img/desktop/hydra/img-game-menu3.webp" :alt="$t('w.home.wallet')" />
                </figure>
                <figcaption v-html="$t('w.home.wallet')"></figcaption>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';

import RefiningCalculator from '@/components/coin/common/RefiningCalculator';
import 'viewerjs/dist/viewer.css';

export default defineComponent({
  name: 'HydraRefinery',
  components: {
    RefiningCalculator,
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
  beforeMount: () => {
    //
  },
  mounted: () => {
    //
  },
  setup() {
    const state = reactive({
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>


