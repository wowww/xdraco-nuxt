<template>
  <main class="contents hsp-playbook">
    <div class="top-banner">
      <div class="top-inner">
        <h2>{{ $t('t.hsp-playbook.top.title') }}</h2>
      </div>
    </div>

    <section class="section structure-area">
      <div class="section__inner">
        <dl>
          <dt>{{ $t('s.hsp-playbook.top.desc1') }}</dt>
          <dd>{{ $t('s.hsp-playbook.top.desc2') }}</dd>
        </dl>
        <div class="between-area">
          <div>
            <h3 class="title-type1">{{ $t('t.hsp-playbook.structure.title') }}</h3>
            <p class="desc-type1">{{ $t('s.hsp-playbook.structure.desc1') }}</p>
            <p class="desc-type1">{{ $t('s.hsp-playbook.structure.desc2') }}</p>
          </div>
          <div class="structure"></div>
        </div>
      </div>
    </section>

    <section class="section features-area">
      <div class="section__inner">
        <div class="features-wrap">
          <h3 class="title-type1 mt-40">{{ $t('t.hsp-playbook.features.title') }}</h3>
          <div class="between-area">
            <dl>
              <dt>{{ $t('t.hsp-playbook.features.subtitle1') }}</dt>
              <dd>{{ $t('t.hsp-playbook.features.desc1') }}</dd>
            </dl>
            <dl>
              <dt>{{ $t('t.hsp-playbook.features.subtitle2') }}</dt>
              <dd>{{ $t('t.hsp-playbook.features.desc2') }}</dd>
            </dl>
          </div>
          <div class="features"></div>
          <ul class="list-type1">
            <li>{{ $t('t.hsp-playbook.features.list1') }}</li>
            <li>{{ $t('t.hsp-playbook.features.list2') }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section section-forecasted">
      <div class="section__inner">
        <h3 class="section-title" v-html="$t('t.hsp-teaser.forecasted.title')"></h3>
        <p class="desc" v-html="$t('s.hsp-teaser.forecasted.desc')"></p>
        <h4 class="sub-title" v-html="$t('t.hsp-teaser.forecasted.summary.caption')"></h4>
        <ul class="list-summary">
          <li v-html="$t('s.hsp-teaser.forecasted.summary.desc1')"></li>
          <li v-html="$t('s.hsp-teaser.forecasted.summary.desc2')"></li>
        </ul>
        <div class="tbl-wrap">
          <table class="tbl-stake">
            <thead>
              <tr>
                <th scope="col">Total Staked Volume</th>
                <th scope="col">APR</th>
                <th scope="col">APY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100,000 HYD</td>
                <td>977.62%</td>
                <td>1,074,654.09%</td>
              </tr>
              <tr>
                <td>200,000 HYD</td>
                <td>488.81%</td>
                <td>10,279.79%</td>
              </tr>
              <tr>
                <td>300,000 HYD</td>
                <td>325.87%</td>
                <td>2,109.25%</td>
              </tr>
              <tr>
                <td>400,000 HYD</td>
                <td>244.40%</td>
                <td>919.13%</td>
              </tr>
              <tr>
                <td>500,000 HYD</td>
                <td>195.52%</td>
                <td>540.62%</td>
              </tr>
            </tbody>
          </table>
          <table class="tbl-stake">
            <thead>
              <tr>
                <th scope="col">Total Staked Volume</th>
                <th scope="col">APR</th>
                <th scope="col">APY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>600,000 HYD</td>
                <td>162.94%</td>
                <td>370.09%</td>
              </tr>
              <tr>
                <td>700,000 HYD</td>
                <td>139.66%</td>
                <td>276.85%</td>
              </tr>
              <tr>
                <td>800,000 HYD</td>
                <td>122.20%</td>
                <td>219.26%</td>
              </tr>
              <tr>
                <td>900,000 HYD</td>
                <td>108.62%</td>
                <td>180.63%</td>
              </tr>
              <tr>
                <td>1,000,000 HYD</td>
                <td>97.76%</td>
                <td>153.12%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="list-caution">
          <li v-html="$t('s.hsp-teaser.forecasted.caution1')"></li>
          <li v-html="$t('s.hsp-teaser.forecasted.caution2')"></li>
          <li v-html="$t('s.hsp-teaser.forecasted.caution3')"></li>
        </ul>
      </div>
    </section>

    <section class="section reward-area">
      <div class="section__inner">
        <h3 class="title-type1">{{ $t('t.hsp-playbook.reward.title') }}</h3>
        <div class="between-area">
          <div>
            <p class="desc-type1">{{ $t('t.hsp-playbook.reward.desc') }}</p>
            <ul class="list-type1 mt-16">
              <li v-html="$t('t.hsp-playbook.reward.list1')"></li>
              <li v-html="$t('t.hsp-playbook.reward.list2')"></li>
            </ul>
          </div>
          <div class="reward"></div>
        </div>
      </div>
    </section>

    <section class="section unstaking-area">
      <div class="section__inner">
        <h3 class="title-type1">{{ $t('t.hsp-playbook.unstaking.title') }}</h3>
        <div class="between-area">
          <div>
            <p class="desc-type1">{{ $t('t.hsp-playbook.unstaking.desc') }}</p>
            <ul class="list-type1 mt-16">
              <li v-html="$t('t.hsp-playbook.unstaking.list1')"></li>
              <li v-html="$t('t.hsp-playbook.unstaking.list2')"></li>
            </ul>
          </div>
          <div class="unstaking"></div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';

import Footer from '@/components/common/Footer';

export default defineComponent({
  name: 'HspPlaybook',
  meta: {
    title: 'HSP | XDRACO',
    hasSubNav: 'hsp',
  },
  components: {
    Footer,
  },
  setup() {
    onBeforeMount(() => {
      //
    });

    onMounted(() => {
      //
    });
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  methods: {
    //
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/common/pages/hsp';
@import '~@/assets/sass/common/pages/hsp-playbook';
</style>
