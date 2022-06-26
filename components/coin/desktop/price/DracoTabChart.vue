<template>
  <div class="wrap-chart">
    <h4 class="title">{{ $t('w.price.draco.chart') }}</h4>
    <p v-if="dracoDate" class="date">{{ dracoDate }}</p>
    <!-- Switch Chart -->
    <v-btn-toggle v-model="selectedChart" class="wrap-button-chart common" mandatory borderless>
      <v-btn :value="'usd'">
        <span>USD</span>
      </v-btn>
      <v-btn :value="'wemix'">
        <span>WEMIX</span>
      </v-btn>
    </v-btn-toggle>

    <!-- USD Chart -->
    <div class="chart">
      <draco-chart
        :current-currency="selectedChart"
        field="USDDracoRate"
        currency="USD"
        border-color="rgba(130,0,220,1)"
        bg-color="rgba(130,0,220,0.1)"
      />
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, toRefs, computed} from '@vue/composition-api';
import {useState} from 'vuex-composition-helpers/dist';

import DracoChart from '@/components/coin/common/price/DracoChart';
import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'DracoTabChart',
  components: { DracoChart },
  setup(_, { root }) {
    const { $i18n } = root;
    const state = reactive({
      selectedChart: 'usd',
    });

    const { draco, chartPeriod } = useState(['draco', 'chartPeriod']);

    const dracoDate = computed(() => {
      if (draco.value && draco.value[chartPeriod.value]) {
        const lastEl = draco.value[chartPeriod.value].slice(-1)[0];
        if (!lastEl) {
          return null;
        }

        return root.$t('date.format.decoration', [dateFormatFromString(lastEl.CreatedDT)]);
      }
      return null;
    });

    return {
      ...toRefs(state),
      draco,
      dracoDate,
    };
  },
});
</script>
