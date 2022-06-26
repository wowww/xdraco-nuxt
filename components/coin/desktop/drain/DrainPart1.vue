<template>
  <div>
    <section class="section section-drain1">
      <div class="section__inner">
        <h2 class="section-title">
          <span v-html="$t('t.drain-teaser')"></span>
          <span v-html="$t('t.drain-teaser2')"></span>
        </h2>
        <p class="available-date" v-html="$t('s.drain-teaser.section1.date')"></p>
        <h3 class="subtitle" v-html="$t('t.drain-teaser.section1')"></h3>
        <div class="wrap-context">
          <div class="wrap-thumb">
            <img src="~@/assets/img/desktop/drain-teaser/section1-thumb.webp" width="380" />
            <p class="thumb-desc">Draining of DRACO</p>
          </div>
          <p v-html="$t('s.drain-teaser.section1.part1')"></p>
          <p class="part2" v-html="$t('s.drain-teaser.section1.part2')"></p>
          <p v-html="$t('s.drain-teaser.section1.part3')"></p>
        </div>
      </div>
    </section>

    <section class="section section-drain2">
      <div class="section__inner">
        <div class="box-outline">
          <div class="title-wrap">
            <h2 class="section-title">{{ $t('t.drain-teaser.section2complete') }}</h2>
          </div>
          <p class="desc" v-html="$t('s.drain-teaser.desc2complete')"></p>
          <div class="purchased">
            <div class="purchased-heading">
              <h4>{{ $t('s.drain-teaser.purchased,.desc') }}</h4>
              <div class="data">
                <img src="~@/assets/img/desktop/drain-teaser/img-coin-hydra-big.webp" width="40" alt="" />
                <p>5,168,902<span> /10,000,000</span></p>
              </div>
            </div>
            <ul class="list-outline-type2">
              <li class="item-outline">
                <div class="subject">
                  <span>{{ $t('s.drain-teaser.drainprice') }}</span>
                </div>
                <div class="data">
                  <img src="~@/assets/img/desktop/drain-teaser/img-wmcr-symbol-sm.webp" width="40" alt="" />
                  <span>0.123</span>
                </div>
              </li>
              <li class="item-outline">
                <div class="subject">
                  <span>{{ $t('s.drain-teaser.worth') }}</span>
                </div>
                <div class="data">
                  <img src="~@/assets/img/desktop/drain-teaser/img-wmcr-symbol-sm.webp" width="40" alt="" />
                  <span>635,766<span class="sm">.5542</span></span>
                </div>
              </li>
            </ul>
          </div>
          <dl>
            <dt>{{ $t('s.drain-teaser.subtitle') }}</dt>
            <dd>{{ $t('s.drain-teaser.subdesc') }}</dd>
          </dl>
          <div class="purchased-bottom">
            <p>{{ $t('s.drain-teaser.wallet') }} : 0x000000000000000000000000000000000000dead</p>
            <a href="https://scope.wemixnetwork.com/1003/account/0x000000000000000000000000000000000000dead" target="_blank">{{
              $t('s.drain-teaser.scope')
            }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-drain3">
      <div class="section__inner">
        <div class="part">
          <h3 class="subtitle" v-html="$t('t.drain-teaser.section3.part1')"></h3>
          <p v-html="$t('s.drain-teaser.section3.part1')"></p>
        </div>
        <div class="part">
          <h3 class="subtitle" v-html="$t('t.drain-teaser.section3.part2')"></h3>
          <p v-html="$t('s.drain-teaser.section3.part2')"></p>
        </div>
        <div class="part">
          <h3 class="subtitle" v-html="$t('t.drain-teaser.section3.part3')"></h3>
          <p v-html="$t('s.drain-teaser.section3.part3')"></p>
        </div>
        <div class="remark">
          <p v-html="$t('t.drain-teaser.section3.part4')"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DrainPart1',
  components: {
    //
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/coin/_drain.scss'; // for Hydra Teaser
</style>
