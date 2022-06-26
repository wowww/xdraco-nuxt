<template>
  <div class="banner-hsp-staking">
    <div class="banner-hsp-staking__inner">
      <h2 class="banner-title">{{ $t('t.hsp') }}</h2>
      <p class="message">{{ $t('s.hsp-staking.banner.desc') }}</p>
      <nuxt-link to="/hsp" class="link">{{ $t('s.hsp-staking.banner.link') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import MobileDetect from 'mobile-detect';

export default defineComponent({
  name: 'HspStaking',
  components: {
    //
  },
});
</script>

<style lang="scss" scoped>
.banner-hsp-staking {
  --banner-height: 460px;
  --inner-width: 660px;

  height: var(--banner-height);
  line-height: normal;
  background-position: 50% 0;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-image: url('~@/assets/img/desktop/banner-hsp-staking/bg-banner.webp'), linear-gradient(to bottom, #010332 57%, #030356 97%),
    linear-gradient(to bottom, #010332 0%, #030356 100%);
  color: #fff;
  font-weight: 600;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 241px;
    width: var(--inner-width);
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
  }
  .banner-title {
    width: 684px;
    height: 72px;
    font-size: 0;
    background: url('~@/assets/img/desktop/banner-hsp-staking/title-hsp.webp') no-repeat 50% 50% / 100% auto;
  }
  .message {
    margin-top: 4px;
    line-height: 1.15;
    font-size: 20px;
    text-align: center;

    span {
      + span {
        margin-left: 6px;
      }
    }
  }
  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding: 0 15px;
    border-width: 1px;
    border-style: solid;
    min-width: 180px;
    height: 48px;
    font-size: 20px;
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.25);
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to bottom, #fff 0%, #a70 100%);
    border-image-slice: 1;
    background-image: linear-gradient(90deg, #ffb800 0%, #e80 23%, #ffd84d 51%, #e80 77%, #ffb800 100%);
    box-sizing: border-box;
    color: #000;

    &::after {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-left: 4px;
      background: url('~@/assets/img/desktop/banner-hsp-staking/icon-link-arrow.webp') no-repeat 0 0 / 100%;
    }
  }
  .is-mobile & {
    --banner-height: 400px;
    --inner-width: 320px;

    background-image: url('~@/assets/img/mobile/banner-hsp-staking/bg-banner.webp'), linear-gradient(to bottom, #010332 57%, #030356 97%),
      linear-gradient(to bottom, #010332 0%, #030356 100%);
    text-align: center;

    .banner-hsp-staking__inner {
      padding-top: 187px;
    }
    .banner-title {
      width: 296px;
      height: 78px;
      background-image: url('~@/assets/img/mobile/banner-hsp-staking/title-hsp.webp');
      background-size: auto 100%;
    }
    .message {
      display: none;
    }
    .link {
      margin-top: 22px;
      min-width: 140px;

      &::after {
        background-image: url('~@/assets/img/mobile/banner-hsp-staking/icon-link-arrow.webp');
      }
    }
  }
}
</style>
