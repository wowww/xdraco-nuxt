<template>
  <main class="contents collectible">
    <banner-collectible-top />

    <section class="section">
      <div class="section__inner">
        <div class="exchange-list for-list">
          <top-traded-title v-if="collectiblesTopTradedItems.length > 2" collectibles />
          <top-traded-widget v-if="collectiblesTopTradedItems.length > 2" collectibles />

          <div class="list-bar">
            <div class="list-bar__title">
              {{ $t('w.collectible.items') }}
              <span v-if="itemsTotal > 0" class="total-count">{{ itemsTotal | currency(0) }}</span>
            </div>
            <v-tabs v-show="false" v-model="itemsExplorer" class="list-bar__tab" background-color="transparent">
              <v-tab>All</v-tab>
              <v-tab>Dark Steel</v-tab>
            </v-tabs>
          </div>

          <!-- Filter -->
          <div id="wrapFilterList" class="wrap-swiper sticky">
            <swiper ref="swiperFilter" class="wrap-filter" :options="swiperFilterOptions">
              <swiper-slide>
                <list-filter
                  :placeholder="$t('w.common.item.class')"
                  filter-key="class"
                  :items="[
                    { text: `${$t('w.common.item.class')} (${$t('w.common.all')})`, value: 0 },
                    { text: $t('w.rounds.item.class.1'), value: 1 },
                    { text: $t('w.rounds.item.class.2'), value: 2 },
                    { text: $t('w.rounds.item.class.3'), value: 3 },
                    { text: $t('w.rounds.item.class.5'), value: 5 },
                    { text: $t('w.rounds.item.class.4'), value: 4 },
                  ]"
                  collectible
                />
              </swiper-slide>
              <swiper-slide>
                <list-filter
                  :placeholder="$t('w.common.item.type')"
                  filter-key="itemType"
                  :items="[
                    { text: `${$t('w.common.item.type')} (${$t('w.common.all')})`, value: '0' },
                    { text: $t('w.exd.item-type.2_1'), value: '2_1' },
                    { text: $t('w.exd.item-type.2_2'), value: '2_2' },
                    { text: $t('w.exd.item-type.2_3'), value: '2_3' },
                    { text: $t('w.exd.item-type.2_5'), value: '2_5' },
                    { text: $t('w.exd.item-type.2_4'), value: '2_4' },
                    { text: $t('w.exd.item-type.3_1.base'), value: '3_1' },
                    { text: $t('w.exd.item-type.3_2.base'), value: '3_2' },
                    { text: $t('w.exd.item-type.3_3.base'), value: '3_3' },
                    { text: $t('w.exd.item-type.3_4.base'), value: '3_4' },
                    { text: $t('w.exd.item-type.4_1'), value: '4_1' },
                    { text: $t('w.exd.item-type.4_2'), value: '4_2' },
                    { text: $t('w.exd.item-type.4_3'), value: '4_3' },
                    // { text: $t('w.exd.item-type.4_4'), value: '4_4' },
                    { text: $t('w.exd.item-type.6_33'), value: '6_33' },
                    { text: $t('w.exd.item-type.8_1'), value: '8_1' },
                    { text: $t('w.exd.item-type.8_2'), value: '8_2' },
                    { text: $t('w.exd.item-type.8_3'), value: '8_3' },
                    { text: $t('w.exd.item-type.8_4'), value: '8_4' },
                    { text: $t('w.exd.item-type.8_5'), value: '8_5' },
                    { text: $t('w.exd.item-type.8_6'), value: '8_6' },
                    { text: $t('w.exd.item-type.8_7'), value: '8_7' },
                    // { text: $t('w.exd.item-type.8_8'), value: '8_8' },
                    { text: $t('w.exd.item-type.17_2'), value: '17_2' },
                    // { text: $t('w.exd.item-type.20_1'), value: '20_1' },
                    { text: $t('w.exd.item-type.21_1'), value: '21_1' },
                    { text: $t('w.exd.item-type.21_2'), value: '21_2' },
                  ]"
                  collectible
                />
              </swiper-slide>
              <swiper-slide>
                <list-filter
                  :placeholder="$t('w.common.item.grade')"
                  filter-key="grade"
                  :items="[
                    { text: `${$t('w.common.item.grade')} (${$t('w.common.all')})`, value: 0 },
                    { text: $t('w.rounds.item.grade.5'), value: 5 },
                    { text: $t('w.rounds.item.grade.4'), value: 4 },
                    { text: $t('w.rounds.item.grade.3'), value: 3 },
                    { text: $t('w.rounds.item.grade.2'), value: 2 },
                  ]"
                  collectible
                />
              </swiper-slide>
              <swiper-slide>
                <list-filter
                  :placeholder="$t('w.common.item.tier')"
                  filter-key="tier"
                  :items="[
                    { text: `${$t('w.common.item.tier')} (${$t('w.common.all')})`, value: 0 },
                    { text: 'IV', value: 4 },
                    { text: 'III', value: 3 },
                    { text: 'II', value: 2 },
                    { text: 'I', value: 1 },
                  ]"
                  collectible
                />
              </swiper-slide>
              <swiper-slide>
                <list-filter
                  :placeholder="$t('w.common.item.enhance')"
                  filter-key="enhance"
                  :items="[
                    { text: `${$t('w.common.item.enhance')} (${$t('w.common.all')})`, value: -1 },
                    { text: '+0', value: 0 },
                    { text: '+1', value: 1 },
                    { text: '+2', value: 2 },
                    { text: '+3', value: 3 },
                    { text: '+4', value: 4 },
                    { text: '+5', value: 5 },
                    { text: '+6', value: 6 },
                    { text: '+7', value: 7 },
                    { text: '+8', value: 8 },
                    { text: '+9', value: 9 },
                    { text: '+10', value: 10 },
                    { text: '+11', value: 11 },
                    { text: '+12', value: 12 },
                  ]"
                  collectible
                />
              </swiper-slide>
              <!--              <swiper-slide class="wrap-price-range">-->
              <!--                <button type="button" class="btn-price-range" @click="toogleLayerPriceRange">Price Range</button>-->
              <!--              </swiper-slide>-->
            </swiper>

            <div v-if="showLayerPriceRange" class="layer-price-range">
              <div class="wrap-range">
                <v-text-field
                  id="inputFrom"
                  v-model="minDraco"
                  type="number"
                  class="input-range"
                  label="From"
                  prepend-inner-icon="mdi-map-marker"
                  dense
                  solo
                  flat
                  hide-spin-buttons
                />
                <v-text-field
                  v-model="maxDraco"
                  type="number"
                  class="input-range"
                  label="To"
                  prepend-inner-icon="mdi-map-marker"
                  dense
                  solo
                  flat
                  hide-spin-buttons
                />
              </div>
              <div class="wrap-button">
                <button type="button" class="btn btn-primary2 btn-sm" :disabled="invalidatePrice" @click="applyPrice">Apply</button>
              </div>
            </div>
          </div>

          <div id="wrapDateOrder" class="wrap-date-order">
            <list-order collectible />
          </div>

          <div class="wrap-filter-chip">
            <v-chip v-if="filter.class !== 0" outlined label @click="resetFilter('class', 0)">
              {{ $t(`w.rounds.item.class.${filter.class}`) }}
              <img src="@/assets/img/desktop/dsp/ico-close.webp" />
            </v-chip>

            <v-chip v-if="filter.itemType !== '0'" outlined label @click="resetFilter('itemType', '0')">
              {{ $t(`w.exd.item-type.${filter.itemType}${filter.itemType.startsWith('3_') ? '.base' : ''}`) }}
              <img src="@/assets/img/desktop/dsp/ico-close.webp" />
            </v-chip>

            <v-chip v-if="filter.grade !== 0" outlined label @click="resetFilter('grade', 0)">
              {{ $t(`w.rounds.item.grade.${filter.grade}`) }}
              <img src="@/assets/img/desktop/dsp/ico-close.webp" />
            </v-chip>

            <v-chip v-if="filter.tier !== 0" outlined label @click="resetFilter('tier', 0)">
              Tier {{ filter.tier | roman }}
              <img src="@/assets/img/desktop/dsp/ico-close.webp" />
            </v-chip>

            <v-chip v-if="filter.enhance !== -1" outlined label @click="resetFilter('enhance', -1)">
              + {{ filter.enhance }}
              <img src="@/assets/img/desktop/dsp/ico-close.webp" />
            </v-chip>

            <v-chip v-if="filter.sort !== 'latest'" outlined label @click="resetFilter('sort', 'latest')">
              {{ $t(`w.exd.filter.order.${filter.sort}`) }}
              <img src="@/assets/img/desktop/dsp/ico-close.webp" />
            </v-chip>

            <div v-if="hasFilter" class="btn-filter-reset" @click="resetAllFilter(1)">
              <span>Reset</span>
              <img src="@/assets/img/common/btn-reset-filter.webp" width="16" />
            </div>
          </div>

          <!-- Item List -->
          <ul class="list-item" :data-empty-message="items && items.length > 0 ? '' : $t('s.exd.sale.no-item')" style="margin-top: 24px">
            <exchange-item v-for="item in items" :key="`exchange-item-${item.tradeUID}`" use-link :exchange-item="item" card-size="sm" collectible />
          </ul>

          <div v-if="itemsHasMore && !loading" class="wrap-button">
            <button type="button" class="btn-viewmore" @click="fetchCollectibleItems(itemsPage + 1)">VIEW MORE</button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import 'swiper/css/swiper.css';
import BannerCollectibleTop from '@/components/banner/CollectibleTop';
import ExchangeItem from '@/components/exd/common/ExchangeItem';
import TopTradedTitle from '@/components/exd/common/TopTradedTitle';
import ListOrder from '@/components/exd/desktop/ListOrder';
import ListFilter from '@/components/exd/mobile/ListFilter';
import TopTradedWidget from '@/components/exd/mobile/TopTradedWidget';
import Footer from '@/components/common/Footer';

const { useState: useSearchState, useMutations: useSearchMutations, useActions: useSearchActions } = createNamespacedHelpers('search');

const {
  useState: useCollectibleState,
  useActions: useCollectibleActions,
  useMutations: useCollectibleMutations,
} = createNamespacedHelpers('collectible');

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'CollectibleList',
  components: {
    BannerCollectibleTop,
    TopTradedWidget,
    TopTradedTitle,
    ListOrder,
    ListFilter,
    ExchangeItem,
    Footer,
    Swiper,
    SwiperSlide,
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const state = reactive({
      swiperOptions: {
        slidesPerView: 'auto',
      },
      swiperFilterOptions: {
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 8,
        slidesOffsetBefore: 16,
        slidesOffsetAfter: 16,
        autoHeight: true,
      },
    });

    const { filter } = useSearchState(['filter']);
    const { setFilter } = useSearchMutations(['setFilter']);
    const { resetAllFilter } = useSearchActions(['resetAllFilter']);

    const {
      loading,
      items,
      itemsHasMore,
      itemsPage,
      itemsTotal,
      topTradedItems: collectiblesTopTradedItems,
      recentlyItems: collectiblesRecentlyItems,
    } = useCollectibleState(['loading', 'items', 'itemsHasMore', 'itemsPage', 'itemsTotal', 'topTradedItems', 'recentlyItems']);
    const showLayerPriceRange = ref(false);
    const { fetchCollectibleItems, fetchCollectiblesTopTraded, fetchCollectiblesRecently } = useCollectibleActions([
      'fetchCollectibleItems',
      'fetchCollectiblesTopTraded',
      'fetchCollectiblesRecently',
    ]);
    const { dracoAccessToken } = useState(['dracoAccessToken']);

    const changeSort = ref(false);
    const minDraco = ref('');
    const maxDraco = ref('');

    const refresh = () => {
      fetchCollectibleItems();
      fetchCollectiblesRecently();
      fetchCollectiblesTopTraded();
    };

    onBeforeMount(() => {
      //
    });

    onMounted(() => {
      resetAllFilter(1);
      refresh();
    });

    watch(
      () => filter.value,
      (current, before) => {
        if (current.sort !== before.sort) {
          changeSort.value = true;
        }
        fetchCollectibleItems();
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        refresh();
      },
    );

    watch(
      () => dracoAccessToken.value,
      () => {
        refresh();
      },
    );

    const invalidatePrice = computed(() => {
      console.log(minDraco.value, maxDraco.value);

      if (!minDraco.value || !maxDraco.value) {
        return true;
      }

      if (Number(maxDraco.value) < Number(minDraco.value)) {
        return true;
      }

      return false;
    });

    const applyPrice = () => {
      if (!invalidatePrice.value) {
        setFilter({ ...filter.value, minPrice: minDraco.value, maxPrice: maxDraco.value });
        showLayerPriceRange.value = false;
      }
    };

    watch(
      () => showLayerPriceRange.value,
      (open) => {
        if (open) {
          minDraco.value = filter.value.minPrice;
          maxDraco.value = filter.value.maxPrice;
        }
      },
    );

    const hasFilter = computed(() => {
      if (filter.value.class !== 0) {
        return true;
      }

      if (filter.value.itemType !== '0') {
        return true;
      }

      if (filter.value.grade !== 0) {
        return true;
      }

      if (filter.value.tier !== 0) {
        return true;
      }

      if (filter.value.enhance !== -1) {
        return true;
      }

      if (filter.value.sort !== 'latest') {
        return true;
      }

      return false;
    });

    const resetFilter = (type, initValue) => {
      const value = { ...filter.value };
      value[type] = initValue;
      setFilter(value);
    };

    return {
      ...toRefs(state),
      filter,
      resetFilter,
      resetAllFilter,
      hasFilter,
      changeSort,
      items,
      itemsHasMore,
      itemsPage,
      itemsTotal,
      fetchCollectibleItems,
      minDraco,
      maxDraco,
      invalidatePrice,
      applyPrice,
      showLayerPriceRange,
      loading,
      collectiblesTopTradedItems,
      collectiblesRecentlyItems,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',

    // for nav in .list-bar
    itemsRecommend: null,
    itemsExplorer: null,
  }),
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    toogleLayerPriceRange() {
      this.showLayerPriceRange = !this.showLayerPriceRange;

      setTimeout(() => {
        if (this.showLayerPriceRange) {
          const inputFrom = this.$el.querySelector('#inputFrom');
          inputFrom.focus();
        }
      }, 10);
    },
    emitSelectOrder() {
      if (!this.showLayerPriceRange) {
        return;
      }
      this.showLayerPriceRange = false;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

.is-mobile {
  .subnav {
    display: none;
  }
}
</style>
