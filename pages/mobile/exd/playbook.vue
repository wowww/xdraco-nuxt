<template>
  <main class="contents exdguide">
    <section class="section section2">
      <div class="section__inner">
        <div class="exdis">
          <h3 class="headword">EXD Playbook</h3>
          <p class="text-desc">
            {{ $t('s.exd.event.playbook.desc') }}
          </p>
        </div>
      </div>
    </section>

    <section class="section section4">
      <div class="section__inner">
        <div v-viewer="viewerOption" class="exd-item">
          <h3 class="headword">{{ $t('t.exd.event.listing') }}</h3>
          <div class="wrap-define">
            <dl class="define sealing">
              <dt>{{ $t('t.exd.event.listing.step.1') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.event.listing.step.1') }}
                  <ul>
                    <li>{{ $t('s.exd.event.listing.step.1.item') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/common/exd/playbook/item-listing1.webp" alt="XDRACO Warehouse" />
                    </figure>
                    <figcaption>{{ $t('w.exd.playbook.warehouse') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define listing">
              <dt>{{ $t('t.exd.event.listing.step.2') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.event.listing.step.2') }}
                  <ul>
                    <li>{{ $t('s.exd.event.listing.step.2.item.1') }}</li>
                    <li>
                      {{ $t('s.exd.event.listing.step.2.item.2') }}
                    </li>
                    <li>{{ $t('s.exd.event.listing.step.2.item.3') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/common/exd/playbook/item-listing2.webp" :alt="$t('w.exd.event.listing')" />
                    </figure>
                    <figcaption>{{ $t('w.exd.event.listing') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section5">
      <div class="section__inner">
        <div v-viewer="viewerOption" class="exd-item">
          <h3 class="headword">{{ $t('t.exd.event.purchase') }}</h3>
          <div class="wrap-define">
            <dl class="define selecting">
              <dt>{{ $t('t.exd.event.purchase.step.1') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.event.purchase.step.1.desc') }}
                  <ul>
                    <li>
                      {{ $t('s.exd.event.purchase.step.1.desc.item.1') }}
                    </li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/common/exd/playbook/item-purchasing1.webp" alt="Item details." />
                    </figure>
                    <figcaption>Item details.</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define collecting">
              <dt>{{ $t('t.exd.playbook.purchasing.step2') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.playbook.purchasing.step2') }}
                  <ul>
                    <li>{{ $t('s.exd.event.purchase.step.2.desc.item.1') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img
                        src="@/assets/img/common/exd/playbook/item-purchasing2.webp"
                        alt="choose a character that will be receiving the XDRACO item"
                      />
                    </figure>
                    <figcaption>{{ $t('w.exd.event.purchase') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define validating">
              <dt>{{ $t('t.exd.event.purchase.step.3') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.event.purchase.step.3.desc') }}
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/common/exd/playbook/item-purchasing4.webp" alt="Purchase validation" />
                    </figure>
                    <figcaption>{{ $t('w.exd.event.purchase.validation') }}</figcaption>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define redeeming">
              <dt>{{ $t('t.exd.playbook.purchasing.step4') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.playbook.purchasing.step4') }}
                  <ul>
                    <li>{{ $t('s.exd.playbook.purchasing.step4.desc1') }}</li>
                    <li>{{ $t('s.exd.event.purchase.step.4.desc.item.2') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/common/exd/playbook/item-purchasing5.webp" alt="xdraco inventory" />
                      <figcaption>{{ $t('w.exd.playbook.inventory') }}</figcaption>
                    </figure>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section3">
      <div class="section__inner">
        <div class="exd-youtube">
          <div class="banner-notice">
            <p v-html="$t('s.exd.playbook.notice-video')"></p>
          </div>
          <div class="wrap-youtube">
            <div class="inner">
              <iframe
                width="960"
                height="540"
                src="https://www.youtube.com/embed/8lAVJQZfENo"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="allowfullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';

import Footer from '@/components/common/Footer';

export default defineComponent({
  name: 'Exchange',
  components: {
    Footer,
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup(props, { root }) {
    const state = reactive({
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
      open: false,
      loading: false,
      check: false,
      repCharacter: 0,
      walletSync: 0,
      joinParticipant: 0,
      joinable: {
        period: 0,
        nonBlock: 0,
        nonJoin: 0,
      },
    });

    return {
      ...toRefs(state),
    };
  },
  beforeMount() {
    setTimeout(() => {
      document.documentElement.classList.add('init-playbook');
    }, 300);
  },
  destroyed() {
    document.documentElement.classList.remove('init-playbook');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/exd-playbook';
</style>
