<template>
  <div class="intro-draco">
    <template>
      <v-carousel v-if="dracoRate && derby" class="float-bottom" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <draco-usd-draco />
        <draco-wemix-draco />
        <draco-today-derby />
        <draco-smelting-cost />
      </v-carousel>
    </template>

    <div class="wrap-intro-banner">
      <intro-drain />
    </div>

    <section class="section">
      <div class="define">
        <h2 v-html="$t('s.home.info')"></h2>
      </div>
      <div class="wrap-youtube no-gutter" :class="{ 'wrap-video--open': isOpen }">
        <div class="inner">
          <iframe
            width="760"
            height="428"
            src="https://www.youtube.com/embed/Q9n5kE-7G9A?VQ=HD720"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <p class="desc-define">{{ $t('s.home.description') }}</p>
      <div class="process"></div>
      <div class="wrap-exchange">
        <a href="https://en.bithumb.com/trade/order/WEMIX_KRW" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-bithumb.webp" height="24" alt="bithumb" />
        </a>
        <a href="https://www.gate.io/trade/WEMIX_USDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-gate.webp" height="26" alt="gate.io" />
        </a>
        <a href="https://app.liquid.com/exchange/WEMIXUSDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-liguid.webp" height="20" alt="" />
        </a>
        <a href="https://www.mexc.com/ko-KR/exchange/WEMIX_USDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-mexc.webp" height="17" alt="MEXC Global" />
        </a>
        <a href="https://exchange.korbit.co.kr/markets/?market=wemix-krw" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-korbit.webp" height="21" alt="" />
        </a>
        <a href="https://www.lbank.info/exchange/wemix/usdt" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-lbank.webp" height="21" alt="lbank" />
        </a>
        <a href="https://www.bybit.com/en-US/trade/spot/WEMIX/USDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-bybit.webp" height="28" alt="bybit" />
        </a>
        <a href="https://coinone.co.kr/exchange/trade/wemix/krw" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-coinone.webp" height="29" alt="coinone" />
        </a>
        <a href="https://www.probit.com/app/exchange/WEMIX-USDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-probit.webp" height="36" alt="probit" />
        </a>
        <a href="https://www.okx.com/markets/prices/wemix-token-wemix" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-okx.webp" height="32" alt="okx" />
        </a>
        <a href="https://www.huobi.com/en-us/exchange/wemix_usdt/" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-huobi.webp" height="28" alt="huobi" />
        </a>
        <a href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-WEMIX" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-upbit.webp" height="20" alt="upbit" />
          <span class="nation">KOREA</span>
        </a>
        <a href="https://id.upbit.com/exchange?code=CRIX.UPBIT.BTC-WEMIX" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-upbit.webp" height="20" alt="upbit" />
          <span class="nation">INDONESIA</span>
        </a>
        <a href="https://th.upbit.com/exchange?code=CRIX.UPBIT.BTC-WEMIX" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-upbit.webp" height="20" alt="upbit" />
          <span class="nation">THAILAND</span>
        </a>
        <a href="https://crypto.com/exchange/trade/spot/WEMIX_USDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-crypto.webp" height="26" alt="crypto" />
        </a>
        <!-- <a href="https://www.biki.cc/ko_KR/trade/WEMIX_USDT" class="exchange" target="_blank">
          <img src="@/assets/img/mobile/draco/bi-biki.webp" height="16" alt="" />
        </a> -->
      </div>
    </section>

    <section class="section">
      <h3 class="title derby-title">{{ $t('t.home.smelt.exchange') }}</h3>
      <div class="derby no-gutter">
        <display-derby
          v-if="derby && Array.isArray(derby) && derby.length > 0"
          :set="(today = derby[derby.length - 1])"
          :ds="Number(today.DS)"
          :bonus="Number(today.BonusYield)"
        />
        <display-derby-empty v-else />
        <display-smelting-cost
          v-if="derby && Array.isArray(derby) && derby.length > 0"
          :today="derby.slice(-1)[0]"
          :yesterday="derby.slice(-2, -1)[0]"
        />
        <display-smelting-cost-empty v-else />
        <div v-if="derby && Array.isArray(derby) && derby.length > 0" class="derby__date">{{ $t('s.smelting-cost.updated2') }}</div>
      </div>

      <div class="description">
        <h4 class="title">DERBY</h4>
        <p>
          {{ $t('s.home.derby.primary') }}
        </p>
        <p class="small">* {{ $t('s.home.derby.secondary') }}</p>
        <div class="formula">
          <img src="@/assets/img/mobile/draco/derbyformula.webp" width="100%" alt="" />
          <p>
            Mn = Day n's mined Darksteel<br />
            <span class="date">Start date = August 26th 2021</span>
          </p>
        </div>
        <h4 class="title">{{ $t('t.home.draco') }}</h4>
        <dl>
          <dt>Smelting</dt>
          <dd>{{ $t('s.home.draco.smelting') }}</dd>
        </dl>
        <dl>
          <dt>{{ $t('t.home.draco.fee') }}</dt>
          <dd>
            {{ $t('s.home.draco.sfree') }}
            <p v-show="false" class="desc-info">{{ $t('s.intro-trinity.algorithm3') }}</p>
            <div class="trinity-area">
              <p class="trinity-title">{{ $t('t.intro-trinity.what') }}</p>
              <div class="trinity-desc">
                <p>{{ $t('s.intro-trinity.what') }}</p>
              </div>
              <a href="https://www.youtube.com/watch?v=YEArXJfX21s" target="_blank"
              ><span>{{ $t('s.intro-trinity.algorithm4') }}</span></a
              >
            </div>
          </dd>
        </dl>
        <dl>
          <dt>{{ $t('t.home.draco.limit') }}</dt>
          <dd>{{ $t('s.home.draco.limit') }}</dd>
        </dl>
        <h4 class="title">{{ $t('t.home.darksteel') }}</h4>
        <p>
          {{ $t('s.home.darksteel') }}
        </p>
        <h4 class="title mt-80">{{ $t('t.draco.coins.material') }}</h4>
        <img src="@/assets/img/desktop/draco/coins.webp" class="img-center" width="245" alt="" />
        <p>{{ $t('s.draco.coins.desc') }}</p>
        <nuxt-link to="/hydra" class="link-type1 link">{{ $t('w.draco.coins.more') }}</nuxt-link>
      </div>
    </section>

    <section class="section">
      <h3 class="title">{{ $t('t.home.draco.characteristics') }}</h3>

      <template>
        <v-expansion-panels class="no-gutter" accordion flat>
          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('t.home.draco.utility.coin') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>{{ $t('s.home.draco.utility.coin') }}</p>
              <div class="wrap-image">
                <img src="@/assets/img/mobile/draco/dracochaacteristics-1.webp" width="240" alt="" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('t.home.draco.mobility.coin') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>
                {{ $t('s.home.draco.mobility.coin') }}
              </p>
              <div class="wrap-image">
                <img src="@/assets/img/mobile/draco/dracochaacteristics-2.webp" width="240" alt="" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('t.home.draco.intrinsic.value') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>
                {{ $t('s.home.draco.intrinsic.value') }}
              </p>
              <div class="wrap-image">
                <img src="@/assets/img/mobile/draco/dracochaacteristics-3.webp" width="240" alt="" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('t.home.draco.real.value') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>
                {{ $t('s.home.draco.real.value') }}
              </p>
              <div class="wrap-image">
                <img src="@/assets/img/mobile/draco/dracochaacteristics-4.webp" width="240" alt="" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('t.home.draco.investment.value') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>
                {{ $t('s.home.draco.investment.value1') }}
                <br /><br />
                {{ $t('s.home.draco.investment.value2') }}
              </p>
              <div class="wrap-image">
                <img src="@/assets/img/mobile/draco/dracochaacteristics-5.webp" width="240" alt="" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </section>

    <section class="section smeltery guide-draco">
      <h3 class="title">{{ $t('t.guide.smeltery') }}</h3>
      <p>
        {{ $t('s.guide.smeltery.desc') }}
      </p>
    </section>

    <section class="section smeltery guide-draco full-width">
      <div class="derby no-gutter">
        <DisplayDerby
          v-if="derby && derby.length > 0"
          :set="(today = derby[derby.length - 1])"
          :ds="Number(today.DS)"
          :bonus="Number(today.BonusYield)"
        />
        <DisplayDerbyEmpty v-else />
        <DisplaySmeltingCost v-if="derby && derby.length > 0" />
        <DisplaySmeltingCostEmpty v-else />
        <div class="derby__date">{{ $t('s.smelting-cost.updated2') }}</div>
      </div>
    </section>

    <section class="section solo guide-draco">
      <div class="description">
        <p>
          {{ $t('s.intro-trinity.algorithm') }}
        </p>
        <!-- <p class="small">* {{ $t('s.home.derby.secondary') }}</p> -->
      </div>
      <div class="trinity-area no-gutter">
        <div class="trinity-info">
          <p class="trinity-title">{{ $t('t.intro-trinity.algorithm') }}</p>
          <div class="trinity-desc">
            <p>{{ $t('s.intro-trinity.algorithm5') }}</p>
          </div>
        </div>
        <div class="trinity-circle">
          <span class="green">{{ $t('w.intro-trinity.holder') }}</span>
          <span class="blue">{{ $t('w.intro-trinity.earner') }}</span>
          <span class="red">{{ $t('w.intro-trinity.player') }}</span>
          <span class="white">{{ $t('w.intro-trinity.triangulation') }}</span>
        </div>
        <a href="https://www.youtube.com/watch?v=YEArXJfX21s" target="_blank"
        ><span>{{ $t('s.intro-trinity.algorithm4') }}</span></a
        >
      </div>
    </section>

    <section id="guideStep" class="section guide-draco mt-64">
      <div v-viewer="viewerOption" class="description">
        <h4 class="title mt-0">{{ $t('t.guide.smeltery.step.1') }}</h4>
        <p v-html="$t('s.guide.smeltery.step.type2')"></p>
        <div class="wrap-image by-viewer no-gutter">
          <img src="@/assets/img/mobile/draco/step1c.webp" alt="Game menu" />
        </div>
        <p class="text-center">Game menu</p>

        <h4 class="title">{{ $t('t.guide.smeltery.step.2') }}</h4>
        <dl>
          <dt>
            <span>Smelting Darksteel into DRACO</span>
          </dt>
          <dd>
            <p>{{ $t('s.intro-trinity.algorithm2') }}</p>
            <p>{{ $t('s.guide.smeltery.step.2.1.content.3') }}</p>
            <p>{{ $t('s.guide.smeltery.step.2.1.content.4') }}</p>
          </dd>
        </dl>
        <dl>
          <dt>
            <span>Exchanging DRACO for Darksteel</span>
          </dt>
          <dd>
            <p>{{ $t('s.guide.smeltery.step.2.2.content.1') }}</p>
            <p>{{ $t('s.guide.smeltery.step.2.2.content.2') }}</p>
            <p>{{ $t('s.guide.smeltery.step.2.2.content.3') }}</p>
          </dd>
        </dl>
        <div class="wrap-image by-viewer no-gutter">
          <img src="@/assets/img/mobile/draco/step2a.webp" alt="" />
          <p class="text-center">{{ $t('t.guide.smeltery') }}</p>
        </div>

        <p v-show="false" class="desc-info">{{ $t('s.intro-trinity.algorithm3') }}</p>
        <h4 class="title mt-40">{{ $t('t.guide.smeltery.step.3') }}</h4>
        <p>
          {{ $t('s.guide.smeltery.setp.3.content.1') }}
          {{ $t('s.guide.smeltery.setp.3.content.2') }}
        </p>
      </div>
      <template>
        <!-- <v-carousel class="float-bottom" :show-arrows="false" interval="5000" cycle vertical hide-delimiters> -->
        <v-carousel
          v-viewer="viewerOption"
          class="list-connect-process no-gutter"
          :show-arrows="false"
          height="auto"
          delimiter-icon="mdi-rhombus"
          hide-delimiter-background
        >
          <v-carousel-item eager>
            <div class="wrap-image by-viewer">
              <img src="@/assets/img/mobile/draco/connect-process1a.webp" alt="Connect Process Step#1" />
            </div>
            <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.1') }}</p>
          </v-carousel-item>
          <v-carousel-item eager>
            <div class="wrap-image by-viewer">
              <img src="@/assets/img/mobile/draco/connect-process2a.webp" alt="Connect Process Step#2" />
            </div>
            <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.2') }}</p>
          </v-carousel-item>
          <v-carousel-item eager>
            <div class="wrap-image by-viewer">
              <img src="@/assets/img/mobile/draco/connect-process3a.webp" alt="Connect Process Step#3" />
            </div>
            <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.3') }}</p>
          </v-carousel-item>
          <v-carousel-item eager>
            <div class="wrap-image by-viewer">
              <img src="@/assets/img/mobile/draco/connect-process4a.webp" alt="Connect Process Step#4" />
            </div>
            <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.4') }}</p>
          </v-carousel-item>
        </v-carousel>
      </template>
    </section>

    <common-footer/>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, toRefs } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';
import { useState, useActions } from 'vuex-composition-helpers/dist';

import DisplayDerby from '@/components/coin/common/draco/DisplayDerby';
import DisplayDerbyEmpty from '@/components/coin/common/draco/DisplayDerbyEmpty';
import DisplaySmeltingCost from '@/components/coin/common/draco/DisplaySmeltingCost';
import DisplaySmeltingCostEmpty from '@/components/coin/common/draco/DisplaySmeltingCostEmpty';
import IntroDrain from '@/components/coin/IntroDrain';
import DracoSmeltingCost from '@/components/coin/mobile/draco/DracoSmeltingCost';
import DracoTodayDerby from '@/components/coin/mobile/draco/DracoTodayDerby';
import DracoUsdDraco from '@/components/coin/mobile/draco/DracoUsdDraco';
import DracoWemixDraco from '@/components/coin/mobile/draco/DracoWemixDraco';
import CommonFooter from '@/components/common/Footer';

export default defineComponent({
  components: {
    DracoWemixDraco,
    DracoSmeltingCost,
    DracoTodayDerby,
    DracoUsdDraco,
    IntroDrain,
    DisplaySmeltingCostEmpty,
    DisplaySmeltingCost,
    DisplayDerbyEmpty,
    DisplayDerby,
    CommonFooter,
  },
  directives: {
    viewer: viewer({
      debug: process.env.VUE_APP_DRACO_PROFILE !== 'production',
    }),
  },
  setup() {
    const { derby, dracoRate, draco } = useState(['derby', 'dracoRate', 'draco']);
    const { fetchDracoLastest, fetchDraco, fetchDerby } = useActions(['fetchDracoLastest', 'fetchDraco', 'fetchDerby']);

    const state = reactive({
      isOpen: false,
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
    });

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-intro-draco');
      }, 1500);
    });

    onMounted(() => {
      setTimeout(() => {
        state.isOpen = !state.isOpen;
      }, 400);
      // fetchDracoLastest();
      // fetchDraco();
      // fetchDerby();
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-intro-draco');
    });

    return {
      ...toRefs(state),
      fetchDracoLastest,
      fetchDraco,
      fetchDerby,
      derby,
      dracoRate,
      draco,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV !== 'production',
  }),
});
</script>
