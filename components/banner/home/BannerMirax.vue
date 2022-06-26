<template>
  <div class="banner-mirax">
    <div class="banner-mirax__inner">
      <h2 class="banner-title">MiraX</h2>
      <p class="message">New growth system for characters <br />of the MIRAGE world.</p>
      <nuxt-link to="/mirage/dashboard" class="link">MIRAGE MiraX</nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BannerMirax',
});
</script>

<style lang="scss" scoped>
.banner-mirax {
  --banner-height: 460px;
  --inner-width: 660px;

  height: var(--banner-height);
  line-height: normal;
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: auto 100%;
  background-image: url('~@/assets/img/desktop/banner-mirax/bg-banner-open.webp'), linear-gradient(to bottom, #002 0%, #002 39%, #002 56%, #002 73%),
    linear-gradient(to bottom, #002, #002);
  color: #fff;
  box-sizing: border-box;

  .banner-mirax__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
    margin: 0 auto;
    padding-top: 144px;
    width: var(--inner-width);
    height: 100%;
  }
  .banner-title {
    font-size: 72px;
  }
  .message {
    margin-top: 4px;
    line-height: 1.15;
    font-size: 24px;
    text-align: center;
    font-weight: bold;

    span {
      + span {
        margin-left: 6px;
      }
    }
  }
  .link {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    height: 48px;
    padding: 0 32px 0 44px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to bottom, #dd714e 0%, #620 100%);
    border-image-slice: 1;
    background-image: linear-gradient(to right, #620 0%, #f40 51%, #620 100%);
    font-weight: 700;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 40px;

    &::after {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      margin-left: 4px;
      background: url('~@/assets/img/desktop/banner-mirage/icon-link-arrow.webp') no-repeat 0 0 / 100%;
    }
  }
  .is-mobile & {
    --banner-height: 400px;
    --inner-width: 320px;

    background-image: url('~@/assets/img/mobile/banner-mirax/bg-banner-open.webp'),
      linear-gradient(to bottom, #002 0%, #002 39%, #1b1e27 56%, #0c2532 73%), linear-gradient(to bottom, #180b14, #180b14);
    text-align: center;

    .banner-mirax__inner {
      padding-top: 120px;
      row-gap: 2px;
    }
    .banner-title {
      font-size: 64px;
    }
    .message {
      font-size: 18px;
    }
    .link {
      padding: 0 12px 0 24px;

      &::after {
        background-image: url('~@/assets/img/mobile/banner-mirage/icon-link-arrow.webp');
      }
    }
  }
}
</style>
