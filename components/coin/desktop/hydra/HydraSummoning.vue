<template>
  <section class="section section-summoning">
    <div class="section__inner">
      <div class="wrap-summoning">
        <h3 class="section-title">{{ $t('t.hydra-teaser.summoning') }}</h3>
        <div class="summoning-area">
          <div class="refining">
            <div class="refining-item refining-base">
              <p>{{ $t('s.hydra-refining.base') }}</p>
              <div class="refining-wrap">
                <div class="refining-box">
                  <div class="image">
                    <img src="~@/assets/img/desktop/hydra/refining-draco.webp" width="92" />
                    <p class="count">x<strong>20</strong></p>
                  </div>
                  <span class="subscript">{{ $t('s.hydra-refining.base.materials') }}</span>
                </div>
              </div>
            </div>
            <span class="plus">+</span>
            <div class="refining-item refining-free">
              <p>
                <span v-html="$t('t.hydra-summoning.metaporphic')"></span><span>{{ hydraStage }}</span>
              </p>
              <div class="refining-wrap">
                <dl class="define-refining">
                  <dt>{{ $t('s.hydra-refining.fee') }}</dt>
                  <dd>
                    <span class="draco"><span class="hidden">Draco</span>{{ Math.round(refiningFee) - baseDraco }}</span>
                    <span class="plus">+</span>
                    <span class="septaria"><span class="hidden">Septaria</span>{{ hydraStage }}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="refining-metamorphic">
            <h4>{{ $t('t.hydra-refining.metamorphic') }}</h4>
            <p>
              {{ $t('s.hydra-refining.metamorphic.dsc1') }}
            </p>
            <p>
              {{ $t('s.hydra-refining.metamorphic.dsc2') }}
            </p>
          </div>
          <div class="refining-btns">
            <refining-calculator />
          </div>
          <div class="refining-define">
            <dl>
              <dt>{{ $t('t.hydra-refining.define') }}</dt>
              <dd>
                <p>
                  {{ $t('s.hydra-refining.define.dec1') }}
                </p>
              </dd>
              <dd class="formula">
                <p>{{ $t('s.hydra-refining.define.dec2') }}</p>
                <img src="~@/assets/img/desktop/hydra/refining-reqdraco.webp" width="368" />
              </dd>
            </dl>
            <dl>
              <dt>{{ $t('t.hydra-refining.septarium') }}</dt>
              <dd>
                <p>
                  {{ $t('s.hydra-refining.septarium.dec1') }}
                </p>
              </dd>
              <dd class="formula">
                <p>{{ $t('s.hydra-refining.septarium.dec2') }}</p>
                <img src="~@/assets/img/desktop/hydra/refining-rep.webp" width="229" />
              </dd>
            </dl>
          </div>
          <div class="caution">
            <dl>
              <dt>{{ $t('t.hydra-teaser.summoning.caution') }}</dt>
              <dd>{{ $t('s.hydra-teaser.summoning.caution') }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import RefiningCalculator from '@/components/coin/common/RefiningCalculator';

export default defineComponent({
  name: 'HydraSummoning',
  components: {
    RefiningCalculator,
  },
  setup() {
    const { hydraSupply } = useState(['hydraSupply']);

    const state = reactive({
      baseDraco: 20,
      coefficient: 0.6,
    });

    const calcFee = (n) => {
      return state.coefficient / (Math.log(n + 1) / Math.log(3.7));
    };

    const sumFee = (n) => {
      if (Number(n) && Number(n) <= 500) {
        return Array.from(Array(Number(n)).keys()).reduce((a, b) => {
          return a + calcFee(b + 1);
        }, 0);
      }
      return 0;
    };

    const hydraStage = computed(() => {
      if (hydraSupply.value && Number(hydraSupply.value.HydraSupply) > 0) {
        return Math.floor(Number(hydraSupply.value.HydraSupply) / 100000) + 1;
      }

      return 1;
    });

    const refiningFee = computed(() => {
      if (state.baseDraco) {
        return state.baseDraco + sumFee(hydraStage.value);
      }
      return 0;
    });

    return {
      ...toRefs(state),
      calcFee,
      sumFee,
      refiningFee,
      hydraSupply,
      hydraStage,
    };
  },
});
</script>


