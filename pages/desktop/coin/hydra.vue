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

    <div class="float-bottom">
      <v-carousel v-if="true" height="auto" class="part" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <wemix-hydra />
        </v-carousel-item>
        <v-carousel-item>
          <usd-hydra />
        </v-carousel-item>
        <v-carousel-item>
          <wemix-hydra />
        </v-carousel-item>
        <v-carousel-item>
          <usd-hydra />
        </v-carousel-item>
      </v-carousel>

      <hydra-refining-cost class="part" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';

import HydraRefiningCost from '@/components/coin/common/HydraRefiningCost';
import HydraChronicles from '@/components/coin/desktop/hydra/HydraChronicles';
import HydraDefi from '@/components/coin/desktop/hydra/HydraDefi';
import HydraDynamics from '@/components/coin/desktop/hydra/HydraDynamics';
import HydraMain from '@/components/coin/desktop/hydra/HydraMain';
import HydraPrologue from '@/components/coin/desktop/hydra/HydraPrologue';
import HydraRefinery from '@/components/coin/desktop/hydra/HydraRefinery';
import HydraRoadmap from '@/components/coin/desktop/hydra/HydraRoadmap';
import HydraSpectrums from '@/components/coin/desktop/hydra/HydraSpectrums';
import HydraSummoning from '@/components/coin/desktop/hydra/HydraSummoning';
import HydraYoutubeVideo from '@/components/coin/desktop/hydra/HydraYoutubeVideo';
import UsdHydra from '@/components/coin/desktop/hydra/UsdHydra';
import WemixHydra from '@/components/coin/desktop/hydra/WemixHydra';
import Footer from '@/components/coin/Footer';

export default defineComponent({
  components: {
    Footer,
    HydraMain,
    HydraYoutubeVideo,
    HydraPrologue,
    HydraChronicles,
    HydraDynamics,
    HydraSpectrums,
    HydraDefi,
    HydraRoadmap,
    HydraSummoning,
    HydraRefinery,
    HydraRefiningCost,
    UsdHydra,
    WemixHydra,
  },
  setup() {
    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-intro-hydra');
      }, 1500);
    });

    onMounted(() => {
      document.documentElement.classList.remove('init-intro-hydra');
    });
  },
});
</script>
