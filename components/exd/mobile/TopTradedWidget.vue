<template>
  <div class="wrap-swiper">
    <swiper ref="swiperTopTraded" class="list-item recommended" :class="{ rank: selectedTab === 0 }" :options="swiperOptions">
      <swiper-slide v-for="(item, itemIdx) in items.slice(0, 3)" :key="`top-traded-item-${item.endTime}`" class="list-item__item">
        <em v-if="selectedTab === 0" class="rank-badge">
          <template v-if="itemIdx === 0"> 1st </template>
          <template v-if="itemIdx === 1"> 2nd </template>
          <template v-if="itemIdx === 2"> 3rd </template>
        </em>
        <item-card :item="item.item" use-info :collectible="!!item.item.uniqueNo" />
        <div class="wrap-button">
          <nuxt-link to="productId" class="btn btn-price-exd" aria-disabled="true">
            <exd-hydra-price :price="item.price" :hide-label="true" icon-size="ss" :hide-usd="true" />
            <div class="info">
              <strong class="nick">{{ item.walletAddress || item.seller.walletAddress | truncateMiddle }}</strong>
            </div>
          </nuxt-link>
        </div>
        <div class="date-complete-stake">
          <!--          <span>Complete</span>-->
          <span class="date">{{ item.endTime | fromNow }}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { computed, defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';
import { onMounted } from '@vue/composition-api/dist/vue-composition-api';

import ItemCard from '@/components/common/item/ItemCard';
import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';

const { useState: useExdState, useMutations: useExdMutations, useActions: useExdActions } = createNamespacedHelpers('exd');
const { useState: useHspState } = createNamespacedHelpers('hsp');
const {
  useState: useCollectiblesState,
  useMutations: useCollectiblesMutations,
  useActions: useCollectiblesActions,
} = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'TopTradedWidget',
  components: { ExdHydraPrice, ItemCard, Swiper, SwiperSlide },
  props: {
    collectibles: {
      type: Boolean,
      default: false,
    },
  },
  setup({ collectibles }, { root }) {
    const { $i18n } = root;
    const state = reactive({
      swiperOptions: {
        slidesPerView: 'auto',
      },
      items: [],
    });
    const {
      selectedTab: exdSelectedTab,
      topTradedLoading: exdTopTradedLoading,
      recentlyLoading: exdRecentlyLoading,
      topTradedItems: exdTopTradedItems,
      recentlyItems: exdRecentlyItems,
      price,
    } = useExdState(['selectedTab', 'topTradedLoading', 'recentlyLoading', 'topTradedItems', 'recentlyItems', 'price']);
    const { fetchTopTraded: fetchExdTopTraded, fetchRecently: fetchExdRecently } = useExdActions(['fetchTopTraded', 'fetchRecently']);
    const { price: hydraPrice } = useHspState(['price']);
    const {
      selectedTab: collectiblesSelectedTab,
      topTradedLoading: collectiblesTopTradedLoading,
      recentlyLoading: collectiblesRecentlyLoading,
      topTradedItems: collectiblesTopTradedItems,
      recentlyItems: collectiblesRecentlyItems,
    } = useCollectiblesState(['selectedTab', 'topTradedLoading', 'recentlyLoading', 'topTradedItems', 'recentlyItems']);
    const { fetchCollectiblesTopTraded, fetchCollectiblesRecently } = useCollectiblesActions([
      'fetchCollectiblesTopTraded',
      'fetchCollectiblesRecently',
    ]);

    const selectedTab = computed(() => {
      if (collectibles) {
        return collectiblesSelectedTab.value;
      }

      return exdSelectedTab.value;
    });

    const loading = computed(() => {
      if (collectibles) {
        if (collectiblesSelectedTab === 0) {
          return collectiblesTopTradedLoading.value;
        }
        return collectiblesRecentlyLoading.value;
      }
      if (exdSelectedTab === 0) {
        return exdTopTradedLoading.value;
      }
      return exdRecentlyLoading.value;
    });

    const fetch = () => {
      if (collectibles) {
        fetchCollectiblesTopTraded();
        fetchCollectiblesRecently();
      } else {
        fetchExdTopTraded();
        fetchExdRecently();
      }
    };

    const loadCollectiblesItems = () => {
      if (collectiblesSelectedTab.value === 0) {
        state.items = collectiblesTopTradedItems.value;
      } else {
        state.items = collectiblesRecentlyItems.value;
      }
    };

    const loadExdItems = () => {
      console.log('loadExdItems', exdSelectedTab.value, exdTopTradedItems.value);
      if (exdSelectedTab.value === 0) {
        state.items = exdTopTradedItems.value;
      } else {
        state.items = exdRecentlyItems.value;
      }
    };

    const loadItems = () => {
      state.items = [];
      console.log('loadItems', collectibles, collectiblesSelectedTab.value, exdSelectedTab.value);
      if (collectibles) {
        loadCollectiblesItems();
      } else {
        loadExdItems();
      }
    };

    watch([exdSelectedTab, collectiblesSelectedTab], () => {
      console.log('watch tab');
      loadItems();
    });

    watch(
      () => loading.value,
      () => {
        loadItems();
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetch();
      },
    );

    watch(
      () => exdTopTradedItems.value,
      () => {
        loadItems();
      },
    );

    watch(
      () => collectiblesTopTradedItems.value,
      () => {
        loadItems();
      },
    );

    onMounted(() => {
      fetch();
    });

    return {
      ...toRefs(state),
      loading,
      selectedTab,
      price,
      hydraPrice,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
