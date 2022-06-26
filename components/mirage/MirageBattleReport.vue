<template>
  <div class="mirage-battle-report">
    <ul class="list-report">
      <mirage-battle-report-item v-for="(log, idx) in viewLogList" :key="`mbri-${log.LogType}-${log.LogDT}-${idx}`" :log="log" />
    </ul>
    <div v-if="hasMoreLog" class="wrap-button">
      <div class="btn-viewmore" style="cursor: pointer" @click="logViewLimit += pageSize">View More</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MirageBattleReportItem from '@/components/mirage/MirageBattleReportItem';

const { useState: useMirageState } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageBattleReport',
  components: { MirageBattleReportItem },
  setup(_, { root }) {
    const { $device } = root;
    const pageSize = $device.isMobile ? 10 : 20;
    const state = reactive({
      logViewLimit: $device.isMobile ? 10 : 20,
    });

    const { logList } = useMirageState(['logList']);

    const viewLogList = computed(() => {
      return logList.value.filter((item, idx) => idx < state.logViewLimit);
    });

    const hasMoreLog = computed(() => {
      return state.logViewLimit < logList.value.length;
    });

    return {
      logList,
      viewLogList,
      ...toRefs(state),
      hasMoreLog,
      pageSize,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-battle-report';
</style>
