<template>
  <div class="drain">
    <div :class="`drain-${drainPart}`">
      <div class="contents">
        <drain-part1 v-if="drainPart === 'part1'"/>
        <drain-part2 v-if="drainPart === 'part2'"/>
      </div>

      <div v-if="drainPart === 'part1'" class="change-contents-link">
        <div class="change-contents-link__inner">
          <img src="~@/assets/img/desktop/drain-part2/symbol-hydra.webp" class="symbol" alt="HYDRA"/>
          <h3 class="title">DRAIN : Be Hydrated</h3>
          <p>DRACO Initiative, Be Hydrated by WEST</p>
        </div>
        <button type="button" class="change-contents-link__link" @click="changeContents('part2', '#header')">Change
          Contents
        </button>
      </div>
      <div v-if="drainPart === 'part2'" class="change-contents-link">
        <div class="change-contents-link__inner">
          <img src="~@/assets/img/desktop/drain-part2/symbol-draco.webp" class="symbol" alt="DRACO"/>
          <h3 class="title">DRAIN : Buyback &amp; Burn</h3>
          <p>Our contribution for your satisfaction.</p>
        </div>
        <button type="button" class="change-contents-link__link" @click="changeContents('part1', '#header')">Change
          Contents
        </button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';
import { useActions, useState } from 'vuex-composition-helpers/dist';

import DrainPart1 from '@/components/coin/desktop/drain/DrainPart1';
import DrainPart2 from '@/components/coin/desktop/drain/DrainPart2';
import Footer from '@/components/coin/Footer';

export default defineComponent({
  components: {Footer, DrainPart2, DrainPart1},
  setup() {
    const {drainPart} = useState(['drainPart']);
    const {fetchDrainPart} = useActions(['fetchDrainPart']);

    const changeContents = (targetContents, targetSelector) => {
      fetchDrainPart({targetContents, targetSelector});
    };

    onBeforeMount(() => {
      //
    });

    onMounted(() => {
      //
    });

    return {
      drainPart,
      changeContents,
    };
  },
});
</script>
