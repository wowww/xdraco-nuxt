<template>
  <main class="contents home">
    <currency-notice />
    <banner-carousel />
    <section class="section section-rolling-board">
      <div class="section__inner">
        <rolling-currency-board />
      </div>
    </section>

    <section class="section section0">
      <div class="section__inner">
        <div class="wrap-video" :class="{ 'wrap-video--open': isOpenVideo }">
          <iframe
            src="https://www.youtube.com/embed/DXYSD09JEcI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </section>

    <section class="section section1">
      <div class="section__inner">
        <h1 class="bi">HOME</h1>
        <p class="text-introduce" v-html="$t('s.home.section1.introduce')"></p>
      </div>
    </section>

    <section class="section section2">
      <div class="section__inner">
        <ul class="summary-brand">
          <li class="brand mirage">
            <dl class="define">
              <dt>
                <img src="@/assets/img/desktop/home/bi-mirage.webp" width="172" alt="" />
              </dt>
              <dd>Brand new character staking game<br />Welcome to the Golden Age, MIRAGE.</dd>
            </dl>
            <p class="desc">
              <strong class="text-gradient">Join Hidden Valley Capture</strong>
              <span class="text-gradient">
                <em>{{ joinDragonians }}</em>
                <span>Dragonians are currently engaged in battle</span>
              </span>
            </p>
            <div class="wrap-button">
              <span class="button">MIRAGE</span>
            </div>
            <nuxt-link to="/mirage" class="link">MIR4NFT</nuxt-link>
          </li>
          <li class="brand hsp">
            <dl class="define">
              <dt>
                <img src="@/assets/img/desktop/home/bi-hsp.webp" height="72" alt="" />
              </dt>
              <dd v-html="$t('s.home.section2.hsp.desc')"></dd>
              <dd class="info">
                <span>Total Value Locked</span>
                <div class="value-coin">
                  <img src="@/assets/img/desktop/home/ico-hydra-gold.webp" width="40" alt="" />
                  <em
                  >{{ formattedStakedAmount[0] }}<span v-if="formattedStakedAmount[1]" class="decimal">{{ formattedStakedAmount[1] }}</span></em
                  >
                </div>
                <div class="value-coin locked">
                  <img src="@/assets/img/desktop/home/logo-wemix.webp" width="16" alt="" />
                  <em
                  >{{ formattedStakeWemix[0] }}<span v-if="formattedStakeWemix[1]" class="decimal">{{ formattedStakedAmount[1] }}</span>
                  </em>
                </div>
                <div v-if="false" class="value-ap">
                  <div class="item">
                    <em>105<span class="decimal">.36%</span></em>
                    <span class="txt">APR</span>
                  </div>
                  <div class="item">
                    <em>172<span class="decimal">.05%</span></em>
                    <span class="txt">APY</span>
                  </div>
                </div>
              </dd>
            </dl>
            <div class="wrap-button">
              <span class="button">HSP</span>
            </div>
            <nuxt-link to="/hsp" class="link">HSP</nuxt-link>
          </li>
          <!-- <li class="brand dsp"> -->
          <li class="brand exchange">
            <dl class="define">
              <dt>
                <!-- <img src="@/assets/img/desktop/home/summary-bi-exchange.webp" width="236" alt=""> -->
                <img src="@/assets/img/common/banner/exd-top/bi-exd.webp" height="64" alt="" />
              </dt>
              <dd v-html="$t('s.home.section2.exchange.desc')"></dd>
            </dl>
            <div class="wrap-button">
              <span class="button">Exchange By DRACO</span>
            </div>
            <nuxt-link to="/exd/list" class="link">Exchange By DRACO</nuxt-link>
          </li>
          <li class="brand nft">
            <dl class="define">
              <dt>
                <img src="@/assets/img/desktop/home/summary-bi-nft.webp" width="154" alt="" />
              </dt>
              <dd v-html="$t('s.home.section2.nft.desc')"></dd>
            </dl>
            <div class="wrap-button">
              <span class="button">Character NFT</span>
            </div>
            <nuxt-link to="/nft" class="link">MIR4NFT</nuxt-link>
          </li>
          <li class="brand dsp-end">
            <dl class="define">
              <dt>
                <img src="@/assets/img/desktop/home/summary-bi-dsp.webp" width="175" alt="" />
              </dt>
              <dd>DSP Season 3 will return with more unique<br />XDRACO items!</dd>
            </dl>
            <div class="wrap-button">
              <span class="button">DSP ROUND LIST</span>
            </div>
            <nuxt-link to="/dsp/rounds" class="link">DSP</nuxt-link>
          </li>
          <li class="brand drain">
            <dl class="define">
              <dt>
                <img src="@/assets/img/desktop/home/bi-drain.webp" width="236" alt="" />
              </dt>
              <dd>Be Hydrated.<br />The Mystery Trader will appear.</dd>
            </dl>
            <div class="wrap-button">
              <span class="button">Learn more</span>
            </div>
            <a href="https://mir4draco.com/drain" class="link"></a>
          </li>
        </ul>
      </div>
    </section>

    <common-footer />
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { computed, defineComponent, onBeforeMount, onMounted, onUnmounted } from '@vue/composition-api';

import { separateDecimalPoint } from '@/utils/filters/numeric';

import CommonFooter from '@/components/common/Footer';
import CurrencyNotice from '@/components/common/CurrencyNotice';

import RollingCurrencyBoard from '@/components/price/RollingCurrencyBoard';
import BannerCarousel from '@/components/banner/home/BannerCarousel';

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');
const { useState: useMirageState, useActions: useMirageActions } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'HomePage',
  components: {
    BannerCarousel,
    CurrencyNotice,
    RollingCurrencyBoard,
    CommonFooter,
  },
  setup() {
    const { total, price } = useHspState(['total', 'price']);
    const { fetchTotal, fetchPrice } = useHspActions(['fetchTotal', 'fetchPrice']);
    const { valleyCapture } = useMirageState(['valleyCapture']);
    const { fetchServerInfo } = useMirageActions(['fetchServerInfo']);

    const formattedStakedAmount = computed(() => {
      return separateDecimalPoint(total.value ? total.value.totalStakedAmount : '');
    });

    const formattedStakeWemix = computed(() => {
      return separateDecimalPoint(total.value && price.value ? Number(total.value.totalStakedAmount) * Number(price.value.HydraPrice) : '');
    });

    const joinDragonians = computed(() => {
      if (valleyCapture.value) {
        let dragonians = 0;
        valleyCapture.value.serverInfo.forEach((item) => {
          if (item && item.CurrentSlotCnt) {
            dragonians += Number(item.CurrentSlotCnt);
          }
        });

        return dragonians;
      }
      return 0;
    });

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-home');
      });
    });

    onMounted(() => {
      fetchTotal();
      fetchPrice();
      fetchServerInfo();
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-home');
    });

    return {
      formattedStakedAmount,
      formattedStakeWemix,
      joinDragonians,
    };
  },
  data() {
    return {
      isOpenVideo: false,
    };
  },
  computed: {
    swiperTop() {
      const { $swiper } = this.$refs.swiperTop;
      return $swiper;
    },
    swiperOptions() {
      return {
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      };
    },
  },
  mounted() {
    setTimeout(() => {
      this.isOpenVideo = !this.isOpenVideo;
    }, 800);
  },
});
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/home';
</style>
