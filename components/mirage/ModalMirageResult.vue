<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-captureresult"
    :value="visibleMyResult"
    :width="!isMobile ? '960px' : '100%'"
    :fullscreen="isMobile"
    persistent
  >
    <div class="content">
      <div class="dialog-header">
        {{ $t('t.mirage.valley.result') }}
        <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleMyResult(false)" />
      </div>
      <div v-if="valleyResult && valleyList" class="result-content">
        <div class="info-inner">
          <div class="valley">
            <div class="name">Valley</div>
            <div class="info-wrap">
              <div class="info">
                <p class="day">Day {{ valleyResult.beforeSchedule.Daily }} /</p>
                <p class="half">
                  {{ valleyResult.beforeSchedule.Battle === '1' ? '1st Half' : '2nd Half' }}
                </p>
              </div>
            </div>
            <p class="date">{{ valleyResult.beforeSchedule.EndDT | dateFormat }}</p>
          </div>
          <div class="total-wrap">
            <dl class="total-darksteel">
              <dt>Total gained Darksteel</dt>
              <dd>
                <img src="@/assets/img/common/mirage-popup/ico-40-darksteel.webp" :width="!isMobile ? 40 : 24" />{{ mintingAmount | currency(0) }}
              </dd>
            </dl>
            <dl class="totla-septaria">
              <dt>Total gained Septaria</dt>
              <dd><img src="@/assets/img/common/mirage-popup/ico-40-septaria-dark.webp" :width="!isMobile ? 40 : 24" />{{ septaria }}</dd>
            </dl>
          </div>
          <ul class="remain-wrap">
            <li v-if="valleyResult.Valley['3']">
              <dl class="redmoon">
                <dt>
                  <h4 class="title">{{ $t('t.mirage.valley-type.3') }}</h4>
                  <p>
                    <img src="@/assets/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />{{
                      valleyResult.Valley['3'].TotalBlackIronAmount | currency(0)
                    }}
                  </p>
                </dt>
                <dd>
                  <h5 class="sub-title">Mined Amount</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-darksteel.webp" width="16" /><span>{{
                        valleyResult.Valley['3'].TotalBlackIronAmount | currency(0)
                      }}</span
                      >/{{ valleyList['3'].MaxBlackIronAmount | currency(0) }}
                    </div>
                    <div class="remain-percent">
                      <span>{{
                        ((Number(valleyResult.Valley['3'].TotalBlackIronAmount) / Number(valleyList['3'].MaxBlackIronAmount)) * 100) | currency(2)
                      }}</span
                      >%
                    </div>
                  </div>
                </dd>
                <dd>
                  <h5 class="sub-title">Ranking Bonus</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-darksteel.webp" width="16" /><span>{{
                        valleyResult.Valley['3'].TotalRankBonusAmount | currency(0)
                      }}</span>
                    </div>
                  </div>
                </dd>
                <dd>
                  <h5 class="sub-title">Gained Septaria</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-septaria.webp" width="16" /><span>{{
                        valleyResult.Valley['3'].SeptariaAmount
                      }}</span>
                    </div>
                  </div>
                </dd>
              </dl>
            </li>
            <li v-if="valleyResult.Valley['2']">
              <dl class="snakepit">
                <dt>
                  <h4 class="title">{{ $t('t.mirage.valley-type.2') }}</h4>
                  <p>
                    <img src="@/assets/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />{{
                      valleyResult.Valley['2'].TotalBlackIronAmount | currency(0)
                    }}
                  </p>
                </dt>
                <dd>
                  <h5 class="sub-title">Mined Amount</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-darksteel.webp" width="16" /><span>{{
                        valleyResult.Valley['2'].TotalBlackIronAmount | currency(0)
                      }}</span
                      >/{{ valleyList['2'].MaxBlackIronAmount | currency(0) }}
                    </div>
                    <div class="remain-percent">
                      <span>{{
                        ((Number(valleyResult.Valley['2'].TotalBlackIronAmount) / Number(valleyList['2'].MaxBlackIronAmount)) * 100) | currency(2)
                      }}</span
                      >%
                    </div>
                  </div>
                </dd>
                <dd>
                  <h5 class="sub-title">Ranking Bonus</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-darksteel.webp" width="16" /><span>{{
                        valleyResult.Valley['2'].TotalRankBonusAmount | currency(0)
                      }}</span>
                    </div>
                  </div>
                </dd>
                <dd>
                  <h5 class="sub-title">Gained Septaria</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-septaria.webp" width="16" /><span>{{
                        valleyResult.Valley['2'].SeptariaAmount
                      }}</span>
                    </div>
                  </div>
                </dd>
              </dl>
            </li>
            <li v-if="valleyResult.Valley['1']">
              <dl class="redmoon">
                <dt>
                  <h4 class="title">{{ $t('t.mirage.valley-type.1') }}</h4>
                  <p>
                    <img src="@/assets/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />{{
                      valleyResult.Valley['1'].TotalBlackIronAmount | currency(0)
                    }}
                  </p>
                </dt>
                <dd>
                  <h5 class="sub-title">Mined Amount</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-darksteel.webp" width="16" /><span>{{
                        valleyResult.Valley['1'].TotalBlackIronAmount | currency(0)
                      }}</span
                      >/{{ valleyList['1'].MaxBlackIronAmount | currency(0) }}
                    </div>
                    <div class="remain-percent">
                      <span>{{
                        ((Number(valleyResult.Valley['1'].TotalBlackIronAmount) / Number(valleyList['1'].MaxBlackIronAmount)) * 100) | currency(2)
                      }}</span
                      >%
                    </div>
                  </div>
                </dd>
                <dd>
                  <h5 class="sub-title">Ranking Bonus</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-darksteel.webp" width="16" /><span>{{
                        valleyResult.Valley['1'].TotalRankBonusAmount | currency(0)
                      }}</span>
                    </div>
                  </div>
                </dd>
                <dd>
                  <h5 class="sub-title">Gained Septaria</h5>
                  <div class="remain-inner">
                    <div class="remain-size">
                      <img src="@/assets/img/common/mirage-popup/ico-16-septaria.webp" width="16" /><span>{{
                        valleyResult.Valley['1'].SeptariaAmount
                      }}</span>
                    </div>
                  </div>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
        <div v-if="valleyResult.MyRank && valleyResult.MyRank.length > 0" class="char-wrap">
          <div class="my-ranking">
            <h3 class="title">My Ranking</h3>
            <dl class="bonus">
              <dt>Total Ranking Bonus</dt>
              <dd><img src="@/assets/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />{{ rankingBonus | currency(0) }}</dd>
            </dl>
          </div>
          <ul class="char-list">
            <li v-for="(rankItem, rankItemIdx) in valleyResult.MyRank" :key="`mirage-my-rank-${rankItemIdx}`">
              <mirage-rank-character-item
                :key="`mirage-my-rank-character-${rankItemIdx}-${rankItem.CharacterUID}`"
                :character="{
                  ...rankItem,
                  State: MirageCharacterState.READY,
                }"
                :current-rank="rankItem.Ranking"
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
import { defineComponent } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { each } from 'lodash';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';
import MirageRankCharacterItem from '@/components/mirage/MirageRankCharacterItem';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalMirageResult',
  components: { MirageRankCharacterItem },
  setup() {
    const { valleyList, visibleMyResult, valleyResult } = useMirageState(['valleyList', 'visibleMyResult', 'valleyResult']);
    const { setVisibleMyResult } = useMirageMutations(['setVisibleMyResult']);

    const mintingAmount = computed(() => {
      if (valleyResult.value) {
        let sum = 0;
        each(valleyResult.value.Valley, (v) => {
          sum += Number(v.TotalBlackIronAmount);
        });

        return sum;
      }

      return 0;
    });

    const rankingBonus = computed(() => {
      if (valleyResult.value) {
        let sum = 0;
        each(valleyResult.value.Valley, (v) => {
          sum += Number(v.TotalRankBonusAmount);
        });

        return sum;
      }

      return 0;
    });

    const septaria = computed(() => {
      if (valleyResult.value) {
        let sum = 0;
        each(valleyResult.value.Valley, (v) => {
          sum += Number(v.SeptariaAmount);
        });

        return sum;
      }

      return 0;
    });

    return {
      visibleMyResult,
      setVisibleMyResult,
      MirageCharacterState,
      valleyList,
      valleyResult,
      mintingAmount,
      rankingBonus,
      septaria,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>


