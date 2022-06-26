<template>
  <div v-if="valleyCapture && valleyCapture.schedule" class="mirage-hidden-valley-capture" :class="{ 'is-locked': mirageLock }">
    <div class="valley-header">
      <h2 class="valley-title">{{ $t('t.mirage.valley-capture') }}</h2>
      <div
        v-if="valleyCapture.schedule && valleyCapture.schedule.Daily === '1' && valleyCapture.schedule.Battle === '1' && isMobile"
        class="valley-notice"
      >
        <img src="@/assets/img/common/mirage/ico-40-newseason.webp" class="valley-notice__icon" width="40" alt="" />
        <p class="valley-notice__desc" v-html="$t('t.mirage-notice.season.start')" />
        <span class="valley-notice__date">{{ valleyCapture.schedule.StartDT | dateFormat }}</span>
      </div>
      <dl class="count-down">
        <div>
          <dt>Day</dt>
          <dd>
            <div class="wrap-flip">
              <span class="item-flip">{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(0, 1) }}</span>
              <span class="item-flip">{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(1) }}</span>
            </div>
          </dd>
        </div>
        <div class="half">
          <dt>
            <span class="icon-battle">{{ $t(`w.mirage.${valleyCapture.schedule.Battle}.half`) }}</span>
          </dt>
          <dd>
            <MirageCountdown
              v-if="currentBattleEndDate"
              :target-date="currentBattleEndDate.toString()"
              class="hidden-day hidden-second"
              :smaller="!isMobile"
              :dark="mirageLock"
            />
            <span v-if="mirageLock" class="icon-locked">locked</span>
          </dd>
        </div>
      </dl>
    </div>
    <div
      v-if="valleyCapture.schedule && valleyCapture.schedule.Daily === '1' && valleyCapture.schedule.Battle === '1' && !isMobile"
      class="valley-notice"
    >
      <img src="@/assets/img/common/mirage/ico-40-newseason.webp" class="valley-notice__icon" width="40" alt="" />
      <p class="valley-notice__desc" v-html="$t('t.mirage-notice.season.start')" />
      <span class="valley-notice__date">{{ valleyCapture.schedule.StartDT | dateFormat }}</span>
    </div>
    <div v-if="valleyCapture && valleyCapture.serverInfo" class="valley-content">
      <template v-for="serverIdx in serverList">
        <mirage-valley-server-item
          v-if="valleyCapture.serverInfo[serverIdx]"
          :key="`valley-server-${valleyCapture.serverInfo[serverIdx].ServerID}-${serverIdx}`"
          :server-item="valleyCapture.serverInfo[serverIdx]"
        />
        <div v-else :key="`valley-server-empty-${serverIdx}`" class="server-item empty"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, watch } from '@vue/composition-api';
import dayjs from 'dayjs';
import { range } from 'lodash';
import { useState } from 'vuex-composition-helpers/dist';
import MirageValleyServerItem from '@/components/mirage/MirageValleyServerItem';
import { useMirageStore } from '@/utils/composables/mirage';

import MirageCountdown from '@/components/mirage/MirageCountdown';

export default defineComponent({
  name: 'MirageHiddenValleyCapture',
  components: {
    MirageValleyServerItem,
    MirageCountdown,
  },
  props: {
    isLocked: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(_, { root }) {
    const { $device, $i18n } = root;
    const { accessToken } = useState(['accessToken']);
    const { useMirageState, useMirageGetters, useMirageActions } = useMirageStore();
    const { valleyCapture } = useMirageState(['valleyCapture']);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);
    const { fetchServerInfo, fetchAccountServerInfo } = useMirageActions(['fetchServerInfo', 'fetchAccountServerInfo']);

    const serverList = computed(() => {
      const columnLength = $device.isMobile ? 2 : 4;
      const rest = valleyCapture.value.serverInfo.length % columnLength;
      const total = valleyCapture.value.serverInfo.length + rest;

      if ($device.isMobile) {
        return range(total);
      }

      let cnt = Math.floor(total / 2);
      const remainder = total % 2;

      if (remainder !== 0) {
        cnt += 1;
      }

      return range((cnt === 0 ? 1 : cnt) * 2);
    });

    const currentBattleEndDate = computed(() => {
      if (valleyCapture.value) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).toDate();
      }

      return null;
    });

    const endDateFormatted = computed(() => {
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

    onMounted(() => {
      fetchServerInfo();
    });

    watch(
      () => accessToken.value,
      () => {
        fetchServerInfo();

        if (accessToken.value) {
          fetchAccountServerInfo();
        }
      },
    );

    return {
      valleyCapture,
      currentBattleEndDate,
      endDateFormatted,
      serverList,
      mirageStatus,
      mirageLock,
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
@import '~@/assets/sass/components/mirage-hidden-valley-capture';
</style>
