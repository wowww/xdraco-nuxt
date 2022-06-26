<template>
  <main class="contents nft">
    <banner-nft-top-video />

    <section class="section">
      <div class="section__inner">
        <div class="exchange-list for-list">
          <h2 class="title-for-list">
            <span>Character NFTs</span>
          </h2>
          <div class="tab-score">
            <div class="tab-score__title">VIEW :</div>
            <div class="wrap-score-button">
              <div>
                <template v-if="viewMode === 'ms'">MIRAGE Score</template>
                <template v-else>POWER Score</template>
              </div>
              <div class="tab-score__button">
                <button type="button" class="button" :class="{ 'button--active': viewMode === 'ps' }" @click="setViewMode('ps')">
                  <img src="@/assets/img/common/tab-score/icon-power.webp" class="icon" height="20" alt="Power Score" />
                  <span class="text">Power Score</span>
                </button>
                <button type="button" class="button" :class="{ 'button--active': viewMode === 'ms' }" @click="setViewMode('ms')">
                  <img src="@/assets/img/common/tab-score/icon-mirage.webp" class="icon" height="20" alt="MIRAGE Score" />
                  <span class="text">MIRAGE Score</span>
                </button>
              </div>
            </div>
          </div>

          <nft-list-tab-bar :value="selectedTab" @input="setSelectedTab" />
          <nft-traded-section v-if="selectedTab === 0" :data="topTradedItems" use-rank use-badge />
          <nft-traded-section v-if="selectedTab === 1" :data="recentItems" />

          <!-- Recommended -->
          <div class="list-bar">
            <div class="list-bar__title">{{ $t('t.exd.recommended') }}</div>
          </div>
          <ul class="list-item" :data-empty-message="recommendedItems.list && recommendedItems.list.length > 0 ? '' : $t('s.nft.empty.sales')">
            <nft-item
              v-for="item in recommendedItems.list"
              :key="`nft-recommended-item-${item.seq || item.info.seq}`"
              :item="item"
              size="xs"
              use-link
            />
          </ul>

          <!-- List Bar -->
          <div class="list-bar">
            <div class="list-bar__title">
              {{ $t('w.nft.character') }}
              <span v-if="items.totalCount > 0" class="total-count nft">{{ items.totalCount | currency(0) }}</span>
            </div>
          </div>

          <nft-list-filter :value="itemsFilter" @change="setItemsFilter" />

          <ul class="list-item" :data-empty-message="items.list && items.list.length > 0 ? '' : $t('s.exd.sale.no-item')" style="margin-top: 24px">
            <nft-item v-for="item in items.list" :key="`nft-list-item-${item.seq || item.info.seq}`" size="xs" :item="item" use-link />
          </ul>

          <div v-if="items.more" class="wrap-button">
            <button type="button" class="btn-viewmore" @click="fetchNftItems(items.page + 1)">VIEW MORE</button>
          </div>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </main>
</template>

<script>
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import BannerNftTopVideo from '@/components/banner/NftTopVideo';
import NftItem from '@/components/nft/common/NftItem';
import NftListTabBar from '@/components/nft/common/NftListTabBar';
import NftListFilter from '@/components/nft/mobile/NftListFilter';
import NftTradedSection from '@/components/nft/mobile/NftTradedSection';
import Footer from '@/components/common/Footer';
import 'swiper/css/swiper.css';

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

const genarateFilter = (isReset) => {
  return {
    class: '',
    category: '',
    rank: '',
    tier: '',
    enhance: '',
    collectibles: false,
    date: !isReset ? { title: 'Date Listed: Newest', abc: 0 } : undefined,
  };
};

export default defineComponent({
  components: {
    BannerNftTopVideo,
    NftListTabBar,
    NftListFilter,
    NftTradedSection,
    NftItem,
    Footer,
  },
  setup() {
    const { loading, selectedTab, items, itemsFilter, topTradedItems, recommendedItems, recentItems, viewMode } = useNftState([
      'loading',
      'selectedTab',
      'items',
      'itemsFilter',
      'topTradedItems',
      'recommendedItems',
      'recentItems',
      'viewMode',
    ]);
    const { setSelectedTab, setItemsFilter, setViewMode } = useNftMutations(['setSelectedTab', 'setItemsFilter', 'setViewMode']);
    const { fetchNftItems, fetchNftTopTradedItems, fetchNftRecommendedItems, fetchNftRecentItems } = useNftActions([
      'fetchNftItems',
      'fetchNftTopTradedItems',
      'fetchNftRecommendedItems',
      'fetchNftRecentItems',
    ]);

    onMounted(() => {
      fetchNftItems();
      fetchNftTopTradedItems();
      fetchNftRecommendedItems();
      fetchNftRecentItems();
    });

    watch(
      () => itemsFilter.value,
      () => {
        fetchNftItems();
      },
    );

    return {
      loading,
      selectedTab,
      setItemsFilter,
      setViewMode,
      setSelectedTab,
      items,
      itemsFilter,
      topTradedItems,
      recommendedItems,
      recentItems,
      viewMode,
      fetchNftItems,
    };
  },
  methods: {
    emitSelectOrder() {
      if (!this.showLayerPriceRange) {
        return;
      }
      this.showLayerPriceRange = false;
    },
    removeCollectiblesFilter() {
      this.filters.collectibles = !this.filters.collectibles;
    },
    removeDateFilter() {
      this.filters.date = undefined;
    },
    resetFilters() {
      this.filters = genarateFilter(true);
    },
    hideLayerFilter(target) {
      Object.keys(this.showLayer).forEach((layer) => {
        if (layer === target) {
          return;
        }
        this.showLayer[layer] = false;
      });
    },
    toggleLayerFilter(target) {
      if (!target) {
        return;
      }
      this.hideLayerFilter(target);
      this.showLayer[target] = !this.showLayer[target];
    },
    handleClickSwiperFilter(index) {
      this.swiperFilter.slideTo(index);
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/components/tab-score';
</style>
