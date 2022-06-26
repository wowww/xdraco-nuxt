<template>
  <div class="section-wrapper">
    <div class="section-title-bar">
      <h2 class="section-title">{{ $t('t.mirage.dashboard') }}</h2>
      <div v-if="accessToken" class="mirage-inventory-roster">
        <div class="roster-item">
          <!--          <span class="roster-title">Enlisted</span>-->
          <img src="@/assets/img/common/mirage/logo-20-mirage.webp" width="20" height="20" alt="mirage" />
          <span class="volume"
          >{{ enlisted }}<span class="max-volume"> / {{ rosters.length }}</span></span
          >
        </div>
        <div class="roster-item">
          <!--          <span class="roster-title">Wounded</span>-->
          <img src="@/assets/img/common/mirage/ico-20-damage.webp" width="20" height="20" alt="wound" />
          <span class="volume">{{ wounded }}</span>
        </div>
        <div class="roster-item">
          <nuxt-link class="link-roster" to="/mirage/my">Roster</nuxt-link>
        </div>
      </div>
    </div>

    <mirage-summary v-if="accessToken" :closed="mirageLock" />
    <mirage-hidden-valley-capture />
    <mirage-boss-raid />
    <hr />
    <h2 class="section-title" style="margin-top: 24px">MIRAGE Log</h2>
    <div v-if="allLogList && allLogList.length > 0" class="mirage-battle-report">
      <ul class="list-report">
        <mirage-log-item v-for="(log, idx) in logList" :key="`mirage-log-item-${idx}-${log.LogDT}`" :log="log" />
      </ul>
      <div v-if="hasMoreLog" class="wrap-button">
        <div class="btn-viewmore" style="cursor: pointer" @click="logViewLimit += 10">View More</div>
      </div>
    </div>
    <div v-else-if="mirageLock" class="mirage-hidden-valley-play">
      <div class="result disabled">
        <div class="result-contents">
          <p>
            <span>{{ $t('s.mirage.lock-up.log') }}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="false" class="wrap-my-mirage">
      <div class="list-bar">
        <h2 class="section-title">{{ $t('t.mirage.recommend.ntfs') }}</h2>
        <nuxt-link to="/nft/list" class="list-bar__more">{{ $t('w.rounds.view.more') }}</nuxt-link>
      </div>
      <ul
        class="list-my-mirage recommend"
        :data-empty-message="recommendedItems.list && recommendedItems.list.length > 0 ? '' : $t('s.nft.empty.sales')"
      >
        <nft-item v-for="item in recommendedItems.list" :key="`nft-recommended-item-${item.seq || item.info.seq}`" :item="item" use-link size="xs" />
      </ul>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, onUnmounted, reactive, toRefs, watch} from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';
import MirageBossRaid from '@/components/mirage/boss-raid/MirageBossRaid';
import MirageHiddenValleyCapture from '@/components/mirage/MirageHiddenValleyCapture';
import MirageLogItem from '@/components/mirage/MirageLogItem';
import MirageSummary from '@/components/mirage/MirageSummary';
import NftItem from '@/components/nft/common/NftItem';
import { useMirageStore } from '@/composables/mirage';

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

export default defineComponent({
  components: {
    MirageLogItem,
    NftItem,
    MirageBossRaid,
    MirageSummary,
    MirageHiddenValleyCapture,
  },
  setup(_, { root }) {
    const now = useNow({ interval: 1000 });
    const state = reactive({
      test: '',
      logViewLimit: 10,
    });

    const { accessToken } = useState(['accessToken']);
    const { useMirageState, useMirageGetters, useMirageActions } = useMirageStore();
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);
    const { accountInfo, stakeInfo, valleyList, valleyCapture, allLogList, bossRaids, rosters } = useMirageState([
      'accountInfo',
      'stakeInfo',
      'valleyList',
      'valleyCapture',
      'allLogList',
      'bossRaids',
      'rosters',
    ]);
    const { fetchAccountInfo, fetchStakeInfo, fetchLastResult, fetchRank, fetchLog, fetchAllLog, fetchBossRaidList, fetchMyCharacters } =
      useMirageActions([
        'fetchAccountInfo',
        'fetchStakeInfo',
        'fetchLastResult',
        'fetchRank',
        'fetchLog',
        'fetchAllLog',
        'fetchBossRaidList',
        'fetchMyCharacters',
      ]);
    const { recommendedItems } = useNftState(['recommendedItems']);
    const { fetchNftRecommendedItems } = useNftActions(['fetchNftRecommendedItems']);

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    onMounted(() => {
      fetchNftRecommendedItems();
      fetchAllLog();
      fetchBossRaidList();
      fetchMyCharacters();
      setTimeout(() => {
        document.documentElement.classList.add('init-mirage-dashboard');
      }, 10);
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-mirage-dashboard');
    });

    const startDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.StartDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const endDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const nowDay = computed(() => {
      return dayjs(now.value).utcOffset(8, false);
    });

    const startDiff = computed(() => {
      return nowDay.value.diff(startDay.value, 'minute');
    });

    const closedDiff = computed(() => {
      return nowDay.value.diff(endDay.value, 'minute');
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    watch(
      () => accessToken.value,
      () => {
        if (accessToken.value) {
          fetchAccountInfo();
        }
      },
    );

    const logList = computed(() => {
      return allLogList.value.filter((item, idx) => idx < state.logViewLimit);
    });

    const hasMoreLog = computed(() => {
      return state.logViewLimit < allLogList.value.length;
    });

    const futureEunSilRaids = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs().unix();
        return bossRaids.value.filter((raid) => timestamp < raid.StartDT && raid.RaidType === 11);
      }

      return [];
    });

    const futureHorangRaids = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs().unix();
        return bossRaids.value.filter((raid) => timestamp < raid.StartDT && raid.RaidType === 12);
      }

      return [];
    });

    const enlisted = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => roster.DetailType !== '0').length;
      }

      return 0;
    });

    const wounded = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => Number(roster.State) > 1).length;
      }

      return 0;
    });

    return {
      ...toRefs(state),
      recommendedItems,
      closed,
      accessToken,
      allLogList,
      logList,
      hasMoreLog,
      bossRaids,
      futureEunSilRaids,
      futureHorangRaids,
      rosters,
      enlisted,
      wounded,
      mirageStatus,
      mirageLock,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/mirage-list';
@import '~@/assets/sass/components/mirage-battle-report';
@import '~@/assets/sass/components/mirage-hidden-valley-play';

.is-mobile.init-mirage-dashboard {
  .mirage {
    .section {
      width: 100% !important;
      margin: 0 !important;
    }
  }
}

</style>
