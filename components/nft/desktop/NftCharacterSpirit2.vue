<template>
  <div ref="section">
    <h3 class="title-sub-detail">Spirit2</h3>
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
        <v-tab class="tab-spirit-item text-lg" disabled>
          <span>fontSize16 2 disabled</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="selectedDeck" class="wrap-tabs-item">
        <v-tab-item class="wrap-item-square">
          <ul class="list-item">
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character01.webp" width="82" alt="" />
              <span class="tier">I</span>
              <span class="quantity">x10</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character02.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li class="common">
              <img src="@/assets/img/common/nft-detail/@character03.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li class="rare">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="rare">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="uncommon">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">I</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">I</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x10</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x10</span>
            </li>
            <li></li>
            <li></li>
          </ul>
        </v-tab-item>

        <v-tab-item class="wrap-item-square">
          <ul class="list-item">
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character01.webp" width="82" alt="" />
              <span class="tier">I</span>
              <span class="quantity">x10</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character02.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </v-tab-item>

        <v-tab-item class="wrap-item-square">
          <ul class="list-item">
            <li class="uncommon">
              <img src="@/assets/img/common/nft-detail/@character01.webp" width="82" alt="" />
              <span class="tier">I</span>
              <span class="quantity">x10</span>
            </li>
            <li class="common">
              <img src="@/assets/img/common/nft-detail/@character02.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li class="rare">
              <img src="@/assets/img/common/nft-detail/@character03.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="uncommon">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">I</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">I</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x10</span>
            </li>
            <li class="legendary">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x10</span>
            </li>
            <li class="uncommon">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li class="epic">
              <img src="@/assets/img/common/nft-detail/@character04.webp" width="82" alt="" />
              <span class="tier">II</span>
              <span class="quantity">x2</span>
            </li>
            <li></li>
          </ul>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterSpirit2',
  setup(props, { root }) {
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      selectedDeck: 0,
    });
    const fetchStat = () => {
      console.log('fetchStat');
      state.loading = true;
      root.$dracoWebApi
        .get('/nft/character/stats', { params: { transportID: item.value.transportID } })
        .then(({ data }) => {
          state.stats = data.data;
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.transportID) {
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
});
</script>


