<template>
  <main class="contents market">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>

        <div class="exchange-market">
          <div class="wrap-suggest">
            <div class="suggest-header">
              <div class="suggest-item">
                <item-info :item="exchangeItem.item" />
              </div>
            </div>
            <div class="suggest-list">
              <div class="wrap-filter">
                <v-select
                  class="select-filter orderby"
                  :items="sortItems"
                  :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
                  persistent-hint
                  return-object
                  single-line
                  dark
                  dense
                  outlined
                  :value="sort"
                  @change="changeSort"
                ></v-select>
              </div>
              <ul class="list">
                <li class="list-header">
                  <div class="price">
                    <em>{{ $t('w.exd.sales.price') }}</em>
                  </div>
                  <div class="enhance">
                    <em>{{ $t('w.common.item.enhance') }}</em>
                  </div>
                  <div class="score">
                    <em>{{ $t('t.exd.power.score') }}</em>
                  </div>
                  <div class="char-info"><em>Seller ID</em></div>
                </li>
                <router-link
                  v-for="suggestItem in suggestedTradeItems"
                  :key="`suggested-item-${suggestItem.tradeUID}`"
                  tag="li"
                  :to="`/exd/trade/${suggestItem.tradeUID}`"
                  style="cursor: pointer"
                >
                  <exd-hydra-price :price="suggestItem.price" icon-size="ss" :hide-label="true" />
                  <div class="enhance">
                    <strong>+{{ suggestItem.item.enhance }}</strong>
                  </div>
                  <div class="score">
                    <strong>{{ suggestItem.item.PowerScore | currency(0) }}</strong>
                  </div>

                  <div class="seller">
                    <span>{{ $t('w.exd.seller') }}</span>
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <strong v-bind="attrs" v-on="on">{{ suggestItem.seller.walletAddress | truncateMiddle }}</strong>
                      </template>
                      <span>{{ suggestItem.seller.walletAddress }}</span>
                    </v-tooltip>
                  </div>
                </router-link>
              </ul>
            </div>

            <div v-if="suggestedTradeItemsMore" class="wrap-button" @click="fetchOtherTrades(page + 1)">
              <button type="button" class="btn-viewmore">VIEW MORE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch, computed } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';
import ItemInfo from '@/components/exd/common/ItemInfo';
import Footer from '@/components/common/Footer';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'ExdSuggestList',
  components: {
    ExdHydraPrice,
    ItemInfo,
    Footer,
  },
  setup(props, { root }) {
    const { $dracoWebApi, $i18n, $route, $router } = root;
    const itemID = $route.params.id;
    const { enhance } = $route.query;

    const state = reactive({
      stat: null,
      page: 1,
      suggestedTradeItems: [],
      suggestedTradeItemsMore: false,
      sort: 'latest',
      sortItems: [
        { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
        { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
        // { text: $t('w.exd.filter.order.pricehigh'), value: 'pricehigh' },
        // { text: $t('w.exd.filter.order.pricelow'), value: 'pricelow' },
      ],
    });

    const { loading, exchangeItem, price, exdErrorCode } = useExdState(['loading', 'exchangeItem', 'price', 'exdErrorCode']);

    const sortValue = computed(() => {
      return state.sortItems.find((item) => item.value === state.sort);
    });

    const changeSort = (value) => {
      state.sort = value;
    };

    const fetchOtherTrades = (page = 1) => {
      $dracoWebApi
        .get('/exd/sameitem/lists', { params: { itemID, enhance: enhance || '0', sort: state.sort.value, page: page || 1 } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.page = page;
            if (data.data.lists) {
              if (page > 1) {
                state.suggestedTradeItems = [...state.suggestedTradeItems, ...data.data.lists];
              } else {
                state.suggestedTradeItems = [...data.data.lists];
              }
            }
            state.suggestedTradeItemsMore = data.data.more || false;
          }
        });
    };

    onMounted(() => {
      if (!exchangeItem.value || !itemID) {
        $router.replace('/exd/list');
      }

      fetchOtherTrades();
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchOtherTrades();
      },
    );

    watch(
      () => state.sort,
      () => {
        fetchOtherTrades();
      },
    );

    return {
      ...toRefs(state),
      exchangeItem,
      sortValue,
      changeSort,
      fetchOtherTrades,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
</style>
