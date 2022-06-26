<template>
  <div>
    <div class="wrap-my-mirage">
      <div class="util-list">
        <div v-if="accountInfo" class="mirage-inventory mobile">
          <span class="currency">
            <img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" height="20" alt="darksteel" />
            <em class="volume">{{ accountInfo.BlackIronAmount | currency(0) }}</em>
          </span>
          <span class="currency">
            <img src="@/assets/img/common/mirage/ico-20-septaria.webp" width="20" height="20" alt="septaria" />
            <em class="volume">{{ accountInfo.SeptariaAmount | currency(0) }}</em>
          </span>
          <span class="currency">
            <img src="@/assets/img/common/mirage/ico-20-energy.webp" width="20" height="20" alt="energy" />
            <em class="volume">{{ accountInfo.VigorAmount | currency(0) }}</em>
            <button type="button" class="btn-charge" @click="openChargeVigor">Charge</button>
          </span>
        </div>
      </div>
    </div>
    <mirage-valley-info v-if="serverInfo" :server-info="serverInfo" :closed="mirageLock" />
    <div class="mirage-hidden-valley-play">
      <v-expansion-panels v-model="panel" class="playnow-wrap" accordion multiple>
        <mirage-valley-item :server-info="serverInfo" valley-type="3" :closed="mirageLock" />
        <mirage-valley-item :server-info="serverInfo" valley-type="2" :closed="mirageLock" />
        <mirage-valley-item :server-info="serverInfo" valley-type="1" :closed="mirageLock" />
      </v-expansion-panels>
      <mirage-valley-result :closed="mirageLock" />
    </div>
    <h2 v-if="logList && logList.length > 0" class="section-title" style="margin: 16px">Battle Report</h2>
    <mirage-battle-report />
    <modal-enlist-character />
    <modal-enlist-result />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { useMutations, useState } from 'vuex-composition-helpers/dist';
import MirageBattleReport from '@/components/mirage/MirageBattleReport';
import MirageValleyInfo from '@/components/mirage/MirageValleyInfo';
import MirageValleyItem from '@/components/mirage/MirageValleyItem';
import MirageValleyResult from '@/components/mirage/MirageValleyResult';
import ModalEnlistCharacter from '@/components/mirage/ModalEnlistCharacter';
import ModalEnlistResult from '@/components/mirage/ModalEnlistResult';
import { useMirageStore } from '@/composables/mirage';

export default defineComponent({
  name: 'MirageValleyPage',
  components: {
    ModalEnlistResult,
    MirageBattleReport,
    MirageValleyResult,
    ModalEnlistCharacter,
    MirageValleyItem,
    MirageValleyInfo,
  },
  setup(_, { root }) {
    const now = useNow({ interval: 1000 });
    const { $route, $router, $i18n } = root;
    const { useMirageState, useMirageMutations, useMirageActions, useMirageGetters } = useMirageStore();
    const { accessToken } = useState(['accessToken']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { valleyResult } = useMirageState(['valleyResult']);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);

    const { accountInfo, stakeInfo, valleyList, valleyCapture, logList } = useMirageState([
      'accountInfo',
      'stakeInfo',
      'valleyList',
      'valleyCapture',
      'logList',
    ]);
    const { setVisibleChargeVigor } = useMirageMutations(['setVisibleChargeVigor']);
    const { fetchAccountInfo, fetchStakeInfo, fetchLastResult, fetchRank, fetchLog } = useMirageActions([
      'fetchAccountInfo',
      'fetchStakeInfo',
      'fetchLastResult',
      'fetchRank',
      'fetchLog',
    ]);

    const state = reactive({
      loading: false,
      valleyMeta: null,
      valleyList: [],
      panel: [0, 1, 2],
    });

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    const serverInfo = computed(() => {
      if (valleyCapture.value && valleyCapture.value.serverInfo) {
        return valleyCapture.value.serverInfo.find((item) => item.ServerID === $route.params.id);
      }

      return null;
    });

    onMounted(() => {
      if (!accessToken.value) {
        root.$router.replace('/mirage/dashboard');
        return;
      }

      fetchAccountInfo();
      fetchStakeInfo($route.params.id);
      fetchLastResult($route.params.id);
      fetchRank($route.params.id);
      fetchLog($route.params.id);
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
      const diff = nowDay.value.diff(endDay.value, 'minute');

      if (diff === 0) {
        // fetchStakeInfo($route.params.serverId);
      }

      return diff;
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    const openChargeVigor = () => {
      if (closed.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.vigor'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      setVisibleChargeVigor(true);
    };

    watch(
      () => accessToken.value,
      () => {
        if (!accessToken.value) {
          $router.replace('/mirage');
        }
      },
    );

    return {
      serverInfo,
      ...toRefs(state),
      valleyResult,
      accountInfo,
      stakeInfo,
      logList,
      valleyList,
      startDay,
      endDay,
      nowDay,
      startDiff,
      closedDiff,
      closed,
      setVisibleChargeVigor,
      openChargeVigor,
      mirageStatus,
      mirageLock,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/play';
@import '~@/assets/sass/components/mirage-hidden-valley-capture';
@import '~@/assets/sass/components/mirage-hidden-valley-play';
</style>
