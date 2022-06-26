<template>
  <section class="section">
    <div class="section__inner">
      <draco-tab-chart />

      <!-- Derby Chart -->
      <div class="wrap-chart">
        <h4 class="title">DERBY Chart</h4>
        <p v-if="derbyDate" class="date">{{ derbyDate }}</p>
        <div style="height: 280px; /* sample style */">
          <derby-chart />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import DerbyChart from '@/components/coin/common/price/DerbyChart';
import DracoTabChart from '@/components/coin/desktop/price/DracoTabChart';
import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'PriceChart',
  components: {
    DracoTabChart,
    DerbyChart,
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { derby } = useState(['derby']);

    const derbyDate = computed(() => {
      if (derby.value) {
        const lastEl = derby.value.slice(-1)[0];

        if (!lastEl) {
          return null;
        }

        return $i18n && root.$t('date.format.decoration', [dateFormatFromString(`${lastEl.CreatedDate} 00:00:00`, 'UTC+8')]);
      }
      return null;
    });

    return {
      derby,
      derbyDate,
    };
  },
});
</script>
