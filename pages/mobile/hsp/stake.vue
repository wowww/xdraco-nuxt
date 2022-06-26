<template>
  <main class="contents hsp">
    <banner-hsp-top />

    <div class="hsp-main">
      <!-- Display Value for Hydra -->
      <div class="hsp-info">
        <div class="item">
          <dl class="define-value">
            <dt class="minted">
              {{ $t('t.hsp.main.value1') }}
              <v-tooltip content-class="hydra-tooltip" top>
                <template #activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on"> icon </v-icon>
                </template>
                <div class="tooltip-wrap">
                  <div class="tit">{{ $t('t.hsp.main.tooltip.title1') }}</div>
                  <ul class="desc">
                    <li>{{ $t('s.hsp.main.tooltip.desc1') }}</li>
                    <li>{{ $t('s.hsp.main.tooltip.desc2') }}</li>
                    <li>{{ $t('s.hsp.main.tooltip.desc3') }}</li>
                  </ul>
                </div>
              </v-tooltip>
            </dt>
            <dd v-if="isPreStake">
              <div>
                <p class="date">Reward HYDRA minting will begin on<br />{{ startStake.utcOffset(8).format(t('w.rounds.date.format')) }}</p>
              </div>
            </dd>
            <dd v-if="!isPreStake">
              <div>
                <p class="icon-hydra-gold">
                  {{ viewMintStake }}<em v-if="viewMintStakePoint">{{ viewMintStakePoint }}</em>
                </p>
                <v-btn width="24" height="24" fab icon :disabled="loading" @click="fetchTotal">
                  <img class="icon-refresh" :class="{ on: loading }" src="@/assets/img/common/hsp-dialog/ico-refresh.webp" />
                </v-btn>
              </div>
              <hsp-exchange-rate v-if="total && total.totalMintAmount" :amount="total.totalMintAmount" />
            </dd>
            <v-divider v-if="!isPreStake" />
            <div v-if="!isPreStake" class="graph-wrap">
              <em class="percent">{{ ((Number(total.totalMintAmount) / 1000000) * 100).toFixed(2) }}%</em>
              <div class="graph">
                <span class="bar" :style="{ width: `${((Number(total.totalMintAmount) / 1000000) * 100).toFixed(2)}%` }"></span>
              </div>
            </div>
          </dl>
        </div>

        <div class="item">
          <dl class="define-value">
            <dt class="total">
              {{ $t('t.hsp.tvs') }}
              <v-tooltip content-class="hydra-tooltip" top>
                <template #activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on"> icon </v-icon>
                </template>
                <div class="tooltip-wrap">
                  <div class="tit">{{ $t('t.hsp.main.value2') }}</div>
                  <ul class="desc">
                    <li>{{ $t('s.hsp.main.tooltip.desc4') }}</li>
                  </ul>
                </div>
              </v-tooltip>
            </dt>
            <dd>
              <div>
                <p class="icon-hydra-gold">
                  {{ viewTotalStake }}<em v-if="viewTotalStakePoint">{{ viewTotalStakePoint }}</em>
                </p>
                <v-btn width="24" height="24" fab icon @click="fetchTotal">
                  <img class="icon-refresh" :class="{ on: loading }" src="@/assets/img/common/hsp-dialog/ico-refresh.webp" alt="Refresh TVS" />
                </v-btn>
              </div>
              <hsp-exchange-rate v-if="total && total.totalStakedAmount" :amount="total.totalStakedAmount" />
            </dd>
            <v-divider />
            <div class="total-avr">
              <div><span v-html="formattedApr"></span><em>APR</em></div>
              <v-divider vertical />
              <div><span v-html="formattedApy"></span><em>APY</em></div>
            </div>
          </dl>
        </div>
      </div>

      <!-- My Stake -->
      <hsp-my-stake :pre-stake="isPreStake" :apr="formattedApr" :apy="formattedApy" />

      <!-- Notice -->
      <div class="notice-wrap">
        <dl class="meaning">
          <dt v-html="$t('t.hsp-teaser.caution.title')"></dt>
          <dd v-html="$t('s.hsp-teaser.caution.content')"></dd>
        </dl>
        <ul class="list-caution">
          <li v-html="$t('s.hsp-teaser.caution.desc1')"></li>
          <li v-html="$t('s.hsp-teaser.caution.desc2')"></li>
          <li v-html="$t('s.hsp-teaser.caution.desc3')"></li>
        </ul>
      </div>
    </div>

    <Footer />
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import BannerHspTop from '@/components/banner/HspTop';
import HspExchangeRate from '@/components/hsp/HspExchangeRate';
import HspMyStake from '@/components/hsp/HspMyStake';
import { currency } from '@/utils/filters/numeric';
import Footer from '@/components/common/Footer';

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');

export default defineComponent({
  components: {
    HspExchangeRate,
    Footer,
    BannerHspTop,
    HspMyStake,
  },
  setup(_, { root }) {
    const startStake = dayjs('2022-01-28 16:00').utc(true);
    const { accessToken } = useState(['accessToken']);
    const { loading, total, my, price } = useHspState(['loading', 'total', 'my', 'price']);
    const { fetchTotal, fetchMy } = useHspActions(['fetchTotal', 'fetchMy']);

    const hydraBlock = new BigNumber(1000002).div(30000000).times(0.93);

    const state = reactive({
      aprBigNumber: null,
      apr: Number(0),
      apy: Number(0),
      formattedApr: '--%',
      formattedApy: '--%',
    });

    const isPreStake = computed(() => {
      return dayjs().utc().isBefore(startStake);
    });

    const viewMintStake = computed(() => {
      return total.value && total.value.totalMintAmount ? currency(total.value.totalMintAmount.split('.')[0], 0) : '--';
    });

    const viewMintStakePoint = computed(() => {
      if (total.value && total.value.totalMintAmount && total.value.totalMintAmount.split('.').length > 1) {
        if (Number(total.value.totalMintAmount.split('.')[1]) > 0) {
          return `.${total.value.totalMintAmount.split('.')[1].slice(0, 4)}`;
        }
      }
      return '';
    });

    const viewTotalStake = computed(() => {
      return total.value && total.value.totalStakedAmount ? currency(total.value.totalStakedAmount.split('.')[0], 0) : '--';
    });

    const viewTotalStakePoint = computed(() => {
      if (total.value && total.value.totalStakedAmount && total.value.totalStakedAmount.split('.').length > 1) {
        if (Number(total.value.totalStakedAmount.split('.')[1]) > 0) {
          return `.${total.value.totalStakedAmount.split('.')[1].slice(0, 4)}`;
        }
      }
      return '';
    });

    onMounted(() => {
      fetchTotal();
      fetchMy();
    });

    watch(
      () => accessToken.value,
      () => {
        fetchTotal();
        fetchMy();
      },
    );

    const calcApr = () => {
      if (!loading.value && total.value.totalStakedAmount) {
        console.log('calc start');
        const one = new BigNumber(1);
        const totalStake = new BigNumber(total.value.totalStakedAmount);

        const val = one.div(totalStake).times(hydraBlock).times(31536000);

        state.apr = val.toNumber();
        const sApr = val.times(100).toFormat(2).split('.');

        const point = sApr.length > 1 ? `<em class="point">.${sApr[1]}</em>` : '';

        state.formattedApr = `${sApr[0]}${point}%`;
      } else {
        state.formattedApr = '--%';
      }
    };

    const calcApy = () => {
      if (!loading.value && state.apr > 0) {
        console.log('calcApy');
        const one = new BigNumber(1);
        const _apr = new BigNumber(state.apr);

        const val = one.plus(_apr.div(8760).times(0.95)).pow(8760).minus(1);
        state.apy = val.toNumber();
        const sApy = val.times(100).toFormat(2).split('.');

        const point = sApy.length > 1 ? `<em class="point">.${sApy[1]}</em>` : '';

        state.formattedApy = `${sApy[0]}${point}%`;
      } else {
        state.formattedApy = '--%';
      }
    };

    watch(
      () => [loading.value, total.value],
      () => {
        if (!loading.value && total.value.totalStakedAmount) {
          calcApr();
        }
      },
    );

    watch(
      () => state.apr,
      () => {
        calcApy();
      },
    );

    return {
      ...toRefs(state),
      total,
      my,
      loading,
      fetchTotal,
      fetchMy,
      price,
      isPreStake,
      startStake,
      viewTotalStake,
      viewTotalStakePoint,
      viewMintStake,
      viewMintStakePoint,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/hsp';
</style>
