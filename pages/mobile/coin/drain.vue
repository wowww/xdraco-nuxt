<template>
  <div :class="`drain-${visiblePart}`">
    <drain-part1 v-if="visiblePart === 'part1'" />
    <drain-part2 v-if="visiblePart === 'part2'" />

    <div v-if="visiblePart === 'part1'" class="change-contents-link">
      <div class="change-contents-link__inner">
        <img src="~@/assets/img/desktop/drain-part2/symbol-hydra.webp" class="symbol" alt="HYDRA" />
        <h3 class="title">DRAIN : Be Hydrated</h3>
        <p>DRACO Initiative, Be Hydrated by WEST</p>
      </div>
      <button type="button" class="change-contents-link__link" @click="changeContents('part2', '#header')">Change Contents</button>
    </div>
    <div v-if="visiblePart === 'part2'" class="change-contents-link">
      <div class="change-contents-link__inner">
        <img src="~@/assets/img/desktop/drain-part2/symbol-draco.webp" class="symbol" alt="DRACO" />
        <h3 class="title">DRAIN : Buyback &amp; Burn</h3>
        <p>Our contribution for your satisfaction.</p>
      </div>
      <button type="button" class="change-contents-link__link" @click="changeContents('part1', '#header')">Change Contents</button>
    </div>

    <common-footer />
  </div>
</template>

<script>
import { defineComponent, onUnmounted, onBeforeMount, onMounted, reactive, toRefs } from '@vue/composition-api';
import goTo from 'vuetify/lib/services/goto';

import DrainPart1 from '@/components/coin/mobile/drain/DrainPart1';
import DrainPart2 from '@/components/coin/mobile/drain/DrainPart2';
import CommonFooter from '@/components/coin/Footer';

export default defineComponent({
  components: {
    DrainPart1,
    DrainPart2,
    CommonFooter,
  },
  setup() {
    const state = reactive({
      visiblePart: 'part2',
    });

    const changeContents = (targetContents, targetSelector) => {
      state.visiblePart = targetContents;
      goTo(targetSelector, {});
    };

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-drain');
      });
    });

    onMounted(() => {
      //
    });

    onBeforeMount(() => {

    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-drain');
    });

    return {
      ...toRefs(state),
      changeContents,
    };
  },
});
</script>
