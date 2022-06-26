<template>
  <div>
    <section class="section section-drain1">
      <div class="section__inner">
        <h2 class="section-title-part2">
          <span>{{ $t('t.drain-teaser2.section1.title1') }}</span>
          <span>{{ $t('t.drain-teaser2.section1.title2') }}</span>
        </h2>
        <!--        <p class="available-date">{{ $t('s.drain-teaser2.section1.date.des') }}<br />{{ $t('s.drain-teaser2.section1.date') }}</p>-->
      </div>
    </section>
    <section class="section section-drain2">
      <div class="section__inner">
        <div class="box-outline">
          <div class="title-wrap">
            <h2 class="section-title0">Hydration Report</h2>
          </div>
          <p class="desc" v-html="$t('s.coin.drain.hydration-report.part1')"></p>
          <div class="purchased">
            <ul class="list-outline-type2">
              <li class="item-outline">
                <div class="subject mt-4">
                  <span>Procured HYDRAs</span>
                </div>
                <div class="data">
                  <img src="~@/assets/img/desktop/drain-part2/coin-hydra.webp" width="24" alt="HYDRA" />
                  <span>921,856</span>
                </div>
              </li>
              <li class="item-outline">
                <div class="subject mt-4">
                  <span>Total Purchase Value</span>
                </div>
                <div class="data">
                  <img src="~@/assets/img/desktop/drain-teaser/img-wmcr-symbol-sm.webp" width="24" alt="" />
                  <span>4,000,000</span>
                </div>
              </li>
            </ul>
            <div class="purchased__period"><span class="purchased__period--title">Hydration Period : </span> Feb. 16th, 2022 to May. 20th, 2022</div>
          </div>
          <dl>
            <dt>{{ $t('s.drain-teaser.subtitle') }}</dt>
            <dd v-html="$t('s.coin.drain.hydration-report.part2-1')"></dd>
            <dd style="margin-top: 12px" v-html="$t('s.coin.drain.hydration-report.part2-2')"></dd>
          </dl>
          <div class="purchased-bottom">
            <p>{{ $t('s.drain-teaser.wallet') }} : 0x05f9123cb8d60b20368067e979309e9b54bf60a5</p>
            <a href="https://scope.wemixnetwork.com/1003/account/0x05f9123cb8d60b20368067e979309e9b54bf60a5" target="_blank">{{
                $t('s.drain-teaser.scope')
              }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-drain1">
      <div class="section__inner">
        <div class="wrap-context">
          <div class="wrap-thumb">
            <img src="~@/assets/img/mobile/drain-part2/section1-thumb.webp" width="329" />
            <p class="thumb-desc">Hydration</p>
          </div>
          <h3 class="subtitle" v-html="$t('t.drain-teaser.section1')"></h3>
          <p v-html="$t('s.drain-teaser2.section1.des1')"></p>
          <p v-html="$t('s.drain-teaser2.section1.des2')"></p>
          <p v-html="$t('s.drain-teaser2.section1.des3')"></p>
          <p v-html="$t('s.drain-teaser2.section1.des4')"></p>
        </div>
      </div>
    </section>

    <section class="section section-drain3">
      <div class="section__inner">
        <div class="part">
          <h3 class="subtitle">{{ $t('t.drain-teaser2.section1.sub1') }}</h3>
          <p v-html="$t('s.drain-teaser2.section1.sub.des1')"></p>
        </div>
        <div class="part">
          <h3 class="subtitle">{{ $t('t.drain-teaser2.section1.sub2') }}</h3>
          <p v-html="$t('s.drain-teaser2.section1.sub.des2')"></p>
        </div>
        <div class="part">
          <h3 class="subtitle">{{ $t('t.drain-teaser2.section1.sub3') }}</h3>
          <p v-html="$t('s.drain-teaser2.section1.sub.des3')"></p>
        </div>
        <div class="remark">
          <p v-html="$t('s.drain-teaser2.section1.comment')"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DrainPart2',
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
@import '~@/assets/sass/common/pages/coin/drain'; // for Hydra Teaser
</style>
