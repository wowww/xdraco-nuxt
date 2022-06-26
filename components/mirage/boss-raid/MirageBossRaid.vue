<template>
  <section class="mirage-boss-raid">
    <div class="mirage-boss-raid__header">
      <h2 class="section-tit">{{ $t('t.mirage.boss-raid') }}</h2>
      <p v-if="currentRaid" class="txt-notice">
        Round {{ currentRaid.Battle }}
        <em>{{ $t(`w.mirage.boss-raid.name-type-${currentRaid.RaidType}`) }}</em>
        {{ $t(`w.mirage.boss-raid.type-${currentRaid.RaidType}`).toUpperCase() }}
        is on going Now
      </p>
    </div>
    <div class="mirage-boss-raid__body">
      <mirage-boss-raid-item
        :item="bossRaids.length > 0 && currentRaidType11Idx > -1 ? bossRaids[currentRaidType11Idx] : { RaidType: 11 }"
        :before-item="bossRaids.length > 0 && beforeRaidType11Idx > -1 ? bossRaids[beforeRaidType11Idx] : null"
      />
      <mirage-boss-raid-item
        :item="bossRaids.length > 0 && currentRaidType12Idx > -1 ? bossRaids[currentRaidType12Idx] : { RaidType: 12 }"
        :before-item="bossRaids.length > 0 && beforeRaidType12Idx > -1 ? bossRaids[beforeRaidType12Idx] : null"
      />
    </div>
  </section>
</template>

<script>
import { defineComponent, computed, onMounted } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';

import MirageBossRaidItem from '@/components/mirage/boss-raid/MirageBossRaidItem';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaid',
  components: { MirageBossRaidItem },
  setup() {
    const now = useNow({ interval: 1000 });
    const { useMirageState, useMirageActions } = useMirageStore();
    const { bossRaids } = useMirageState(['bossRaids']);
    const { fetchBossRaidList } = useMirageActions(['fetchBossRaidList']);

    const currentRaid = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs(now.value).unix();
        return bossRaids.value.find((raid) => raid.StartDT <= timestamp && timestamp <= raid.EndDT);
      }

      return null;
    });

    const currentRaidType11Idx = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs(now.value).unix();
        return bossRaids.value.findIndex((raid) => timestamp < raid.EndDT && raid.RaidType === 11);
      }
      return -1;
    });

    const currentRaidType12Idx = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs(now.value).unix();
        return bossRaids.value.findIndex((raid) => timestamp < raid.EndDT && raid.RaidType === 12);
      }
      return -1;
    });

    const beforeRaidType11Idx = computed(() => {
      if (currentRaidType11Idx.value > -1 && currentRaidType11Idx.value - 2 > -1) {
        return currentRaidType11Idx.value - 2;
      }
      return -1;
    });

    const beforeRaidType12Idx = computed(() => {
      if (currentRaidType12Idx.value > -1 && currentRaidType12Idx.value - 2 > -1) {
        return currentRaidType12Idx.value - 2;
      }
      return -1;
    });

    onMounted(() => {
      fetchBossRaidList();
    });

    return {
      bossRaids,
      currentRaid,
      fetchBossRaidList,
      currentRaidType11Idx,
      beforeRaidType11Idx,
      currentRaidType12Idx,
      beforeRaidType12Idx,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-boss-raid';
@import '~@/assets/sass/components/mirage-button';
</style>
