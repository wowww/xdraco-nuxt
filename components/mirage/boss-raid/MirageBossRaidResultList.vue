<template>
  <div class="mirage-result-list" :class="{ 'is-battle': bossRaidStatus.locked }">
    <div v-if="!isMobile" class="list-header">
      <div class="col-rank">Rank</div>
      <div class="col-score">MIRAGE Score</div>
      <div class="col-price">Bid Registered</div>
      <template v-if="bossRaidStatus.locked">
        <div class="col-battle"></div>
      </template>
      <template v-else>
        <div class="col-wound">Wound Status</div>
        <div class="col-reward">Treasures & Rewards</div>
      </template>
    </div>
    <ul class="list-raid-result">
      <li
        v-for="(item, idx) in items"
        :key="`${item.CharacterUID}-${idx}`"
        :data-character-class="item.Class"
        :data-damage-type="item.damage"
        :class="{ 'is-highlight': !isMyRanking && roasterUids.includes(item.CharacterUID) }"
      >
        <div class="col-rank">
          <span class="rank">{{ isMyRanking ? item.Rangking : `${idx + 1}` }}</span>
          <span class="name">{{ item.CharacterName }}</span>
        </div>
        <div class="col-score">
          <span class="col-title">MIRAGE Score</span>
          <span class="mirage-score">{{ item.MirageScore | currency(0) }}</span>
        </div>
        <div class="col-price">
          <span class="col-title">Bid price</span>
          <div class="wrap-price-value">
            <span class="price-vigor">{{ item.TotalBidPrice | currency(0) }}</span>
            <span v-if="Number(item.Ranking) <= 10" class="bid-rank">
              <template v-if="item.Ranking == 1">1st</template>
              <template v-else-if="item.Ranking == 2">2nd</template>
              <template v-else-if="item.Ranking == 3">3rd</template>
              <template v-else>{{ item.Ranking }}th</template>
            </span>
            <span v-if="Number(item.Ranking) <= 10" class="txt-buff"
              >Loot chance buff
              <em>
                <template v-if="item.Ranking == 1">30%</template>
                <template v-else-if="item.Ranking == 2">27%</template>
                <template v-else-if="item.Ranking == 3">24%</template>
                <template v-else-if="item.Ranking == 4">21%</template>
                <template v-else-if="item.Ranking == 5">18%</template>
                <template v-else-if="item.Ranking == 6">15%</template>
                <template v-else-if="item.Ranking == 7">12%</template>
                <template v-else-if="item.Ranking == 8">9%</template>
                <template v-else-if="item.Ranking == 9">6%</template>
                <template v-else-if="item.Ranking == 10">3%</template>
              </em></span
            >
          </div>
        </div>
        <template v-if="bossRaidStatus.locked">
          <div class="col-battle"><img src="@/assets/img/common/mirage/ico-40-battle.webp" width="20" alt="" />IN Battle</div>
        </template>
        <template v-else>
          <div v-if="item.WoundType === '3'" class="col-wound">
            <span class="col-title">Wound</span>
            <span class="damaged"><img src="@/assets/img/common/mirage/ico-24-damage.webp" width="24" alt="" />Wounded</span>
          </div>
          <div v-else-if="item.WoundType === '7'" class="col-wound">
            <span class="col-title">Wound</span>
            <span class="damaged"><img src="@/assets/img/common/mirage/ico-24-damage.webp" width="24" alt="" />Seriously Wounded</span>
          </div>
          <div v-else-if="item.WoundType === '14'" class="col-wound">
            <span class="col-title">Wound</span>
            <span class="damaged"><img src="@/assets/img/common/mirage/ico-24-damage.webp" width="24" alt="" />Critically Wounded</span>
          </div>
          <div v-else class="col-wound">
            <span class="col-title">Wound</span>
            <span class="damaged">-</span>
          </div>
          <div class="col-reward">
            <span class="col-title">Reward</span>
            <mirage-boss-raid-reward-item
              v-for="(reward, rewardIdx) in item.RewardItemInfos"
              :key="`${item.CharacterUID}-${idx}-${rewardIdx}`"
              :item-idx="reward.RewardItemIdx"
              hide-label
            />
          </div>
        </template>
      </li>
    </ul>
    <v-dialog v-model="dialogItemCard" content-class="dialog-card">
      <v-card>
        <Card item-type="epic"></Card>
        <button type="button" class="btn-close-dialog" @click="dialogItemCard = false">Close Dialog</button>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch, computed } from '@vue/composition-api';
import MobileDetect from 'mobile-detect';

import Card from '@/components-ui/common/Card';
import MirageBossRaidRewardItem from '@/components/mirage/boss-raid/MirageBossRaidRewardItem';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaidResultList',
  components: {
    MirageBossRaidRewardItem,
    Card,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isMyRanking: {
      type: Boolean,
      default: false,
    },
  },
  setup({ item }, { root }) {
    const { $dracoWebApi } = root;
    const state = reactive({
      resultItems: [],
    });

    const { useMirageState, useMirageGetters } = useMirageStore();
    const { rosters } = useMirageState(['rosters']);
    const { bossRaidStatus } = useMirageGetters(['bossRaidStatus']);

    // const fetchResult = () => {
    //   if (!item || !item.ScheduleUID) {
    //     return;
    //   }
    //   $axios.get('/api/draco-web/bossraid/result', { params: { scheduleUID: item.ScheduleUID, raidType: item.RaidType } }).then((data) => {
    //     if (data.code === 200) {
    //       console.log(data.data.ranking.slice(0, 10));
    //       state.resultItems = data.data.ranking ? data.data.ranking.slice(10) : [];
    //     }
    //   });
    // };

    const roasterUids = computed(() => {
      if (rosters.value) {
        return rosters.value.map((roster) => roster.CharacterUID);
      }

      return [];
    });

    // watch(
    //   () => item,
    //   () => {
    //     fetchResult();
    //   },
    // );
    //
    // onMounted(() => {
    //   fetchResult();
    // });

    return {
      item,
      ...toRefs(state),
      bossRaidStatus,
      rosters,
      roasterUids,
    };
  },
  data: () => ({
    dialogItemCard: false,
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  methods: {
    openItemCard() {
      this.dialogItemCard = true;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-result-list';
</style>
