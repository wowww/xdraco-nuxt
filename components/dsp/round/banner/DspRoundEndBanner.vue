<template>
  <div class="banner-dsp-end">
    <div class="banner-dsp-end__inner">
      <!-- <p class="message">END OF SEASON 2</p> -->
      <p class="message-bottom"><span>DSP SEASON 3 WILL RETURN</span><br />with more unique XDRACO items!</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'DspRoundEndBanner',
  components: {
    // DspNav,
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  setup() {
    onBeforeMount(() => {
      //
    });
  },
});
</script>

<style lang="scss">
.banner-dsp-end {
  --banner-height: 460px;
  --banner-boxsize: 102px;
  --banner-inner-width: 582px;

  position: relative;
  height: var(--banner-height);
  background: #05061b url('~@/assets/img/desktop/banner-dsp/bg-banner-dsp-end2.webp') 50% 0 / auto 100% no-repeat;
  color: #fff;

  &__inner {
    position: relative;
    margin: 0 auto;
    padding-top: 126px;
    width: var(--banner-inner-width);
    font-size: 24px;
    font-weight: bold;
    text-align: center;

    .message {
      margin-bottom: 4px;
    }
    .message-bottom {
      letter-spacing: -0.01em;
      line-height: 1.4;
      font-size: 18px;

      span {
        font-size: 2em;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .banner-dsp-end {
    --banner-height: 300px;
    --banner-boxsize: 64px;
    --banner-inner-width: 582px;

    padding: 0 var(--intro-draco-padding);
    width: 100%;
    height: var(--banner-height);
    background: url('~@/assets/img/mobile/banner-dsp/bg-banner-dsp-end2.webp') 50% 0 / auto 100% no-repeat;
    color: #fff;

    &:before {
      content: none;
    }

    &__inner {
      margin: 0 auto;
      height: 100%;
      padding-top: 80px;
      width: 323px;
      max-width: var(--intro-draco-maxwidth);
      font-size: 16px;

      .message {
        margin-bottom: 12px;
      }
      .message-bottom {
        font-size: 12px;
      }
    }
  }
}
</style>
