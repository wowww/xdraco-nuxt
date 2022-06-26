<template>
  <main class="hydra-payment">
    <div class="contents">
      <section class="section section1">
        <div class="section__inner">
          <h2 class="section-title">
            <span>HYDRA PAYMENT</span>
          </h2>
          <strong class="sub-title">‘PLAY &amp; EARN’ and PAY</strong>
          <p class="desc">
            HYDRA Payment empowers MIR4 gamers with a complete self-sufficiency to play, earn, and pay without limitations imposed on their gameplay
            experience.
          </p>
          <p class="desc">HYDRA Payment is a revolutionary approach in genuine Play &amp; Earn gaming.</p>
          <div class="wrap-exchange-rate-card">
            <exchange-rate-card :exchange-value="oracleValue" :oracle="oracle" />
            <p class="caution">Automatically updated and announced each day at 00:00(UTC+8).</p>
          </div>
        </div>
      </section>
      <section class="section section2">
        <div class="section__inner">
          <div class="tab-header">
            <h3 class="section-title">HYDRA Payment Illustration</h3>
            <v-tabs v-model="tabPaymentProduct" class="toggle-currency" hide-slider background-color="transparent">
              <v-tab class="btn-currency hyd">HYDRA</v-tab>
              <v-tab class="btn-currency usd">USD</v-tab>
            </v-tabs>
          </div>
          <v-tabs-items v-model="tabPaymentProduct" touchless>
            <v-tab-item>
              <div class="grid-product">
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold01.webp" width="200" alt="gold" />
                  <span class="gold-amount">120 GOLD</span>
                  <div class="btn-payment">
                    <img src="~@/assets/img/desktop/hydra-payment/logo-hydra-gold.webp" width="28" alt="HYDRA" />
                    <span class="price">{{ 2.99 | hydra(oracle) }}</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold02.webp" width="200" alt="gold" />
                  <span class="gold-amount">200 GOLD</span>
                  <div class="btn-payment">
                    <img src="~@/assets/img/desktop/hydra-payment/logo-hydra-gold.webp" width="28" alt="HYDRA" />
                    <span class="price">{{ 4.99 | hydra(oracle) }}</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold03.webp" width="200" alt="gold" />
                  <span class="gold-amount">405 GOLD</span>
                  <div class="btn-payment">
                    <img src="~@/assets/img/desktop/hydra-payment/logo-hydra-gold.webp" width="28" alt="HYDRA" />
                    <span class="price">0.4086</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold04.webp" width="200" alt="gold" />
                  <span class="gold-amount">1,220 GOLD</span>
                  <div class="btn-payment">
                    <img src="~@/assets/img/desktop/hydra-payment/logo-hydra-gold.webp" width="28" alt="HYDRA" />
                    <span class="price">{{ 29.99 | hydra(oracle) }}</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold05.webp" width="200" alt="gold" />
                  <span class="gold-amount">2,040 GOLD</span>
                  <div class="btn-payment">
                    <img src="~@/assets/img/desktop/hydra-payment/logo-hydra-gold.webp" width="28" alt="HYDRA" />
                    <span class="price">{{ 49.99 | hydra(oracle) }}</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold06.webp" width="200" alt="gold" />
                  <span class="gold-amount">4,100 GOLD</span>
                  <div class="btn-payment">
                    <img src="~@/assets/img/desktop/hydra-payment/logo-hydra-gold.webp" width="28" alt="HYDRA" />
                    <span class="price">{{ 99.99 | hydra(oracle) }}</span>
                  </div>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="grid-product">
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold01.webp" width="200" alt="gold" />
                  <span class="gold-amount">120 GOLD</span>
                  <div class="btn-payment">
                    <span class="price">$ 2.99</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold02.webp" width="200" alt="gold" />
                  <span class="gold-amount">200 GOLD</span>
                  <div class="btn-payment">
                    <span class="price">$ 4.99</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold03.webp" width="200" alt="gold" />
                  <span class="gold-amount">405 GOLD</span>
                  <div class="btn-payment">
                    <span class="price">$ 9.99</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold04.webp" width="200" alt="gold" />
                  <span class="gold-amount">1,220 GOLD</span>
                  <div class="btn-payment">
                    <span class="price">$ 29.99</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold05.webp" width="200" alt="gold" />
                  <span class="gold-amount">2,040 GOLD</span>
                  <div class="btn-payment">
                    <span class="price">$ 49.99</span>
                  </div>
                </div>
                <div class="grid-item">
                  <img src="~@/assets/img/desktop/hydra-payment/icon-gold06.webp" width="200" alt="gold" />
                  <span class="gold-amount">4,100 GOLD</span>
                  <div class="btn-payment">
                    <span class="price">$ 99.99</span>
                  </div>
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </section>
      <section class="section section3">
        <div class="section__inner">
          <!-- <h3 class="section-title" v-html="$t('t.hydra-payment.section3.title1')"></h3> -->
          <h3 class="section-title">Equilibrium in the economy of MIR4</h3>
          <div class="wrap-desc">
            <img src="~@/assets/img/desktop/hydra-payment/img-equilibrium.webp" width="452" alt="play, earn, pay" />
            <!-- <p class="desc" v-html="$t('s.hydra-payment.section3.desc1')"></p> -->
            <p class="desc">
              HYDRA Payment system opens up a new door of opportunities for the utility and value of HYDRA while also empowering gamers, earners, and
              holders of MIR4's gaming sphere. Furthermore, this will also effectively result in the growth of all segments within the economy
              including, DRACO, HYDRA, MIRAGE, and various DeFi services associated with the ecosystem of MIR4.
            </p>
          </div>
        </div>
      </section>
      <section class="section section4">
        <div class="section__inner">
          <!-- <h3 class="section-title" v-html="$t('t.hydra-payment.section4.title1')"></h3> -->
          <h3 class="section-title">How to Use in MIR4</h3>
          <!-- <p class="desc" v-html="$t('s.hydra-payment.section4.desc1')"></p> -->
          <p class="desc">
            HYDRA Payment is a new system implementation only available to the official PC version of MIR4 that allows Dragonians to purchase packages
            available through the in-game shop using HYDRA besides traditional payment methods. By accessing the shop menu through the HYDRA Payment
            system, all packages sold via cash will become purchasable using HYDRA.
          </p>
          <!-- <a href="https://forum.mir4global.com/post/757" class="link-underline" target="_blank" v-html="$t('w.hydra-payment.payment')"></a> -->
          <a href="https://forum.mir4global.com/post/757" class="link-underline" target="_blank">HYDRA Payment</a>
        </div>
      </section>
      <hydra-youtube-video />
      <!-- <p class="remark" v-html="$t('s.hydra-payment.remark')"></p> -->
      <p class="remark">The new world of <em>Play &amp; Earn, and Pay</em></p>
    </div>

    <common-footer />
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import Big from 'big.js';

import HydraYoutubeVideo from '@/components/coin/mobile/hydra/HydraYoutubeVideo';
import ExchangeRateCard from '@/components/common/ExchangeRateCard';
import CommonFooter from '@/components/coin/Footer';

export default defineComponent({
  components: {
    ExchangeRateCard,
    HydraYoutubeVideo,
    CommonFooter,
  },
  setup(_, { root }) {
    const { $dracoWebApi } = root;
    const state = reactive({
      oracle: 0,
      currencyValue: 'hyd',
      tabPaymentProduct: null,
    });

    onMounted(() => {
      $dracoWebApi.get('/mirage/getOracleWeb').then(({ data }) => {
        console.log(data);
        if (data.Code === 200) {
          console.log(data.Oracle);
          state.oracle = Number(data.Oracle);
        }
      });
    });

    const hyd = computed(() => {
      return new Big(state.oracle).times(0.95).toFixed();
    });

    const usd = computed(() => {
      if (state.oracle === 0) {
        return '0.00';
      }

      return new Big(state.oracle).times(0.95).toFixed(4, 0);
    });

    const oracleValue = computed(() => {
      if (state.currencyValue === 'usd') {
        if (state.oracle === 0) {
          return '0';
        }
        // usd / hyd =>
        return (1 / state.oracle).toFixed(4);
      }

      return state.oracle.toString();
    });

    return {
      ...toRefs(state),
      oracleValue,
      hyd,
      usd,
    };
  },
});
</script>
