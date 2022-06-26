<template>
  <div class="wrap-boss" :data-raid-type="`${current.RaidType}`">
    <div class="boss-header">
      <div class="info-boss" v-html="$t(`t.mirage.boss-raid.type-${current.RaidType}`)"></div>
      <div v-if="current.Battle" class="info-round">
        ROUND<em class="round-num">{{ current.Battle }}</em>
      </div>
    </div>
    <div class="boss-bottom">
      <div v-if="status === 'ongoing' || status === 'locked'" class="info-entry">
        <div class="info-time" :class="{ 'is--locked': mirageLock || status === 'locked' }">
          <div class="info-time-msg">
            <p v-if="status === 'locked'">Lock-up in effect</p>
            <p v-else>Recruiting Raiders now</p>
          </div>
          <mirage-boss-raid-count-down
            class="hidden-day hidden-second"
            :target-date="endDay.toDate().toString()"
            :smaller="!isMobile"
            theme-purple
            :dark="mirageLock || status === 'locked'"
          />
          <span v-if="mirageLock || status === 'locked'" class="icon-locked">locked</span>
        </div>
        <div class="btn btn-sm btn-mirage btn-bid" @click="goRaidPage">ENTER</div>
      </div>
      <div v-else-if="beforeItem" class="info-entry">
        <div class="info-time is--locked">
          <div class="info-time-msg">
            <p style="width: 100%; text-align: center" v-html="$t(`s.mirage.boss-raid.type-${item.RaidType}.return`, [startDay.format('lll')])"></p>
          </div>
          <span v-if="mirageLock || status === 'locked'" class="icon-locked">locked</span>
        </div>
        <div class="btn btn-sm btn-mirage" @click="goRaidPage">BOSS DEFEATED</div>
      </div>
      <div v-else class="box-toast">
        <span class="toast-date">Next round will start on {{ startDay.format('lll') }}</span>
        <span class="toast-msg" v-html="$t(`s.mirage.boss-raid.type-${item.RaidType}.return`, [startDay.format('lll')])"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onUnmounted } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { useState } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';
import MirageBossRaidCountDown from '@/components/mirage/boss-raid/MirageBossRaidCountDown';
import { useMirageStore } from '@/utils/composables/mirage';
import { useWemixLogin } from '@/utils/composables/round';

export default defineComponent({
  name: 'MirageBossRaidItem',
  components: { MirageBossRaidCountDown },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    beforeItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const now = useNow({ interval: 1000 });

    const { wemixLogin } = useWemixLogin(root);

    const { accessToken } = useState(['accessToken']);
    const { useMirageGetters } = useMirageStore();
    const { mirageLock } = useMirageGetters(['mirageLock']);

    const nowDay = computed(() => dayjs(now.value));

    const current = computed(() => {
      if (!props.item && props.beforeItem) {
        return props.beforeItem;
      }

      if (!props.beforeItem && props.item) {
        return props.item;
      }

      if (nowDay.value.unix() < dayjs.unix(props.item.StartDT).unix()) {
        return props.beforeItem;
      }

      return props.item;
    });

    const startDay = computed(() => {
      if (current.value) {
        return dayjs.unix(current.value.StartDT);
      }

      return nowDay.value;
    });

    const endDay = computed(() => {
      if (current.value) {
        return dayjs.unix(current.value.EndDT);
      }

      return nowDay.value;
    });

    const status = computed(() => {
      if (!current.value) {
        return 'closed';
      }

      if (startDay.value.unix() <= nowDay.value.unix() && nowDay.value.unix() <= endDay.value.unix()) {
        if (endDay.value.unix() - nowDay.value.unix() < 3600) {
          return 'locked';
        }
        return 'ongoing';
      }

      return 'ready';
    });

    const goRaidPage = () => {
      if (!accessToken.value) {
        wemixLogin();
        return;
      }

      root.$router.push(`/mirage/boss-raid/${current.value.ScheduleUID}`);
    };

    return {
      now,
      current,
      nowDay,
      startDay,
      endDay,
      status,
      goRaidPage,
      mirageLock,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
