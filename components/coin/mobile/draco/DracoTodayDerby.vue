<template>
  <v-carousel-item content-class="d-flex justify-center align-center" v-if="derby.data && Array.isArray(derby.data) && derby.data.length > 0">
    <div class="coin" :set="(today = derby.data[derby.data.length - 1])">
      <nuxt-link to="/price">
        <div class="coin__name">
          <div class="name">{{ $t('t.home.derby') }}</div>
        </div>
        <div class="coin__volume">
          <span class="amount">{{ today.DS | currency(0) }}</span>
          <sup class="sup ml-1">DS</sup>
          <span class="change" :class="{ plus: today.BonusYield > 0, minus: today.BonusYield < 0 }">
            <template v-if="today.BonusYield === 0">+{{ today.BonusYield | currency(0) }}</template>
            <template else>+{{ today.BonusYield | currency(0) }}</template>
          </span>
        </div>
        <div class="coin__date">{{ $t('s.smelting-cost.updated') }}</div>
      </nuxt-link>
    </div>
  </v-carousel-item>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useGetters, useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'DracoTodayDerby',
  setup() {
    const { derby } = useState(['derby']);
    const { dracoUsd, dracoUsdChange, dracoDate } = useGetters(['dracoUsd', 'dracoUsdChange', 'dracoDate']);

    return {
      derby,
      dracoUsd,
      dracoUsdChange,
      dracoDate,
    };
  },
});
</script>
