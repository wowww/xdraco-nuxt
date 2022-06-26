<template>
  <main class="contents playbook">
    <section class="section section1">
      <div class="section__inner">
        <hgroup class="wrap-title">
          <h2 class="dsp-title">{{ $t('t.playbook.section1') }}</h2>
          <h3 class="text-introduce">
            {{ $t('s.playbook.section1.intro1') }}<br /><br />
            {{ $t('s.playbook.section1.intro2') }}
          </h3>
        </hgroup>
      </div>
    </section>

    <section class="section section2">
      <div class="section__inner">
        <div class="dsp-basic">
          <h3 class="headword">{{ $t('t.playbook.section2') }}</h3>
          <p class="text-desc">
            {{ $t('s.playbook.section2.desc1') }}<br /><br />
            {{ $t('s.playbook.section2.desc2') }}<br /><br />
            {{ $t('s.playbook.section2.desc3') }}
          </p>
        </div>
      </div>
    </section>

    <section class="section section3">
      <div class="section__inner">
        <div class="dsp-round">
          <h3 class="headword">{{ $t('t.playbook.section3') }}</h3>
          <div class="wrap-define">
            <dl class="define duration">
              <dt>{{ $t('t.playbook.section3.duration') }}</dt>
              <dd>
                <img src="@/assets/img/desktop/playbook/round-duration.webp" width="267" alt="Round Duration" />
                <div class="text-desc">{{ $t('s.playbook.section3.duration') }}</div>
              </dd>
            </dl>
            <dl class="define entryfee">
              <dt>{{ $t('t.playbook.section3.entry') }}</dt>
              <dd>
                <img src="@/assets/img/desktop/playbook/round-entryfee.webp" width="267" alt="Round Entry Fee" />
                <div class="text-desc">{{ $t('s.playbook.section3.entry') }}</div>
              </dd>
            </dl>
            <dl class="define minimumstake">
              <dt>{{ $t('t.playbook.section3.minimum') }}</dt>
              <dd>
                <img src="@/assets/img/desktop/playbook/round-minstake.webp" width="267" alt="Round Minimum Stake" />
                <div class="text-desc">{{ $t('s.playbook.section3.minimum') }}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section4">
      <div class="section__inner">
        <div class="dsp-algorithm">
          <h3 class="headword">{{ $t('t.playbook.section4') }}</h3>
          <p class="text-desc">{{ $t('s.playbook.section4.desc') }}</p>
          <div class="wrap-formula">
            <small>{{ $t('t.playbook.section4.formula') }}</small>
            <img src="@/assets/img/desktop/playbook/formula.webp" width="672" alt="Fair-time algorithm formula" class="formula" />
            <img
src="@/assets/img/desktop/playbook/formula-graph.webp" width="960" alt="Fair-time algorithm infograph"
                 class="formula-infograph" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section5">
      <div class="section__inner">
        <div class="dsp-winning">
          <h3 class="headword">{{ $t('t.playbook.section5') }}</h3>
          <p class="text-desc">{{ $t('s.playbook.section5.desc') }}</p>
          <div class="wrap-formula">
            <small>{{ $t('t.playbook.section5.formula') }}</small>
            <img src="@/assets/img/desktop/playbook/formula-odds.png" width="592" alt="Winning odds formula" class="formula" />
            <ul class="wrap-graph">
              <li>
                <p id="oddhigher-description" class="text-desc">{{ $t('s.playbook.section5.formula1') }}</p>
                <img
                  src="@/assets/img/desktop/playbook/winning-odd-graph.webp"
                  width="440"
                  alt="Winning odds higher"
                  aria-describedby="oddhigher-description"
                />
              </li>
              <li>
                <p id="oddincrease-description" class="text-desc">{{ $t('s.playbook.section5.formula2') }}</p>
                <img
                  src="@/assets/img/desktop/playbook/winning-odd-increase.webp"
                  width="440"
                  alt="Winning Odds increase"
                  aria-describedby="oddincrease-description"
                />
              </li>
            </ul>
          </div>
          <div class="wrap-define">
            <dl class="define prestake">
              <dt>{{ $t('t.playbook.section5.prestake') }}</dt>
              <dd>
                <div class="text-desc">
                  {{ $t('s.playbook.section5.prestake1') }}
                  <small>{{ $t('s.playbook.section5.prestake2') }}</small>
                </div>
              </dd>
            </dl>
            <dl class="define stakeearlier">
              <dt>{{ $t('t.playbook.section5.stakeearlier') }}</dt>
              <dd>
                <div class="text-desc">{{ $t('s.playbook.section5.stakeearlier') }}</div>
              </dd>
            </dl>
            <dl class="define stakemore">
              <dt>{{ $t('t.playbook.section5.stakemore') }}</dt>
              <dd>
                <div class="text-desc">{{ $t('s.playbook.section5.stakemore') }}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section6">
      <div class="section__inner">
        <div class="dsp-rewards">
          <h3 class="headword">{{ $t('t.playbook.section6') }}</h3>
          <p class="text-desc">{{ $t('s.playbook.section6.intro') }}</p>
          <div class="wrap-define">
            <dl class="define winnerdraw">
              <dt>{{ $t('t.playbook.section6.winnerdraw') }}</dt>
              <dd>
                <div class="wrap-img">
                  <img src="@/assets/img/desktop/playbook/reward-odds.webp" width="440" alt="Round Duration" />
                </div>
                <div class="text-desc">{{ $t('s.playbook.section6.winnerdraw') }}</div>
              </dd>
            </dl>
            <dl class="define rewards">
              <dt>{{ $t('t.playbook.section6.rewards') }}</dt>
              <dd>
                <div class="wrap-img">
                  <img src="@/assets/img/desktop/playbook/reward-winner.webp" width="440" alt="Round Duration" />
                </div>
                <div class="text-desc">
                  {{ $t('s.playbook.section6.rewards1') }}<br /><br />
                  {{ $t('s.playbook.section6.rewards2') }}
                </div>
              </dd>
            </dl>
          </div>
          <div class="wrap-formula">
            <small>{{ $t('t.playbook.section6.formula') }}</small>
            <img src="@/assets/img/desktop/playbook/formula-reward.png" width="547" alt="Rewards Share Formula" class="formula" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section7">
      <div class="section__inner">
        <div class="dsp-youtube">
          <div class="wrap-youtube no-gutter">
            <div class="inner">
              <iframe
                width="960"
                height="540"
                src="https://www.youtube.com/embed/eguxHwvKdkU"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import Footer from '@/components/common/Footer';

export default defineComponent({
  meta: {
    title: 'DSP | XDRACO',
    hasSubNav: 'dsp',
  },
  components: {
    Footer,
  },
  beforeMount() {
    setTimeout(() => {
      document.documentElement.classList.add('init-playbook');
    }, 300);
  },
  mounted() {
    this.setLineBreak('.contents.playbook .wrap-title .dsp-title', 940);
  },
  beforeUpdate() {
    if (!this.$el.querySelector('.contents.playbook .wrap-title .dsp-title')) {
      return;
    }
    this.$el.querySelector('.contents.playbook .wrap-title .dsp-title').classList.remove('line-break');
  },
  updated() {
    this.setLineBreak('.contents.playbook .wrap-title .dsp-title', 940);
  },
  destroyed() {
    document.documentElement.classList.remove('init-playbook');
  },
  methods: {
    setLineBreak(selector, breakpoint) {
      if (!selector || !this.$el.querySelector(selector)) {
        return;
      }
      if (!breakpoint) {
        breakpoint = 200;
      }

      const properties = this.$el.querySelectorAll(selector);
      [].map.call(properties, (obj) => {
        if (obj.clientWidth >= breakpoint) {
          obj.classList.add('line-break');
        }
      });
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
</style>
