<template>
  <div ref="section">
    <h3 class="title-sub-detail">{{ $t('t.nft.inventory') }}</h3>
    <div class="wrap-inventory">
      <v-tabs v-model="selectedTab" class="tab-rounds">
        <v-tab>
          <span>{{ $t('t.nft.inventory.tab2') }}</span>
        </v-tab>
        <v-tab>
          <span>{{ $t('t.nft.inventory.tab3') }}</span>
        </v-tab>
        <v-tab>
          <span>{{ $t('t.nft.magic.stone') }}</span>
        </v-tab>
        <v-tab>
          <span>{{ $t('t.nft.inventory.tab5') }}</span>
        </v-tab>
        <v-tab>
          <span>{{ $t('t.nft.inventory.tab6') }}</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="selectedTab" class="wrap-tabs-item">
        <v-tab-item v-for="(subList, subIdx) in filteredList" :key="`inventory-sub-${subIdx}-list`" class="wrap-item-square inventory">
          <div class="total">
            <em v-if="inventories" class="number">{{ subList.length || 0 }}</em> item
          </div>
          <ul v-if="inventories" class="list-item">
            <li
              v-for="(subItem, subItemIdx) in subList"
              :key="`inven-${subIdx}-${subItemIdx}`"
              :class="`grade-${subItem.grade}`"
              @click="fetchItemDetail(subItem.itemUID, selectedTab, subItemIdx)"
            >
              <img :src="subItem.itemPath" width="80" alt="" />
              <span class="enhance">{{ subItem.enhance > 0 ? `+${subItem.enhance}` : '' }}</span>
              <span v-if="Number(subItem.tier) > 1" class="tier">{{ Number(subItem.tier) | roman }}</span>
              <span v-if="subItem.stack > 0" class="quantity">{{ subItem.stack | currency(0) }}</span>
            </li>
          </ul>
          <div v-show="false" class="wrap-btn">
            <button type="button" class="btn">VIEW MORE</button>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <v-dialog v-model="openCard" content-class="dialog-card">
        <v-card v-if="selectedItem">
          <item-card
            ref="card"
            :item="{ ...selectedItem, enhance: filteredList[selectedTab][selectedItemIdx] ? filteredList[selectedTab][selectedItemIdx].enhance : 0 }"
            use-info
          />
          <button type="button" class="btn-close-dialog" @click="cardClose">Close Dialog</button>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import ItemCard from '@/components/common/item/ItemCard';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterInventory',
  components: {
    ItemCard,
  },
  setup(props, { root }) {
    const card = ref(null);
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      selectedTab: 0,
      inventories: null,
      openCard: false,
      selectedItemIdx: null,
      selectedItem: null,
      filterList: [[2, 3, 4], [5, 7, 9], [8], [17], [6, 10, 11, 12, 13, 14, 16, 18, 19, 20]],
      typeFilter: [[2, 3, 4, 20], [5, 7, 9], [8, 21], [17], [6, 10, 11, 12, 13, 14, 16, 18, 19]],
      filteredList: null,
    });
    const fetchApi = () => {
      console.log('fetchInventory');
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/inven', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.inventories = data.data;

            const filteredList = [];

            state.typeFilter.forEach((mainTypes) => {
              const mainTypesItems = [];
              data.data.forEach((i) => {
                if (mainTypes.includes(i.mainType)) {
                  mainTypesItems.push(i);
                }
              });

              mainTypesItems.sort((a, b) => {
                return a.mainType - b.mainType || a.subType - b.subType || b.grade - a.grade;
              });

              filteredList.push(mainTypesItems);
            });

            state.filteredList = filteredList;

            // console.log(data.data.map((i) => `${i.mainType}_${i.subType}`).sort());
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const fetchItemDetail = (itemUID, tabIdx, idx) => {
      state.selectedItemIdx = idx;
      $dracoWebApi
        .get('/nft/character/itemdetail', {
          params: { transportID: item.value.character.transportID, class: item.value.character.class, itemUID, languageCode: $i18n.locale },
        })
        .then(({ data }) => {
          if (data.code === 200) {
            state.selectedItem = data.data;

            state.openCard = true;
          }
        });
    };

    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.inventories) {
        fetchApi();
      }
    });

    const showItemCard = (itemUID) => {
      if (card.value && card.value.reset) {
        card.value.reset();
      }
      state.openCard = true;
    };

    const cardClose = () => {
      if (card.value.reset) {
        card.value.reset();
      }

      root.$nextTick(() => {
        state.openCard = false;
      });
    };

    watch(
      () => state.openCard,
      () => {
        if (state.openCard === false) {
          if (card.value.reset) {
            card.value.reset();
          }
        }
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchApi();
      },
    );

    onUnmounted(() => {
      stop();
    });

    return {
      section,
      ...toRefs(state),
      card,
      cardClose,
      showItemCard,
      fetchItemDetail,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>


