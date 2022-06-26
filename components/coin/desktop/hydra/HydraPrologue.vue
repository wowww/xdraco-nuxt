<template>
  <section class="section section-prologue">
    <div class="section__inner">
      <div class="wrap-prologue">
        <h3>{{ $t('t.hydra-teaser.prologue') }}</h3>
        <p>{{ $t('s.hydra-teaser.prologue.desc') }}</p>
        <p>{{ $t('s.hydra-teaser.prologue.desc2') }}</p>
        <p>{{ $t('s.hydra-teaser.prologue.desc3') }}</p>
        <p>{{ $t('s.hydra-teaser.prologue.desc4') }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraPrologue',
  setup() {
    const state = reactive({
      stage: null,
      baseDraco: 20,
      coefficient: 0.6,
    });

    const calcFee = (n) => {
      return state.coefficient / (Math.log(n + 1) / Math.log(3.7));
    };

    const sumFee = (n) => {
      return Array.from(Array(Number(n)).keys()).reduce((a, b) => {
        return a + calcFee(b + 1);
      }, 0);
    };

    const refiningFee = computed(() => {
      return state.baseDraco + sumFee(state.stage);
    });

    return {
      ...toRefs(state),
      calcFee,
      sumFee,
      refiningFee,
    };
  },
});
</script>


