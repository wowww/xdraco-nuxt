<template>
  <div class="boss-raid-detail">
    <div class="wrap-my-mirage">
      <div class="util-list">
        <back-button />
        <mirage-inventory />
      </div>
    </div>
    <mirage-boss-raid-info />
    <hr />
    <template v-if="bossRaidStatus.locked || bossRaidStatus.closed">
      <mirage-boss-raid-result />
      <hr />
    </template>

    <mirage-boss-raid-squadron />
    <hr />

    <mirage-boss-raid-latest-result />
    <h2 class="section-title">Battle Report</h2>
    <mirage-boss-raid-battle-report />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, reactive, toRefs, watch } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import BackButton from '@/components/common/BackButton';
import MirageBossRaidBattleReport from '@/components/mirage/boss-raid/MirageBossRaidBattleReport';
import MirageBossRaidInfo from '@/components/mirage/boss-raid/MirageBossRaidInfo';
import MirageBossRaidLatestResult from '@/components/mirage/boss-raid/MirageBossRaidLatestResult';
import MirageBossRaidResult from '@/components/mirage/boss-raid/MirageBossRaidResult';
import MirageBossRaidSquadron from '@/components/mirage/boss-raid/MirageBossRaidSquadron';
import MirageInventory from '@/components/mirage/common/MirageInventory';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  components: {
    MirageBossRaidLatestResult,
    MirageInventory,
    MirageBossRaidBattleReport,
    MirageBossRaidSquadron,
    MirageBossRaidResult,
    MirageBossRaidInfo,
    BackButton,
  },
  layout: 'desktop/mirage',
  setup(props, { root }) {
    const { $route } = root;
    const serverId = $route.params.id;
    const state = reactive({
      visibleItemDialog: false,
    });
    const { accessToken } = useState(['accessToken']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { bossRaid, bossRaids } = useMirageState(['bossRaid', 'bossRaids']);
    const { bossRaidStatus } = useMirageGetters(['bossRaidStatus']);
    const { setBossRaid } = useMirageMutations(['setBossRaid']);
    const { fetchBossRaid } = useMirageActions(['fetchBossRaid']);

    const schedule = computed(() => {
      if (!bossRaid.value) {
        return null;
      }

      return bossRaid.value.schedule[0];
    });

    onMounted(() => {
      if (!accessToken.value) {
        root.$router.replace('/mirage');
      }
      if (serverId) {
        fetchBossRaid(serverId);
      }
    });

    watch(
      () => accessToken.value,
      () => {
        if (!accessToken.value) {
          root.$router.replace('/mirage');
        }
      },
    );

    watch(
      () => serverId,
      () => {
        fetchBossRaid(serverId);
      },
    );

    onUnmounted(() => {
      setBossRaid(null);
    });

    return {
      bossRaid,
      ...toRefs(state),
      bossRaidStatus,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/mirage-list';
@import '~@/assets/sass/common/pages/mirage/boss-raid-detail';
</style>
