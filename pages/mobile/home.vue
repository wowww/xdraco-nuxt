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
            frameborder="0"
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
                <img src="@/assets/img/desktop/home/bi-mirage.webp" width="116" alt="" />
              </dt>
              <dd>Brand new character staking game<br />Welcome to the Golden Age, MIRAGE.</dd>
            </dl>
            <div class="wrap-button">
              <span class="button">MIRAGE</span>
            </div>
            <p class="desc">
              <strong class="text-gradient">Join Hidden Valley Capture</strong>
              <span class="text-gradient">
                <em>{{ joinDragonians | currency(0) }}</em>
                <span>Dragonians are currently engaged in battle</span>
              </span>
            </p>
            <nuxt-link to="/mirage" class="link">MIR4NFT</nuxt-link>
          </li>
          <li class="brand hsp">
            <dl class="define">
              <dt>
                <img src="@/assets/img/mobile/home/bi-hsp.webp" width="123" alt="" />
              </dt>
              <dd v-html="$t('s.home.section2.hsp.desc')"></dd>
            </dl>
            <div class="wrap-button">
              <span class="button">HSP</span>
            </div>
            <div class="info">
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
                  <em
                  >105
                    <span class="decimal">.36%</span>
                  </em>
                  <span class="txt">APR</span>
                </div>
                <div class="item">
                  <em
                  >172
                    <span class="decimal">.05%</span>
                  </em>
                  <span class="txt">APY</span>
                </div>
              </div>
            </div>
            <nuxt-link to="/hsp" class="link">HSP</nuxt-link>
          </li>
          <!-- <li class="brand dsp"> -->
          <li class="brand exchange">
            <dl class="define">
              <dt>
                <img src="@/assets/img/mobile/home/summary-bi-exd.webp" width="126" alt="" />
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
                <img src="@/assets/img/desktop/home/summary-bi-nft.webp" width="112" alt="" />
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
                <img src="@/assets/img/desktop/home/summary-bi-dsp.webp" width="98" alt="" />
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
                <img src="@/assets/img/desktop/home/bi-drain.webp" width="158" alt="" />
              </dt>
              <dd>Be Hydrated.<br />The Mystery Trader will appear.</dd>
            </dl>
            <div class="wrap-button">
              <span class="button">Learn more</span>
            </div>
            <nuxt-link to="/nft" class="link">MIR4NFT</nuxt-link>
            <a href="https://mir4draco.com/drain" class="link"></a>
          </li>
        </ul>
      </div>
    </section>

    <Footer></Footer>
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { defineComponent, onBeforeMount, onMounted, onUnmounted } from '@vue/composition-api';

import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import BannerCarousel from '@/components/banner/home/BannerCarousel';
import BannerBossRaid from '@/components/banner/home/BannerBossRaid';
import BannerMirax from '@/components/banner/home/BannerMirax';
import BannerHspStaking from '@/components/banner/home/HspStaking';
import { separateDecimalPoint } from '@/utils/filters/numeric';
import CurrencyNotice from '@/components/common/CurrencyNotice';
import RollingCurrencyBoard from '@/components/price/RollingCurrencyBoard';
import Footer from '@/components/common/Footer';

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');
const { useState: useMirageState, useActions: useMirageActions } = createNamespacedHelpers('mirage');

export default defineComponent({
  components: {
    BannerCarousel,
    BannerMirax,
    RollingCurrencyBoard,
    Swiper,
    SwiperSlide,
    CurrencyNotice,
    Footer,
    BannerHspStaking,
    BannerBossRaid,
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
      }, 500);
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
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',

    // for swiper
    swiperOptions: {
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    },
    isOpenVideo: false,
  }),
  computed: {
    swiperTop() {
      return this.$refs.swiperTop.$swiper;
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

.contents.home {
  .section {
    margin: 0;
  }
}
</style>
