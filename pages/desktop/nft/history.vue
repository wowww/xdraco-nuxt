<template>
  <main class="contents nft">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />
        <div class="wrap-grid">
          <div class="grid-timeline">
            <div class="exd-ranking exchange-list">
              <v-tabs v-model="selectedTab" class="tab-rounds" background-color="transparent" @change="setSelectedTab">
                <v-tab>{{ $t('t.exd.top.traded') }}</v-tab>
                <v-tab>{{ $t('t.exd.recent.traded') }}</v-tab>
              </v-tabs>
              <div v-if="selectedTab === 0" class="exd-ranking-list">
                <nft-top-traded-item
                  v-for="(item, itemIdx) in topTradedItems.list"
                  :key="`ntf-top-traded-item-${item.seq || item.info.seq}`"
                  :item="item"
                  :rank="itemIdx + 1"
                />
                <ul
                  v-if="!topTradedItems.list || topTradedItems.list.length === 0"
                  class="list"
                  style="display: flex; justify-content: center; align-items: center; height: 220px; padding: 0"
                >
                  {{
                    $t('s.nft.empty.traded')
                  }}
                </ul>
                <div v-if="topTradedItems.more && topTradedItems.page < 10" class="wrap-button">
                  <button type="button" class="btn-viewmore" @click="fetchNftTopTradedItems(topTradedItems.page + 1)">VIEW MORE</button>
                </div>
              </div>
              <div v-if="selectedTab === 1" class="wrap-suggest">
                <nft-list-filter :value="historyFilter" variants="class level power price chip" @change="setHistoryFilter" />

                <div class="suggest-list type3">
                  <ul v-if="recentHistoryItems.list && recentHistoryItems.list.length > 0" class="list">
                    <nft-recent-item
                      v-for="item in recentHistoryItems.list"
                      :key="`nft-recent-item-${item.seq || item.info.seq}`"
                      :item="{
                        ...item.info,
                        seller: item.seller,
                      }"
                    />
                  </ul>
                  <div v-if="recentHistoryItems.more" class="wrap-button">
                    <button type="button" class="btn-viewmore" @click="fetchNftRecentHistoryItems(recentHistoryItems.page + 1)">VIEW MORE</button>
                  </div>
                  <ul
                    v-if="!recentHistoryItems.list || recentHistoryItems.list.length === 0"
                    class="list"
                    :data-empty-message="$t('s.nft.empty.traded')"
                  ></ul>
                  <v-dialog v-model="openCard" content-class="dialog-card">
                    <v-card v-if="recentHistoryItems.list.length > 0 && selectedItemIdx > -1">
                      <nft-card
                        ref="card"
                        :item="{ ...recentHistoryItems.list[selectedItemIdx].info, seller: recentHistoryItems.list[selectedItemIdx].seller }"
                      />
                      <button type="button" class="btn-close-dialog" @click="closeCard">Close Dialog</button>
                    </v-card>
                  </v-dialog>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-side">
            <aside class="sidebar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>

    <common-footer/>
  </main>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import { computed, ref, watch } from '@vue/composition-api/dist/vue-composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import NftCard from '@/components/nft/common/NftCard';
import NftListFilter from '@/components/nft/desktop/NftListFilter';
import NftRecentItem from '@/components/nft/desktop/NftRecentItem';
import NftTopTradedItem from '@/components/nft/desktop/NftTopTradedItem';
import CommonFooter from '@/components/common/Footer';

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

export default defineComponent({
  components: { NftListFilter, NftCard, NftRecentItem, NftTopTradedItem, BackButton, AccountInfo, SidebarContactUs, CommonFooter, },
  setup() {
    const card = ref(null);
    const state = reactive({
      openCard: false,
      selectedItemIdx: -1,
    });

    const { loading, topTradedItems, selectedTab, historyFilter, recentHistoryItems } = useNftState([
      'loading',
      'topTradedItems',
      'selectedTab',
      'historyFilter',
      'recentHistoryItems',
    ]);

    const { setSelectedTab, setHistoryFilter } = useNftMutations(['setSelectedTab', 'setHistoryFilter']);

    const { fetchNftTopTradedItems, fetchNftRecentHistoryItems } = useNftActions(['fetchNftTopTradedItems', 'fetchNftRecentHistoryItems']);

    onMounted(() => {
      fetchNftTopTradedItems();
      fetchNftRecentHistoryItems();
    });

    watch(
      () => historyFilter.value,
      (current, before) => {
        fetchNftRecentHistoryItems();
      },
    );

    watch(
      () => state.openPrice,
      (tobe) => {
        if (tobe) {
          state.openPower = false;
          state.openLevel = false;
        }
      },
    );

    watch(
      () => state.openLevel,
      (tobe) => {
        if (tobe) {
          state.openPower = false;
          state.openPrice = false;
        }
      },
    );

    watch(
      () => state.openPower,
      (tobe) => {
        if (tobe) {
          state.openPrice = false;
          state.openLevel = false;
        }
      },
    );

    const showCard = (idx) => {
      state.selectedItemIdx = idx;
      if (card.value && card.value.reset) {
        card.value.reset();
      }
      state.openCard = true;
    };

    const closeCard = () => {
      state.openCard = false;
      if (card.value.reset) {
        card.value.reset();
      }
    };

    return {
      ...toRefs(state),
      historyFilter,
      setHistoryFilter,
      selectedTab,
      setSelectedTab,
      topTradedItems,
      recentHistoryItems,
      fetchNftTopTradedItems,
      fetchNftRecentHistoryItems,
      showCard,
      closeCard,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

.section {
  max-width: none;
}

.nft {
  .exd-ranking-list {
    .wrap-button {
      margin-top: 24px;

      .btn-viewmore {
        --viewmore-height: 62px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 12px;
        min-height: var(--viewmore-height);
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.05);
        vertical-align: top;
        box-sizing: border-box;
      }
    }
  }

  .btn-open-dialog {
    z-index: 1;
  }
}
</style>
