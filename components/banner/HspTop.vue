<template>
  <div class="banner-hsp-top">
    <div class="banner-hsp-top__inner">
      <h2>{{ $t('t.hsp') }}</h2>
      <p>{{ $t('s.banner-hsp-top.desc') }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'HspTop',
  setup() {
    onBeforeMount(() => {
      //
    });
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
});
</script>

<style lang="scss" scoped>
.banner-hsp-top {
  position: relative;
  --banner-height: 401px;
  background: url('~@/assets/img/desktop/hsp/bg-pc-hsp.webp') 50% top / (3200 / 2 + px) auto no-repeat;
  height: var(--banner-height);
  background-color: #000055;

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    padding-right: 0 17px;
    width: var(--section-inner-width);
    height: 100%;
    box-sizing: border-box;
    color: #fff;

    h2 {
      width: 473px;
      height: 48px;
      margin-top: 290px;
      background: url('~@/assets/img/desktop/hsp/tit-pc-hsp.webp') 50% 50% / (933 / 2 + px) auto no-repeat;
      font-size: 0;
    }
    p {
      font-weight: bold;
      margin-top: 4px;
      line-height: 24px;
      text-align: center;
    }
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba($color: #fff, $alpha: 0.2);
  }
  .is-mobile & {
    --banner-height: 313px;
    width: 100%;
    background: url('~@/assets/img/mobile/hsp/bg-mo-hsp.webp') 50% top / (1920 / 2 + px) auto no-repeat;

    .banner-hsp-top__inner {
      width: 100%;

      h2 {
        width: 229px;
        height: 61px;
        margin-top: 188px;
        background: url('~@/assets/img/mobile/hsp/tit-mo-hsp.webp') 50% 0 / cover no-repeat;
      }
      p {
        margin-top: 9px;
        line-height: 20px;
        color: rgba($color: #fff, $alpha: 0.5);
      }
    }
    &::after {
      display: none;
    }
  }
}
</style>
