<template>
  <div class="hydra">
    <hydra-main />
    <hydra-youtube-video />
    <hydra-prologue />
    <hydra-chronicles />
    <hydra-dynamics />
    <hydra-spectrums />
    <hydra-defi />
    <hydra-roadmap />
    <hydra-summoning />
    <hydra-refinery />

    <v-carousel v-if="hydraRate" class="float-bottom" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
      <home-usd-hydra />
      <home-wemix-hydra />
      <home-refining-cost />
    </v-carousel>

    <common-footer/>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api';
import { useActions, useState } from 'vuex-composition-helpers/dist';

import HomeRefiningCost from '@/components/coin/mobile/hydra/HomeRefiningCost';
import HomeUsdHydra from '@/components/coin/mobile/hydra/HomeUsdHydra';
import HomeWemixHydra from '@/components/coin/mobile/hydra/HomeWemixHydra';
import HydraChronicles from '@/components/coin/mobile/hydra/HydraChronicles';
import HydraDefi from '@/components/coin/mobile/hydra/HydraDefi';
import HydraDynamics from '@/components/coin/mobile/hydra/HydraDynamics';
import HydraMain from '@/components/coin/mobile/hydra/HydraMain';
import HydraPrologue from '@/components/coin/mobile/hydra/HydraPrologue';
import HydraRoadmap from '@/components/coin/mobile/hydra/HydraRoadmap';
import HydraSpectrums from '@/components/coin/mobile/hydra/HydraSpectrums';
import HydraSummoning from '@/components/coin/mobile/hydra/HydraSummoning';
import HydraRefinery from '@/components/coin/mobile/hydra/HydraRefinery';
import HydraYoutubeVideo from '@/components/coin/mobile/hydra/HydraYoutubeVideo';
import CommonFooter from '@/components/common/Footer';

export default defineComponent({
  components: {
    HomeRefiningCost,
    HomeWemixHydra,
    HomeUsdHydra,
    HydraRefinery,
    HydraSummoning,
    HydraRoadmap,
    HydraDefi,
    HydraSpectrums,
    HydraDynamics,
    HydraChronicles,
    HydraPrologue,
    HydraYoutubeVideo,
    HydraMain,
    CommonFooter,
  },
  setup() {
    const { hydraRate } = useState(['hydraRate']);
    const { fetchHydra, fetchHydraLastest } = useActions(['fetchHydra', 'fetchHydraLastest']);

    onMounted(() => {
      fetchHydra();
      fetchHydraLastest();
    });

    return {
      hydraRate,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
});
</script>
