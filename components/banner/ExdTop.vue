<template>
  <div class="exchange-main-banner">
    <div class="exchange-main-banner__inner">
      <h2 class="bi-exd">EXD</h2>
      <p class="message">Exchange your XDRACO items by DRACO</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'ExdTop',
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

<style lang="scss" scoped>
.exchange-main-banner {
  --banner-height: 460px;

  height: var(--banner-height);
  background-image: url('~@/assets/img/common/banner/exd-top/bg-banner.webp'), linear-gradient(to bottom, #11001e, #1e0035);
  background-position: 50% 0;
  background-size: auto 100%;
  background-repeat: no-repeat;

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding-right: 0 17px;
    width: var(--section-inner-width);
    height: 100%;
    box-sizing: border-box;

    .bi-exd {
      margin-bottom: 24px;
      width: 252px;
      height: 96px;
      font-size: 0;
      background: url('~@/assets/img/common/banner/exd-top/bi-exd.webp') 50% 0 / auto 100% no-repeat;
    }
    .message {
      line-height: 1.14;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }
  }
  .is-mobile & {
    --banner-height: 300px;

    // margin-bottom: 24px;
    width: 100%;
    background-image: url('~@/assets/img/common/banner/exd-top/bg-banner-mobile.webp'), linear-gradient(to bottom, #11001e, #1e0035);

    .exchange-main-banner__inner {
      padding-top: 48px;
      width: 100%;

      .bi-exd {
        margin-bottom: 16px;
        width: 168px;
        height: 64px;
      }
      .message {
        max-width: 280px;
        line-height: 1.14;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
</style>
