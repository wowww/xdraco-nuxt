<template>
  <div class="intro-draco">
    <section id="part1" class="section">
      <div class="section__inner">
        <div class="define">
          <h2 v-html="$t('s.home.info')"></h2>
        </div>
      </div>
    </section>

    <section class="section youtube-area">
      <div class="section__inner">
        <div class="wrap-youtube" :class="{ 'wrap-video--open': isOpen }">
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
      </div>
    </section>

    <section class="section">
      <div class="section__inner">
        <p class="desc-define">{{ $t('s.home.description') }}</p>
        <div class="process"></div>
        <div class="wrap-exchange">
          <a href="https://en.bithumb.com/trade/order/WEMIX_KRW" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-bithumb.webp" height="24" alt="bithumb" />
          </a>
          <a href="https://www.gate.io/trade/WEMIX_USDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-gate.webp" height="26" alt="gate.io" />
          </a>
          <a href="https://www.mexc.com/ko-KR/exchange/WEMIX_USDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-mexc.webp" height="17" alt="MEXC Global" />
          </a>
          <a href="https://app.liquid.com/exchange/WEMIXUSDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-liguid.webp" height="20" alt="" />
          </a>
          <a href="https://exchange.korbit.co.kr/markets/?market=wemix-krw" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-korbit.webp" height="21" alt="" />
          </a>
          <a href="https://www.lbank.info/exchange/wemix/usdt" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-lbank.webp" height="21" alt="lbank" />
          </a>
          <a href="https://www.bybit.com/en-US/trade/spot/WEMIX/USDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-bybit.webp" height="28" alt="bybit" />
          </a>
          <a href="https://coinone.co.kr/exchange/trade/wemix/krw" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-coinone.webp" height="28" alt="coinone" />
          </a>
          <a href="https://www.probit.com/app/exchange/WEMIX-USDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-probit.webp" height="36" alt="probit" />
          </a>
          <a href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-WEMIX" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-upbit.webp" height="28" alt="upbit" />
            <span class="nation">KOREA</span>
          </a>
          <a href="https://id.upbit.com/exchange?code=CRIX.UPBIT.BTC-WEMIX" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-upbit.webp" height="28" alt="upbit" />
            <span class="nation">INDONESIA</span>
          </a>
          <a href="https://th.upbit.com/exchange?code=CRIX.UPBIT.BTC-WEMIX" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-upbit.webp" height="28" alt="upbit" />
            <span class="nation">THAILAND</span>
          </a>
          <a href="https://www.okx.com/markets/prices/wemix-token-wemix" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-okx.webp" height="32" alt="okx" />
          </a>
          <a href="https://www.huobi.com/en-us/exchange/wemix_usdt/" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-huobi.webp" height="28" alt="huobi" />
          </a>
          <a href="https://crypto.com/exchange/trade/spot/WEMIX_USDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-crypto.webp" height="26" alt="crypto" />
          </a>
          <!-- <a href="https://www.biki.cc/ko_KR/trade/WEMIX_USDT" class="exchange" target="_blank">
            <img src="@/assets/img/desktop/draco/bi-biki.webp" height="16" alt="" />
          </a> -->
        </div>
      </div>
    </section>

    <intersect :threshold="[0.5]" @enter="setCurrentNavScroll">
      <div id="part2">
        <section class="section">
          <div class="section__inner">
            <h3 class="title">{{ $t('t.home.smelt.exchange') }}</h3>
          </div>
        </section>

        <section class="section">
          <div class="derby-wrap">
            <div class="derby">
              <DisplayDerby
                v-if="derby && Array.isArray(derby) && derby.length > 0"
                :set="(today = derby[derby.length - 1])"
                :ds="Number(today.DS)"
                :bonus="Number(today.BonusYield)"
              />
              <DisplayDerbyEmpty v-else />
              <DisplaySmeltingCost
                v-if="derby && Array.isArray(derby) && derby.length > 0"
                :today="derby.slice(-1)[0]"
                :yesterday="derby.slice(-2, -1)[0]"
              />
              <DisplaySmeltingCostEmpty v-else />
            </div>
            <div class="derby__date">
              {{ $t('s.smelting-cost.updated2') }}
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section__inner">
            <div class="description">
              <h4 class="title">DERBY</h4>
              <p>
                {{ $t('s.home.derby.primary') }}
              </p>
              <p>* {{ $t('s.home.derby.secondary') }}</p>
              <div class="formula">
                <img src="@/assets/img/desktop/draco/derbyformula.webp" width="671" alt="" />
                <p>
                  {{ $t('s.home.derby.formula') }}
                  <br />
                  <span class="date">Start date = August 26th 2021</span>
                </p>
              </div>
              <h4 class="title">{{ $t('t.home.draco') }}</h4>
              <dl>
                <dt>{{ $t('t.home.draco.smelting') }}</dt>
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
              <h4 class="title mt-120">{{ $t('t.home.darksteel') }}</h4>
              <p>
                {{ $t('s.home.darksteel') }}
              </p>
              <h4 class="title mt-80">{{ $t('t.draco.coins.material') }}</h4>
              <div class="between-wrap">
                <div>
                  <p>{{ $t('s.draco.coins.desc') }}</p>
                  <nuxt-link to="/hydra" class="link-type1 link">{{ $t('w.draco.coins.more') }}</nuxt-link>
                </div>
                <img src="@/assets/img/desktop/draco/coins.webp" width="245" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </intersect>

    <intersect :threshold="[0.5]" @enter="setCurrentNavScroll">
      <div id="part3">
        <section class="section">
          <div class="section__inner">
            <h3 class="title">{{ $t('t.home.draco.characteristics') }}</h3>

            <template>
              <v-expansion-panels accordion flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>{{ $t('t.home.draco.utility.coin') }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>{{ $t('s.home.draco.utility.coin') }}</p>
                    <div class="wrap-image">
                      <img src="@/assets/img/desktop/draco/dracochaacteristics-1.webp" alt="" />
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
                      <img src="@/assets/img/desktop/draco/dracochaacteristics-2.webp" alt="" />
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
                      <img src="@/assets/img/desktop/draco/dracochaacteristics-3.webp" alt="" />
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
                      <img src="@/assets/img/desktop/draco/dracochaacteristics-4.webp" alt="" />
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>{{ $t('t.home.draco.investment.value') }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>
                      {{ $t('s.home.draco.investment.value1') }}
                      {{ $t('s.home.draco.investment.value2') }}
                    </p>
                    <div class="wrap-image">
                      <img src="@/assets/img/desktop/draco/dracochaacteristics-5.webp" alt="" />
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </div>
        </section>
      </div>
    </intersect>

    <section class="section guide-draco">
      <div class="section__inner smeltery">
        <h3 class="title">{{ $t('t.guide.smeltery') }}</h3>
        <p>
          {{ $t('s.guide.smeltery.desc') }}
        </p>
        <div class="derby-wrap">
          <div class="derby">
            <display-derby
              v-if="derby && Array.isArray(derby) && derby.length > 0"
              :set="(today = derby[derby.length - 1])"
              :ds="Number(today.DS)"
              :bonus="Number(today.BonusYield)"
            />
            <display-derby-empty v-else />
            <display-smelting-cost v-if="derby && Array.isArray(derby) && derby.length > 0" />
            <display-smelting-cost-empty v-else />
          </div>
          <div v-if="derby && Array.isArray(derby) && derby.length > 0" class="derby__date" :set="(today = derby[derby.length - 1])">
            {{ $t('s.smelting-cost.updated2') }}
          </div>
        </div>
        <p>{{ $t('s.intro-trinity.algorithm') }}</p>
        <div class="trinity-area">
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
      </div>
    </section>

    <section id="guideStep" class="section guide-draco">
      <div class="section__inner no-gutter">
        <div>
          <div class="description">
            <h4 class="title first-step">{{ $t('t.guide.smeltery.step.1') }}</h4>
            <p class="fs-14" v-html="$t('s.guide.smeltery.step.type2')"></p>
          </div>

          <div v-viewer="viewerOption" class="divide-half">
            <div class="area">
              <div class="wrap-image by-viewer">
                <img src="@/assets/img/desktop/draco/step1c.webp" alt="Game menu" />
              </div>
              <!-- <p class="text-center">OOO NPC in Bicheon Castle</p> -->
              <p class="text-center">Bicheon Castle</p>
            </div>
            <div class="area">
              <div class="wrap-image by-viewer">
                <img src="@/assets/img/desktop/draco/step2a.webp" alt="DRACO Smelter" />
              </div>
              <p class="text-center">{{ $t('t.guide.smeltery') }}</p>
            </div>
          </div>

          <div class="description">
            <h4 class="title">{{ $t('t.guide.smeltery.step.2') }}</h4>
          </div>

          <div class="divide-half">
            <dl class="area description">
              <dt>
                <span>{{ $t('t.guide.smeltery.step.2.1.subtitle') }}</span>
              </dt>
              <dd>
                <p>{{ $t('s.intro-trinity.algorithm2') }}</p>
                <p>{{ $t('s.guide.smeltery.step.2.1.content.2') }}</p>
                <p>{{ $t('s.guide.smeltery.step.2.1.content.3') }}</p>
                <p>{{ $t('s.guide.smeltery.step.2.1.content.4') }}</p>
              </dd>
            </dl>
            <dl class="area description">
              <dt>
                <span>{{ $t('t.guide.smeltery.step.2.2.subtitle') }}</span>
              </dt>
              <dd>
                <p>{{ $t('s.guide.smeltery.step.2.2.content.1') }}</p>
                <p>{{ $t('s.guide.smeltery.step.2.2.content.2') }}</p>
                <p>{{ $t('s.guide.smeltery.step.2.2.content.3') }}</p>
              </dd>
            </dl>
            <p v-show="false" class="desc-info">{{ $t('s.intro-trinity.algorithm3') }}</p>
          </div>
          <div class="description">
            <div class="divide-half">
              <div class="area">
                <h4 class="title">{{ $t('t.guide.smeltery.step.3') }}</h4>
                <p>
                  {{ $t('s.guide.smeltery.setp.3.content.1') }}
                  {{ $t('s.guide.smeltery.setp.3.content.2') }}
                </p>
              </div>
              <template>
                <!-- <v-carousel class="float-bottom" :show-arrows="false" interval="5000" cycle vertical hide-delimiters> -->
                <v-carousel
                  v-viewer="viewerOption"
                  class="list-connect-process area"
                  height="auto"
                  delimiter-icon="mdi-rhombus"
                  hide-delimiter-background
                >
                  <v-carousel-item eager>
                    <div class="wrap-image by-viewer">
                      <img src="@/assets/img/desktop/draco/connect-process1a.webp" alt="Connect Process Step#1" />
                    </div>
                    <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.1') }}</p>
                  </v-carousel-item>
                  <v-carousel-item eager>
                    <div class="wrap-image by-viewer">
                      <img src="@/assets/img/desktop/draco/connect-process2a.webp" alt="Connect Process Step#2" />
                    </div>
                    <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.2') }}</p>
                  </v-carousel-item>
                  <v-carousel-item eager>
                    <div class="wrap-image by-viewer">
                      <img src="@/assets/img/desktop/draco/connect-process3a.webp" alt="Connect Process Step#3" />
                    </div>
                    <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.3') }}</p>
                  </v-carousel-item>
                  <v-carousel-item eager>
                    <div class="wrap-image by-viewer">
                      <img src="@/assets/img/desktop/draco/connect-process4a.webp" alt="Connect Process Step#4" />
                    </div>
                    <p class="desc">{{ $t('s.guide.smeltery.step.3.screen.4') }}</p>
                  </v-carousel-item>
                </v-carousel>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="float-bottom">
      <v-carousel v-if="dracoRate" height="auto" class="part" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <draco-usd-draco />
        </v-carousel-item>
        <v-carousel-item>
          <draco-wemix-draco />
        </v-carousel-item>
        <v-carousel-item>
          <draco-usd-draco />
        </v-carousel-item>
        <v-carousel-item>
          <draco-wemix-draco />
        </v-carousel-item>
      </v-carousel>

      <v-carousel v-if="dracoRate" height="auto" class="part" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <draco-today-derby />
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost />
        </v-carousel-item>
        <v-carousel-item>
          <draco-today-derby />
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost />
        </v-carousel-item>
      </v-carousel>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, toRefs } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';
import Intersect from 'vue-intersect';
import goTo from 'vuetify/lib/services/goto';
import { useActions, useState } from 'vuex-composition-helpers/dist';

import DisplayDerby from '@/components/coin/common/draco/DisplayDerby';
import DisplayDerbyEmpty from '@/components/coin/common/draco/DisplayDerbyEmpty';
import DisplaySmeltingCost from '@/components/coin/common/draco/DisplaySmeltingCost';
import DisplaySmeltingCostEmpty from '@/components/coin/common/draco/DisplaySmeltingCostEmpty';
import DracoSmeltingCost from '@/components/coin/desktop/draco/DracoSmeltingCost';
import DracoTodayDerby from '@/components/coin/desktop/draco/DracoTodayDerby';
import DracoUsdDraco from '@/components/coin/desktop/draco/DracoUsdDraco';
import DracoWemixDraco from '@/components/coin/desktop/draco/DracoWemixDraco';
import Footer from '@/components/common/Footer';

export default defineComponent({
  components: {
    Intersect,
    DracoSmeltingCost,
    DracoTodayDerby,
    DracoWemixDraco,
    DracoUsdDraco,
    DisplaySmeltingCostEmpty,
    DisplaySmeltingCost,
    DisplayDerbyEmpty,
    DisplayDerby,
    Footer,
  },
  directives: {
    viewer: viewer({
      debug: process.env.VUE_APP_DRACO_PROFILE !== 'production',
    }),
  },
  setup() {
    const state = reactive({
      isOpen: false,
      isNavPart1: false,
      isNavPart2: false,
      isNavPart3: false,
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
    });

    const { derby, dracoRate, draco } = useState(['derby', 'dracoRate', 'draco']);
    const { fetchDracoLastest, fetchDraco, fetchDerby } = useActions(['fetchDracoLastest', 'fetchDraco', 'fetchDerby']);

    const toTargetNavScroll = (ev) => {
      ev.preventDefault();

      const targetSelector = ev.target.getAttribute('href');
      const option = {};

      goTo(targetSelector, option);
    };

    const clearNav = () => {
      state.isNavPart1 = false;
      state.isNavPart2 = false;
      state.isNavPart3 = false;
    };

    const setCurrentNavScroll = (ev) => {
      const elem = ev[0].target;
      const target = elem.getAttribute('id');

      clearNav();
      if (target === 'part1') {
        state.isNavPart1 = true;
      } else if (target === 'part2') {
        state.isNavPart2 = true;
      } else if (target === 'part3') {
        state.isNavPart3 = true;
      }
    };

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-intro-draco');
      }, 1500);
    });

    onMounted(() => {
      fetchDracoLastest();
      fetchDerby();
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-intro-draco');
    });

    return {
      ...toRefs(state),
      fetchDraco,
      fetchDerby,
      derby,
      dracoRate,
      draco,
      toTargetNavScroll,
      setCurrentNavScroll,
      clearNav,
    };
  },
});
</script>
