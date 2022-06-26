<template>
  <div class="mirage-valley-dashboard" :class="{ 'is-locked': closed }">
    <h2 class="dashboard-title">{{ serverInfo.ServerName }}</h2>
    <div class="dashboard-header">
      <dl class="dashboard-count-down">
        <div v-if="valleyCapture">
          <dt>Day</dt>
          <dd>
            <div class="wrap-flip">
              <span class="item-flip">{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(0, 1) }}</span>
              <span class="item-flip">{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(1) }}</span>
            </div>
          </dd>
        </div>
        <div v-if="valleyCapture" class="half">
          <dt>
            <span class="icon-battle">
              {{ $t(`w.mirage.${valleyCapture.schedule.Battle}.half`) }}
            </span>
          </dt>
          <dd>
            <mirage-countdown v-if="endDate" :target-date="endDate.toString()" :dark="closed" class="hidden-day" />
          </dd>
        </div>
      </dl>
      <div v-if="valleyCapture" class="dashboard-info">
        <p v-if="closed" class="desc ico-locked">
          {{ $t('s.mirage.date.locked', [lockEndDateFormatted]) }}
        </p>
        <p v-else class="desc">{{ $t('s.mirage.date.in-calc', [endDateFormatted]) }}</p>
        <v-tooltip content-class="mirage-tooltip" attach=".dashboard-info" top max-width="240">
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">icon</v-icon>
          </template>
          <div class="tooltip-wrap">
            <p>{{ $t('s.mirage.message.lock') }}</p>
          </div>
        </v-tooltip>
      </div>
    </div>
    <div v-if="stakeInfo" class="dashboard-content">
      <dl v-if="stakeInfo.Valley && stakeInfo.Valley.Sum" class="dashboard-data">
        <div>
          <dt>{{ $t('w.mirage.total.minting.rate') }}</dt>
          <dd>
            <em class="value">{{ miningRate | currency(2) }}<span class="decimal">%</span></em>
          </dd>
        </div>
        <div>
          <dt>{{ $t('w.mirage.total.ds.mined') }}</dt>
          <dd>
            <em class="value darksteel"
              ><img src="@/assets/img/common/mirage/ico-24-darksteel.webp" width="24" />{{ stakeInfo.Valley.Sum.Info.BlackIron | currency(0) }}</em
            >
          </dd>
        </div>
        <div>
          <dt>{{ $t('w.mirage.total.septaria') }}</dt>
          <dd>
            <em class="value septaria"
              ><img src="@/assets/img/common/mirage/ico-24-septaria.webp" width="24" />{{ stakeInfo.Valley.Sum.Info.Septaria }}</em
            >
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MirageCountdown from '@/components/mirage/MirageCountdown';

const { useState: useMirageState } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageValleyInfo',
  components: { MirageCountdown },
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
    serverInfo: {
      type: Object,
      default: () => ({
        ServerName: '',
      }),
    },
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { valleyCapture, valleyList, stakeInfo } = useMirageState(['valleyCapture', 'valleyList', 'stakeInfo']);

    const endDate = computed(() => {
      if (valleyCapture.value) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).toDate();
      }

      return null;
    });

    const endDateFormatted = computed(() => {
      if (valleyCapture.value) {
        const endDay = dayjs.unix(valleyCapture.value.schedule.EndDT);
        return endDay.locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale).format('lll');
      }
      return '';
    });

    const lockEndDateFormatted = computed(() => {
      if (valleyCapture.value) {
        const now = dayjs();
        const startDay = dayjs.unix(valleyCapture.value.schedule.StartDT);
        const endDay = dayjs.unix(valleyCapture.value.schedule.EndDT);

        if (endDay.diff(now, 'm') < 60) {
          return endDay
            .add(1, 'hour')
            .locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale)
            .format('lll');
        }

        if (now.diff(startDay, 'm') < 60) {
          return startDay
            .add(1, 'hour')
            .locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale)
            .format('lll');
        }
      }
      return '';
    });

    const miningRate = computed(() => {
      if (stakeInfo.value) {
        return new BigNumber(stakeInfo.value.Valley.Sum.Info.BlackIron).div(new BigNumber(75000000).times(3)).toNumber() * 100;
      }
      return 0;
    });

    return {
      valleyCapture,
      valleyList,
      stakeInfo,
      endDate,
      endDateFormatted,
      lockEndDateFormatted,
      miningRate,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-valley-dashboard';
</style>
