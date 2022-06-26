<template>
  <div ref="section">
    <h3 class="title-sub-detail">Spirit1</h3>
    <div class="wrap-spirit">
      <v-tabs v-model="selectedDeck">
        <v-tab class="tab-spirit-item">
          <span>Deck 1</span>
        </v-tab>
        <v-tab class="tab-spirit-item">
          <span>Deck 2</span>
        </v-tab>
        <v-tab class="tab-spirit-item text-lg">
          <span>fontSize16</span>
        </v-tab>
        <v-tab class="tab-spirit-item text-lg">
          <span>fontSize16 2</span>
        </v-tab>
        <v-tab class="tab-spirit-item text-lg" disabled>
          <span>fontSize16 3 disabled</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items class="wrap-tabs-item" v-model="selectedDeck">
        <v-tab-item class="wrap-item-circle">
          <ul class="list-item">
            <li class="uncommon">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character01.webp" width="72" alt="" />
                  <span class="tier-badge">III</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Bunny Guru Hoppy</span>
                <span class="category">Forest Spirit</span>
              </div>
            </li>
            <li class="rare">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character02.webp" width="72" alt="" />
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon Horyong</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="epic">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character03.webp" width="72" alt="" />
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="legendary">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character04.webp" width="72" alt="" />
                  <span class="tier-badge">IV</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon Horyong</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
          </ul>
        </v-tab-item>

        <v-tab-item class="wrap-item-circle">
          <ul class="list-item">
            <li class="common">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character01.webp" width="72" alt="" />
                  <span class="tier-badge">III</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Bunny</span>
              </div>
            </li>
            <li class="uncommon">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character02.webp" width="72" alt="" />
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon Horyong Little Azure Dragon Horyong Little Azure Dragon Horyong</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="rare">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character03.webp" width="72" alt="" />
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon</span>
                <span class="category">Wind Spirit Wind Spirit Wind Spirit Wind Spirit</span>
              </div>
            </li>
          </ul>
        </v-tab-item>

        <v-tab-item class="wrap-item-circle">
          <ul class="list-item">
            <li class="common">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character01.webp" width="72" alt="" />
                  <span class="tier-badge">III</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Bunny Guru Hoppy</span>
                <span class="category">Forest Spirit</span>
              </div>
            </li>
            <li class="uncommon">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character02.webp" width="72" alt="" />
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon Horyong</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="rare">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character03.webp" width="72" alt="" />
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="epic">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character04.webp" width="72" alt="" />
                  <span class="tier-badge">IV</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon Horyong</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="legendary">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character04.webp" width="72" alt="" />
                  <span class="tier-badge">IV</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Little Azure Dragon Horyong</span>
                <span class="category">Wind Spirit</span>
              </div>
            </li>
            <li class="common">
              <div class="wrap-thumb">
                <span class="bg">
                  <img src="@/assets/img/common/nft-detail/@character01.webp" width="72" alt="" />
                  <span class="tier-badge">III</span>
                </span>
              </div>
              <div class="desc">
                <span class="name">Bunny Guru Hoppy</span>
                <span class="category">Forest Spirit</span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
          </ul>
        </v-tab-item>
        <v-tab-item class="wrap-item-circle">
          <ul class="list-item">
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
            <li>
              <div class="wrap-thumb">
                <span class="bg"></span>
              </div>
            </li>
          </ul>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterSpirit1',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      selectedDeck: 0,
    });
    const fetchStat = () => {
      console.log('fetchStat');
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/stats', { params: { transportID: item.value.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          state.stats = data.data;
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value) {
        fetchStat();
      }
    });

    onUnmounted(() => {
      stop();
    });
    return {
      section,
      ...toRefs(state),
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
