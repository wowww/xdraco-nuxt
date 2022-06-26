<template>
  <main class="contents exd-event">
    <section class="section section1">
      <div class="section__inner">
        <hgroup class="wrap-title">
          <h2 class="exd-title"><em class="hidden">Exchange by DRACO</em></h2>
          <h3 class="text-introduce">{{ $t('s.exd.available.date') }}</h3>
          <h3 class="event-title">
            <em class="hidden">EXD Kickoff Event</em>
          </h3>
        </hgroup>
        <div class="wrap-preparate">
          <h4 class="event-title">{{ $t('s.exd.event.prepare.title') }}</h4>
          <p class="desc" v-html="$t('s.exd.event.prepare.desc')" />
        </div>
        <div class="event-content">
          <strong
            class="notice"
            :class="{ alert: check && (!repCharacter || !walletSync || !joinable.nonBlock || (joinable.nonJoin && joinParticipant >= 50000)) }"
          >
            <template v-if="!check">
              {{ $t('s.exd.event.message.normal') }}
            </template>
            <template v-else-if="check && !joinable.nonJoin">
              {{ $t('s.exd.event.message.already-join') }}
            </template>
            <template v-else-if="check && 50000 <= joinParticipant">
              {{ $t('s.rounds.event.early.end2') }}
            </template>
            <template v-else-if="check && joinable.nonJoin && (!repCharacter || !walletSync || !joinable.nonBlock)">
              {{ $t('s.exd.event.message.try-again') }}
            </template>
            <template
              v-else-if="check && joinable.nonJoin && repCharacter && walletSync && joinable.nonBlock && joinable.period && joinParticipant < 50000"
            >
              {{ $t('s.rounds.event.message.allpass') }}
            </template>
          </strong>
          <ul class="event-step" :class="{ loading: loading }">
            <li class="step1" :class="{ alert: !loading && check && !repCharacter, active: !loading && check && repCharacter }">
              <div class="wrap-detail">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else>
                  <span class="ico-checked"><em class="hidden">Checked</em></span>
                  <div class="goal">
                    <div class="level">
                      <small>LEVEL</small>
                      <strong>40</strong>
                    </div>
                  </div>
                  <div class="condition">
                    <template v-if="check && !repCharacter">
                      {{ $t('s.exd.event.message.rep-char') }}
                      <a href="#" class="setting" @click="openCharacterModal">{{ $t('w.exd.event.btn.rep-char') }}</a>
                    </template>
                    <template v-else>{{ $t('s.exd.event.message.step1.normal') }} </template>
                  </div>
                </template>
              </div>
            </li>
            <li class="step2" :class="{ alert: !loading && check && !walletSync, active: !loading && check && walletSync }">
              <div class="wrap-detail">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else>
                  <span class="ico-checked"><em class="hidden">Checked</em></span>
                  <div class="goal">
                    <div class="wallet">
                      <small>WEMIX WALLET</small>
                      <strong class="ico-wemix ico-sm"><em class="hidden">wemix wallet icon</em></strong>
                    </div>
                  </div>
                  <div class="condition">{{ $t('s.exd.event.message.step2.normal') }}</div>
                </template>
              </div>
            </li>
            <li class="step3" :class="{ alert: !loading && check && joinParticipant >= 50000, active: !loading && check && joinParticipant < 50000 }">
              <div class="wrap-detail">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else>
                  <span class="ico-checked"><em class="hidden">Checked</em></span>
                  <div class="goal">
                    <div v-if="!check" class="membercount nosync">
                      <small>{{ $t('w.rounds.reward.total') }}</small>
                      <strong>50K</strong>
                    </div>
                    <div v-else class="membercount">
                      <small>{{ $t('w.rounds.participants') }}</small>
                      <strong>{{ joinParticipant | currency(0) }}</strong>
                    </div>
                  </div>
                  <div class="condition">
                    <template v-if="joinParticipant < 50000">
                      {{ $t('s.exd.event.message.step3.normal') }}
                    </template>
                    <template v-else>
                      {{ $t('s.rounds.event.message.exhauted') }}
                    </template>
                  </div>
                </template>
              </div>
            </li>
          </ul>
          <div class="wrap-button">
            <button
              v-if="!dracoAccessToken"
              type="button"
              class="btn"
              :class="{ 'btn-checknow': !loading }"
              :disabled="loading"
              @click="setOpenDracoLogin(true)"
            >
              <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
              <template v-else> CHECK NOW</template>
            </button>
            <template v-else>
              <button v-if="!check" type="button" class="btn" :class="{ 'btn-checknow': !loading }" :disabled="loading" @click="fetchEventAirDrop">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else> CHECK NOW</template>
              </button>
              <button v-else-if="joinable.nonJoin === 0" type="button" class="btn" :disabled="true" @click="fetchEventAirDrop">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else>{{ $t('w.exd.event.btn.claimed') }}</template>
              </button>
              <button
                v-else-if="
                  joinable.nonJoin === 1 &&
                  joinable.nonBlock === 1 &&
                  joinable.period === 1 &&
                  repCharacter === 1 &&
                  walletSync === 1 &&
                  joinParticipant < 50000
                "
                type="button"
                class="btn btn-reward"
                @click="postEventAirDrop"
              >
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else>{{ $t('w.exd.event.claim-reward') }}</template>
              </button>
              <button v-else type="button" class="btn" :disabled="true" @click="fetchEventAirDrop">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                <template v-else>{{ $t('w.exd.event.claim-reward') }}</template>
              </button>
            </template>
          </div>
        </div>
      </div>
    </section>

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

    <section class="section section3">
      <div class="section__inner">
        <div class="exd-youtube">
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
                      <img src="@/assets/img/desktop/promotion/2112-exd/exd-sealing-1.webp" alt="XDRACO Warehouse" /><!-- 다국어도 alt 챙겨주세요. -->
                      <figcaption>{{ $t('w.exd.event.purchase.inventory') }}</figcaption>
                    </figure>
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
                      <img src="@/assets/img/desktop/promotion/2112-exd/exd-listing-1.webp" :alt="$t('w.exd.event.listing')" />
                      <figcaption>{{ $t('w.exd.event.listing') }}</figcaption>
                    </figure>
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
                      <img src="@/assets/img/desktop/promotion/2112-exd/exd-selecting-1.webp" alt="Item details." />
                      <figcaption>Item details.</figcaption>
                    </figure>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define collecting">
              <dt>{{ $t('t.exd.event.purchase.step.2') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.event.purchase.step.2.desc') }}
                  <ul>
                    <li>{{ $t('s.exd.event.purchase.step.2.desc.item.1') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img
                        src="@/assets/img/desktop/promotion/2112-exd/exd-collecting-1.webp"
                        alt="choose a character that will be receiving the XDRACO item"
                      />
                      <figcaption>{{ $t('s.exd.event.purchase.select-char') }}</figcaption>
                    </figure>
                  </div>
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/desktop/promotion/2112-exd/exd-collecting-2.webp" alt="Purchase" />
                      <figcaption>{{ $t('w.exd.event.purchase') }}</figcaption>
                    </figure>
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
                      <img src="@/assets/img/desktop/promotion/2112-exd/exd-validating-1.webp" alt="Purchase validation" />
                      <figcaption>{{ $t('w.exd.event.purchase.validation') }}</figcaption>
                    </figure>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="define redeeming">
              <dt>{{ $t('t.exd.event.purchase.step.4') }}</dt>
              <dd>
                <div class="desc">
                  {{ $t('s.exd.event.purchase.step.4.desc') }}
                  <ul>
                    <li>{{ $t('s.exd.event.purchase.step.4.desc.item.1') }}</li>
                    <li>{{ $t('s.exd.event.purchase.step.4.desc.item.2') }}</li>
                  </ul>
                </div>
                <div class="wrap-img">
                  <div class="area">
                    <figure class="wrap-image by-viewer">
                      <img src="@/assets/img/desktop/promotion/2112-exd/exd-redeeming-1.webp" alt="In-game mailbox." />
                      <figcaption>{{ $t('w.exd.event.purchase.mailbox') }}</figcaption>
                    </figure>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <v-dialog v-model="open" content-class="dialog-exdevent theme-dark" max-width="720" persistent :fullscreen="isMobile">
      <div class="content">
        <v-btn class="btn-close" fab plain x-small @click="closeModal">
          <v-icon color="#fff" size="26">mdi-close</v-icon>
        </v-btn>
        <div class="event-content">
          <div class="wrap-reward">
            <img src="@/assets/img/desktop/promotion/2111/reward-1draco.webp" width="293" alt="REWARD 1DRACO" class="ticket" />
            <h4 class="message" v-html="$t('s.exd.event.message.reward.title')"></h4>
            <p class="desc" v-html="$t('s.exd.event.message.reward.desc')"></p>
          </div>

          <div class="wrap-button">
            <button type="button" class="btn btn-primary2" :disabled="loading" @click="closeModal">
              <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate></v-progress-circular>
              <template v-else>OK</template>
            </button>
          </div>
        </div>
      </div>
    </v-dialog>
    <Footer />
  </main>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import Footer from '@/components/common/Footer';

const { useState: useAccountState, useMutations: useAccountMutations } = createNamespacedHelpers('account');

export default defineComponent({
  components: {
    Footer,
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup(props, { root }) {
    const { dracoAccessToken } = useState(['dracoAccessToken']);
    const { setOpenDracoLogin } = useMutations(['setOpenDracoLogin']);
    const { open: openAccount } = useAccountState(['open']);
    const { setOpen, setActive } = useAccountMutations(['setOpen', 'setActive']);

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

    const fetchEventAirDrop = () => {
      state.loading = true;
      root.$dracoWebApi
        .get('/event/airdrop')
        .then(({ data }) => {
          if (data.data) {
            const { joinParticipant, repCharacter, walletSync, joinable } = data.data;
            state.check = true;
            state.joinParticipant = joinParticipant;
            state.repCharacter = repCharacter;
            state.walletSync = walletSync;
            state.joinable = { ...joinable };
          }
        })
        .catch(() => {
          state.check = false;
          state.joinParticipant = 0;
          state.repCharacter = 0;
          state.walletSync = 0;
          state.joinable = {
            period: 0,
            nonBlock: 0,
            nonJoin: 0,
          };
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const postEventAirDrop = () => {
      state.loading = true;
      root.$dracoWebApi
        .post('/event/airdrop')
        .then(({ data }) => {
          if (data.code === 200) {
            state.open = true;
            state.joinable = { ...state.joinable, nonJoin: 0 };
          } else {
            state.eventError = true;
            state.eventErrorCode = data.code;
          }
        })
        .catch(() => {})
        .finally(() => {
          state.loading = false;
        });
    };

    const closeModal = () => {
      state.open = false;
    };

    const openCharacterModal = () => {
      setActive(0);
      setOpen(true);
    };

    watch(
      () => dracoAccessToken.value,
      (current) => {
        if (!current) {
          state.check = false;
          state.joinParticipant = 0;
          state.repCharacter = 0;
          state.walletSync = 0;
          state.joinable = {
            period: 0,
            nonBlock: 0,
            nonJoin: 0,
          };
        }
      },
    );

    watch(
      () => openAccount.value,
      () => {
        if (dracoAccessToken.value) {
          fetchEventAirDrop();
        }
      },
    );

    onMounted(() => {
      if (dracoAccessToken.value) {
        fetchEventAirDrop();
      }
    });

    return {
      ...toRefs(state),
      dracoAccessToken,
      setOpenDracoLogin,
      fetchEventAirDrop,
      openCharacterModal,
      postEventAirDrop,
      closeModal,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/exd-event2112';
</style>
