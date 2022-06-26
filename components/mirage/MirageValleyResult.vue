<template>
  <div class="result" :class="{ disabled: closed || (valleyResult && Object.keys(valleyResult.Valley).length === 0) }">
    <div v-if="valleyResult" class="result-header">
      <div class="header-wrap">
        <p v-if="!closed || (valleyResult && valleyResult.Rank && valleyResult.Rank.length > 0)" class="stand">
          {{ valleyResult.beforeSchedule.EndDT | dateFormat }}
        </p>
        <div class="dh-wrap">
          <h3 class="title">{{ $t('t.mirage.last.result') }}</h3>
          <div>
            <p class="day">{{ $t('w.mirage.day', [`${valleyResult.beforeSchedule.Daily}`]) }}</p>
            <p class="half">
              {{ $t(`w.mirage.${valleyResult.beforeSchedule.Battle}.half`) }}
            </p>
          </div>
        </div>
      </div>
      <button
        v-if="!closed || (valleyResult && valleyResult.Rank && valleyResult.Rank.length > 0)"
        type="button"
        class="btn-mirage btn-primary"
        @click="setVisibleRanking(true)"
      >
        <span>Ranking</span>
      </button>
    </div>
    <div v-if="closed" class="result-contents">
      <!-- //FIXME: 정산완료 일자 날짜 포맷 처리 -->
      <p>
        <span>{{ $t('s.mirage.message.prepare') }}</span>
      </p>
    </div>
    <template v-else>
      <div v-if="valleyResult && Object.keys(valleyResult.Valley).length > 0" class="result-contents">
        <div class="ra-wrap">
          <dl class="rate">
            <dt>{{ $t('w.mirage.mining.rate') }}</dt>
            <dd>
              <p>{{ ((mintingAmount / maxAmount) * 100) | currency(2) }}%</p>
            </dd>
          </dl>
          <dl class="amount">
            <dt>Mining Amount</dt>
            <dd>
              <img src="@/assets/img/common/mirage/ico-24-darksteel.webp" width="24" />
              <p>{{ mintingAmount | currency(0) }}</p>
            </dd>
          </dl>
        </div>
        <div class="bsb-wrap">
          <dl class="bonus">
            <dt>{{ $t('w.mirage.ranking.bonus') }}</dt>
            <dd>
              <img src="@/assets/img/common/mirage/ico-24-darksteel.webp" width="24" />
              <p>{{ rankingBonus | currency(0) }}</p>
            </dd>
          </dl>
          <dl class="septaria">
            <dt>{{ $t('w.mirage.septaria') }}</dt>
            <dd>
              <img src="@/assets/img/common/mirage/ico-24-septaria-black.webp" width="24" />
              <p>{{ septaria }}</p>
              <v-tooltip content-class="mirage-tooltip-playnow" attach=".result-contents dd" max-width="320" top>
                <template #activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">icon</v-icon>
                </template>
                <div class="tooltip-wrap">
                  <p>{{ $t('s.mirage.claim.septaria.info') }}</p>
                </div>
              </v-tooltip>
            </dd>
          </dl>
          <button type="button" class="btn-mirage btn-more" @click="setVisibleMyResult(true)">More</button>
        </div>
      </div>
      <div v-else class="result-contents">
        <p>
          <span>{{ $t('s.mirage.message.no-enlisted') }}</span>
        </p>
      </div>
    </template>
    <modal-mirage-ranking />
    <modal-mirage-result />
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import dayjs from 'dayjs';
import { each } from 'lodash';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import ModalMirageRanking from '@/components/mirage/ModalMirageRanking';
import ModalMirageResult from '@/components/mirage/ModalMirageResult';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageValleyResult',
  components: { ModalMirageResult, ModalMirageRanking },
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { valleyList, valleyResult, valleyCapture } = useMirageState(['valleyList', 'valleyResult', 'valleyCapture']);
    const { setVisibleRanking, setVisibleMyResult } = useMirageMutations(['setVisibleRanking', 'setVisibleMyResult']);

    const endDateFormatted = computed(() => {
      if (valleyResult.value) {
        const endDay = dayjs.unix(valleyResult.value.beforeSchedule.EndDT);

        return endDay.locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale).format('lll');
      }
      return '';
    });

    const maxAmount = computed(() => {
      if (valleyList.value) {
        let amount = 0;
        each(valleyList.value, (v) => {
          amount += Number(v.MaxBlackIronAmount);
        });

        return amount;
      }

      return 0;
    });

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
      setVisibleRanking,
      setVisibleMyResult,
      valleyResult,
      mintingAmount,
      rankingBonus,
      septaria,
      maxAmount,
      valleyCapture,
      endDateFormatted,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
