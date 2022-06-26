<template>
  <v-dialog attach="#contents" content-class="dialog-mirage dialog-mirage-captureresult" :value="visibleRanking" :fullscreen="isMobile" persistent>
    <div v-if="valleyRank" class="content">
      <div class="dialog-header">
        {{ $t('t.mirage.valley.result') }}
        <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleRanking(false)" />
      </div>
      <div class="valley valley-type1">
        <div class="name">Valley</div>
        <div class="info-wrap">
          <div class="info">
            <p class="day">Day {{ valleyRank.schedule.Daily }} /</p>
            <p class="half">
              {{ $t(`w.mirage.${valleyRank.schedule.Battle}.half`) }}
            </p>
          </div>
        </div>
        <p class="date">{{ valleyRank.schedule.EndDT | dateFormat }}</p>
      </div>
      <div class="desc-wrap">
        <div class="desc-inner">
          <p class="desc-title">Total Rank Bonus Draksteels</p>
          <p class="desc-info">{{ $t('s.mirage.message.ranking-bonus') }}</p>
        </div>
        <div class="bonus">
          <p class="bonus-left">Total Darksteel Ranking Bonus</p>
          <p class="bonus-right">
            <img src="@/assets/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />{{ valleyRank.TotalBonusAmount | currency(0) }}
          </p>
        </div>
      </div>
      <div v-if="valleyRank" class="result-content">
        <div class="char-wrap">
          <ul class="char-list">
            <li v-for="(rankItem, rankItemIdx) in rankList" :key="`mirage-rank-${rankItemIdx}`">
              <mirage-rank-character-item
                v-if="rankItemIdx < 50"
                :key="`mirage-rank-character-${rankItemIdx}-${rankItem.CharacterUID}`"
                :character="{
                  ...rankItem,
                  State: MirageCharacterState.READY,
                }"
                :current-rank="Number(rankItem.Ranking)"
                :rank-change="Number(rankItem.RankChange || 0)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';
import MirageRankCharacterItem from '@/components/mirage/MirageRankCharacterItem';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalMirageRanking',
  components: { MirageRankCharacterItem },
  setup() {
    const { visibleRanking, valleyRank } = useMirageState(['visibleRanking', 'valleyRank']);
    const { setVisibleRanking } = useMirageMutations(['setVisibleRanking']);

    return {
      MirageCharacterState,
      visibleRanking,
      setVisibleRanking,
      valleyRank,
    };
  },
  computed: {
    rankList() {
      const valleyRank = this.$store.state.mirage.valleyRank;
      const data = valleyRank && valleyRank.Rank ? valleyRank.Rank.slice() : [];
      return data.sort((a, b) => a.Ranking - b.Ranking);
    },
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>


