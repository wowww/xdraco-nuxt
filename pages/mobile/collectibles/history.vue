<template>
  <main class="contents">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <div class="myitem-list">
          <v-tabs :value="selectedTab" class="tab-rounds" :hide-slider="true" @change="setSelectedTab">
            <v-tab>
              <span>{{ $t('t.exd.top.traded') }}</span>
            </v-tab>
            <v-tab>
              <span>{{ $t('t.exd.recent.traded') }}</span>
            </v-tab>
          </v-tabs>
        </div>
        <div v-if="selectedTab === 0" class="exd-ranking-list" style="margin-top: 24px">
          <top-traded-item
            v-for="(item, itemIdx) in topTradedItems.slice(0, topTradedPage * 10)"
            :key="`top-traded-item${itemIdx}`"
            :rank="itemIdx"
            :top-traded-item="item"
          />

          <ul v-if="topTradedItems.length === 0" class="list" :data-empty-message="$t('s.exd.sale.no-item')"></ul>

          <div v-if="topTradedPage * 10 < topTradedItems.length && topTradedPage < 10" class="wrap-button">
            <button type="button" class="btn-viewmore" @click="setTopTradedPage(topTradedPage + 1)">VIEW MORE</button>
          </div>
        </div>
        <div v-else class="myitem-list for-list">
          <div class="tab-soldout">
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

            <ul class="list-myitem">
              <li v-for="(item, itemIdx) in recentlyItems" :key="`exd-history-recently-item${itemIdx}`" @click="showItemCard(itemIdx)">
                <div class="myitem" data-sale-type="soldout">
                  <item-info :item="item.item" />
                  <div class="myitem-detail">
                    <ul class="spec">
                      <li class="settlement">
                        <span>{{ $t('t.exd.purchased.price') }}</span>
                        <strong class="ico-hydra ico-xs add-inside">
                          <span>{{ item.price | currency(2) }}</span>
                        </strong>
                      </li>
                      <li class="seller">
                        <span>{{ $t('w.exd.seller') }}</span>
                        <div class="seller-info">
                          <!--
                          <div class="server">{{ item.seller.worldName }}</div>
                          -->
                          <span class="nickname">{{ item.walletAddress || item.seller.walletAddress | truncateMiddle }}</span>
                        </div>
                      </li>
                      <li class="date">
                        <span>{{ $t('t.exd.tx.date') }}</span>
                        <strong>{{ item.endTime | fromNow }}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="recentlyMore" class="wrap-button">
              <button type="button" class="btn-viewmore" @click="fetchCollectiblesRecently(recentlyPage + 1)">VIEW MORE</button>
            </div>
            <v-dialog v-model="openCard" content-class="dialog-card">
              <v-card v-if="recentlyItems.length > 0 && selectedItemIdx > -1">
                <item-card ref="card" :item="recentlyItems[selectedItemIdx].item" :collectible="!!recentlyItems[selectedItemIdx].item.uniqueNo" />
                <button type="button" class="btn-close-dialog" @click="cardClose">Close Dialog</button>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api/dist/vue-composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';
import { onUnmounted, ref, watch } from '@vue/composition-api';

import ItemCard from '@/components/common/item/ItemCard';
import ItemInfo from '@/components/exd/common/ItemInfo';
import TopTradedItem from '@/components/exd/desktop/TopTradedItem';
import ListFilter from '@/components/exd/mobile/ListFilter';
import Footer from '@/components/common/Footer';

const {
  useState: useSearchState,
  useGetters: useSearchGetters,
  useMutations: useSearchMutations,
  useActions: useSearchActions,
} = createNamespacedHelpers('search');

const {
  useState: useCollectiblesState,
  useActions: useCollectiblesActions,
  useMutations: useCollectiblesMutations,
} = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'ExdTradeHistory',
  components: {
    ItemCard,
    ItemInfo,
    TopTradedItem,
    Footer,
    ListFilter,
    Swiper,
    SwiperSlide,
  },
  setup(props, { root }) {
    const { $i18n } = root;
    const card = ref(null);
    const state = reactive({
      openCard: false,
      selectedItemIdx: -1,
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
      showLayerPriceRange: false,
    });
    const { filter } = useSearchState(['filter']);
    const { hasFilter } = useSearchGetters(['hasFilter']);
    const { setFilter } = useSearchMutations(['setFilter']);
    const { resetAllFilter } = useSearchActions(['resetAllFilter']);

    const { selectedTab, topTradedLoading, topTradedItems, topTradedPage, recentlyItems, recentlyMore, recentlyPage } = useCollectiblesState([
      'selectedTab',
      'topTradedLoading',
      'topTradedItems',
      'topTradedPage',
      'recentlyItems',
      'recentlyMore',
      'recentlyPage',
    ]);
    const { fetchCollectiblesTopTraded, fetchCollectiblesRecently } = useCollectiblesActions([
      'fetchCollectiblesTopTraded',
      'fetchCollectiblesRecently',
    ]);
    const { setSelectedTab, setTopTradedPage } = useCollectiblesMutations(['setSelectedTab', 'setTopTradedPage']);

    watch(
      () => $i18n.locale,
      () => {
        fetchCollectiblesTopTraded();
        fetchCollectiblesRecently();
      },
    );

    const showItemCard = (idx) => {
      state.selectedItemIdx = idx;
      if (card.value && card.value.reset) {
        card.value.reset();
      }
      state.openCard = true;
    };

    const cardClose = () => {
      state.openCard = false;
      if (card.value.reset) {
        card.value.reset();
      }
    };

    const resetFilter = (type, initValue) => {
      const value = { ...filter.value };
      value[type] = initValue;
      setFilter(value);
    };

    watch(
      () => filter.value,
      (current, before) => {
        fetchCollectiblesRecently();
      },
    );

    onMounted(() => {
      resetAllFilter(1);
      if (!topTradedItems.value || topTradedItems.value.length === 0) {
        fetchCollectiblesTopTraded();
      }

      if (!recentlyItems.value || recentlyItems.value.length === 0) {
        fetchCollectiblesRecently();
      }
    });

    onUnmounted(() => {
      resetAllFilter(1);
    });

    return {
      topTradedItems,
      topTradedPage,
      setTopTradedPage,
      recentlyItems,
      selectedTab,
      setSelectedTab,
      ...toRefs(state),
      showItemCard,
      recentlyMore,
      recentlyPage,
      fetchCollectiblesRecently,
      card,
      cardClose,
      filter,
      setFilter,
      resetFilter,
      resetAllFilter,
      hasFilter,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

.wrap-button {
  margin-top: 16px;

  .btn-viewmore {
    width: 100%;
    min-height: 48px;
    font-size: 12px;
    font-weight: normal;
    line-height: normal;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
