<template>
  <!-- 차트 영역 -->
  <section class="section">
    <div class="description">
      <h4 class="title mt-0">{{ $t('w.price.draco.chart') }}</h4>
      <p v-if="dracoDate" class="date">{{ dracoDate }}</p>
    </div>
    <draco-tab-chart />
    <!-- Derby -->
    <div class="description">
      <h4 class="title">DERBY Chart</h4>
      <p v-if="derbyDate" class="date">{{ derbyDate }}</p>
    </div>
    <div class="no-gutter">
      <div class="wrap-chart">
        <derby-chart />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import DerbyChart from '@/components/coin/common/price/DerbyChart';
import DracoTabChart from '@/components/coin/mobile/price/DracoTabChart';
import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'PriceChart',
  components: {
    DerbyChart,
    DracoTabChart,
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { draco, derby, chartPeriod } = useState(['draco', 'derby', 'chartPeriod']);

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

    const derbyDate = computed(() => {
      if (derby.value) {
        const lastEl = derby.value.slice(-1)[0];

        if (!lastEl) {
          return null;
        }

        return root.$t('date.format.decoration', [dateFormatFromString(`${lastEl.CreatedDate} 00:00:00`, 'UTC+8')]);
      }
      return null;
    });

    return {
      draco,
      derby,
      chartPeriod,
      dracoDate,
      derbyDate,
    };
  },
});
</script>
