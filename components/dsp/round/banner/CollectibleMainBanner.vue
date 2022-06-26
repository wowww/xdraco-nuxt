<template>
  <div class="collectible-main-banner">
    <div class="collectible-main-banner__inner">
      <div class="wrap-message">
        <h2 class="subject">Collectibles</h2>
        <p>
          Certain XDRACO items obtained through EXD, AXD, and other gameplays are especially rare and valuable with their own designated unique
          numbers. These special items are known as Collectibles and can be characterized by the <em>‘Three Beyonds’</em>.
        </p>
      </div>
      <div v-if="!isMobile" class="wrap-define">
        <dl class="define type1">
          <dt>Beyond Expectation</dt>
          <dd>
            Unlike regular XDRACO items of the same type, Collectibles have their own distinctive and differentiating features and qualities that make
            them superior compared with regular items such as; higher safety enhancement segment(+6) for equipment and better stats on Outfits or
            Mounts.
          </dd>
        </dl>
        <dl class="define type2">
          <dt>Beyond Game</dt>
          <dd>
            From in-game items, to virtual assets, Collectibles are minted NFTs in which digital game items have evolved into virtual assets. These
            Collectibles will truly innovate your virtual asset ownership by providing you total control.
          </dd>
        </dl>
        <dl class="define type3">
          <dt>Beyond MIR4</dt>
          <dd>
            Collectibles will be transferable to items of similar value in other future games scheduled to be released via the WEMIX platform. This
            innovation will be key to maturing and expanding the blockchain gaming economy of the future, thereby not only maintaining but also
            increasing the potential value of Collectibles derived from such utility and cross-game compatibility.
          </dd>
        </dl>
      </div>

      <swiper v-if="isMobile" ref="swiperBanner" :options="swiperOptions">
        <swiper-slide>
          <div class="wrap-define">
            <dl class="define type1">
              <dt>Beyond Expectation</dt>
              <dd>
                Unlike regular XDRACO items of the same type, Collectibles have their own distinctive and differentiating features and qualities that
                make them superior compared with regular items such as; higher safety enhancement segment(+6) for equipment and better stats on
                Outfits or Mounts.
              </dd>
            </dl>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wrap-define">
            <dl class="define type2">
              <dt>Beyond Game</dt>
              <dd>
                From in-game items, to virtual assets, Collectibles are minted NFTs in which digital game items have evolved into virtual assets.
                These Collectibles will truly innovate your virtual asset ownership by providing you total control.
              </dd>
            </dl>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wrap-define">
            <dl class="define type3">
              <dt>Beyond MIR4</dt>
              <dd>
                Collectibles will be transferable to items of similar value in other future games scheduled to be released via the WEMIX platform.
                This innovation will be key to maturing and expanding the blockchain gaming economy of the future, thereby not only maintaining but
                also increasing the potential value of Collectibles derived from such utility and cross-game compatibility.
              </dd>
            </dl>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-container">
        <div id="swiperPaginationBanner" slot="pagination" class="swiper-pagination"></div>
      </div>
    </div>

    <div class="wrap-video">
      <video id="videoBgCollectible" class="video" loop muted playsinline>
        <!-- <source src="@/assets/video/desktop/bg-collectible-banner.mp4" type="video/mp4" v-if="!isMobile" />
        <source src="@/assets/video/mobile/bg-collectible-banner.mp4" type="video/mp4" v-if="isMobile" /> -->
        <source v-if="!isMobile" :src="staticHost + '/xdraco-dsp/video/desktop/bg-collectible-banner.mp4'" type="video/mp4" />
        <source v-if="isMobile" :src="staticHost + '/xdraco-dsp/video/mobile/bg-collectible-banner.mp4'" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import MobileDetect from 'mobile-detect';
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'CollectibleMainBanner',
  components: {
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    staticHost: process.env.VUE_APP_STATIC_HOST,

    // for swiper
    swiperOptions: {
      slidesPerView: 'auto',
      // slidesPerView: '100%',
      pagination: {
        // el: '.swiper-pagination',
        el: '#swiperPaginationBanner',
        clickable: true,
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      // effect: 'fade',
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      // },
      // centeredSlides: true,
      // spaceBetween: 30,
      // loop: true,
      // allowTouchMove: false,
    },
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    swiperBanner() {
      return this.$refs.swiperBanner.$swiper;
    },
  },
  // created() {
  //   console.log('created');
  // },
  mounted() {
    setTimeout(() => {
      document.documentElement.classList.add('init--collectible-banner');
    }, 10);
    setTimeout(() => {
      if (!document.querySelector('#videoBgCollectible')) {
        return;
      }
      const video = document.querySelector('#videoBgCollectible');
      video.play();
    }, 1000);
  },
  destroyed() {
    document.documentElement.classList.remove('init--collectible-banner');
  },
});
</script>

<style lang="scss" scoped>
.collectible-main-banner {
  --banner-height: 620px;

  overflow: hidden;
  position: relative;
  padding-top: 100px;
  height: var(--banner-height);
  background-color: #000;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, #0d0d39, rgba(2, 2, 25, 0.7));
  }
  &__inner {
    position: relative;
    z-index: 2;
    margin: 0 auto;
    width: var(--section-inner-width);
  }
  .wrap-video {
    position: absolute;
    top: 0;
    left: calc(50% - 600px);
    z-index: 0;
    width: 1200px;

    .video {
      width: 1200px;
      height: 675px;
      opacity: 0;
      transition: opacity 800ms 0.2s ease-in;
    }
  }
  .wrap-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding-top: 4px;
    max-width: 720px;
    height: 240px;
    color: #fff;
    line-height: 1.3;
    font-size: 17px;
    text-align: center;
    // background-color: rgba(blue, 0.2);
    box-sizing: border-box;

    em {
      font-weight: 700;
      color: #0a0;
    }
    .subject {
      margin-bottom: 12px;
      line-height: 1.1;
      font-weight: 700;
      font-size: 56px;
    }
  }
  .wrap-define {
    display: flex;

    .define {
      flex: 1;
      position: relative;
      padding: 24px;
      width: 400px;
      height: 280px;
      line-height: 1.43;
      font-size: 14px;
      color: rgba(#fff, 0.5);
      box-sizing: border-box;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(125deg, #1d1d50 0%, rgba(12, 12, 44, 0.5) 100%);
      }
      dt {
        display: block;
        margin-bottom: 16px;
        font-size: 18px;
        font-weight: 700;
        color: #0a0;
      }
      dd {
        word-break: break-word;
      }
      &.type1 {
        background: url('~@/assets/img/common/banner/collectible-main-banner/bg-collectible-define1.webp') 100% 100% / 242px 184px no-repeat;
      }
      &.type2 {
        background: url('~@/assets/img/common/banner/collectible-main-banner/bg-collectible-define2.webp') 100% 100% / 303px 160px no-repeat;
      }
      &.type3 {
        background: url('~@/assets/img/common/banner/collectible-main-banner/bg-collectible-define3.webp') 100% 100% / 218px 205px no-repeat;
      }
    }
  }
  .swiper-pagination {
    margin-top: 20px;
  }

  .is-mobile & {
    margin-bottom: 40px;
    padding-top: 0;
    height: auto;
    background-image: none;
    background-color: transparent;

    &::before {
      height: 300px;
    }
    .wrap-video {
      overflow: hidden;
      left: 0;
      width: 100%;
      height: 300px;

      .video {
        position: absolute;
        top: 0;
        left: calc(50% - 400px);
        width: 800px;
        height: 450px;
      }
    }
    .wrap-message {
      margin-bottom: 4px;
      padding: 0 24px;
      height: 300px;
      // background-image: linear-gradient(to top, #0d0d39, rgba(2, 2, 25, 0.7));

      .subject {
        font-size: 40px;
      }
    }
    .wrap-define {
      display: block;
      // flex-direction: column;

      .define {
        flex: none;
        width: 100%;
        text-align: center;
      }
    }
  }

  .init--collectible-banner & {
    .wrap-video {
      .video {
        opacity: 1;
      }
    }
  }
}
</style>
