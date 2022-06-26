<template>
  <div class="nft-top-banner">
    <div class="nft-top-banner__inner">
      <h2 class="bi-banner">NFT</h2>
      <p class="bi-headline">My Character, Your Legacy</p>
    </div>

    <div class="wrap-video">
      <video id="videoBannerNft" ref="videoBannerNft" class="video" preload="none" loop muted playsinline>
        <!-- <source src="@/assets/video/desktop/bg-nft-top.mp4" type="video/mp4" v-if="!isMobile" />
        <source src="@/assets/video/mobile/bg-nft-top.mp4" type="video/mp4" v-if="isMobile" /> -->
        <source :src="staticHost + '/xdraco-dsp/video/desktop/bg-nft-top.mp4'" type="video/mp4" v-if="!isMobile" />
        <source :src="staticHost + '/xdraco-dsp/video/mobile/bg-nft-top.mp4'" type="video/mp4" v-if="isMobile" />
      </video>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import MobileDetect from 'mobile-detect';

export default defineComponent({
  name: 'NftTopVideo',
  components: {
    // DspNav,
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    staticHost: process.env.VUE_APP_STATIC_HOST,
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  methods: {
    setBgVideo() {
      if (!this.$refs.videoBannerNft) {
        return;
      }
      const video = this.$refs.videoBannerNft;

      video.removeAttribute('preload');
      video.play();
    },
  },
  // beforeMount() {
  //   // this.$refs는 beforeMount 단계에서는 불러오지 못한다.
  // },
  mounted() {
    this.setBgVideo();
  },
});
</script>

<style lang="scss" scoped>
.nft-top-banner {
  --banner-height: 320px;

  position: relative;
  width: 100%;
  height: var(--banner-height);
  background-color: #000;
  color: #fff;
  line-height: normal;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(17, 17, 51, 0.5) 0%, rgba(17, 17, 51, 0.8) 100%);
  }
  &__inner {
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    position: relative;
    z-index: 2;
    margin: 0 auto;
    padding-top: 159px;
    width: var(--section-inner-width);
    height: 100%;
  }
  .wrap-video {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;

    > video {
      display: block;
      width: 1400px;
      height: 320px;
    }
  }
  .bi-banner {
    width: 132px;
    height: 56px;
    font-size: 0;
    background: url('~@/assets/img/common/banner/nft-top/bi-banner.webp') no-repeat 0 0 / 100%;
  }

  .bi-headline {
    margin-top: 8px;
    font-size: 32px;
    font-weight: 600;
  }

  .is-mobile & {
    --banner-height: 240px;

    &__inner {
      padding-top: 117px;
      width: 100%;
      max-width: 960px;
    }
    .wrap-video {
      overflow: hidden;

      > video {
        width: auto;
        height: 240px;
      }
    }
    .bi-banner {
      width: 104px;
      height: 44px;
    }
    .bi-headline {
      margin-top: 0;
      font-size: 16px;
    }
  }
}
</style>
