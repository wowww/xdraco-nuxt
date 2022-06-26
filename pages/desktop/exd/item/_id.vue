<template>
  <main class="contents market" :class="`bg-grade-${item ? item.item.grade : ''}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />
        <div class="wrap-grid">
          <div class="grid-timeline">
            <div v-if="item" class="exchange-market add-float">
              <div class="wrap-addition">
                <div class="wrap-card">
                  <item-card :item="item.item" :collectible="!!item.item.uniqueNo" />
                </div>
                <div class="option-detail">
                  <div class="wrap-item-desc">
                    <exchange-item-description :item="item.item" />
                  </div>
                  <div v-if="item.item.powerScore > 0 || item.item.options.length > 0" class="wrap-option">
                    <h2 class="title">{{ item.item.powerScore > 0 ? $t('t.exd.power.score') : $t('w.exd.options') }}</h2>
                    <div v-if="item.item.powerScore > 0" class="totalscore">
                      <span class="ico-total">{{ item.item.powerScore | currency(0) }}</span>
                    </div>

                    <ul v-if="item.item.options" class="list">
                      <item-option v-for="option in item.item.options" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>
                  <div v-if="item.item.itemType === '17_2' && item.item.passiveOption && item.item.passiveOption.petOrigin" class="wrap-option">
                    <h2 class="title">{{ item.item.passiveOption.petOrigin }}</h2>
                    <ul class="list">
                      <item-option :option="{ optionName: item.item.passiveOption.desc }" />
                    </ul>
                  </div>
                  <div v-if="item.item.addOptions && item.item.addOptions.length > 0" class="wrap-option">
                    <h2 class="title">{{ $t('t.exd.add.options') }}</h2>
                    <ul class="list">
                      <item-option v-for="option in item.item.addOptions" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="suggestedTradeItems.filter((item) => item.tradeUID != exchangeItem.tradeUID).length > 0" class="wrap-suggest">
                <div class="suggest-header">
                  <h2 class="title">{{ $t('t.exd.similar.listings') }}</h2>
                  <div class="suggest-item">
                    <item-info :item="exchangeItem.item" hide-unique-no />
                    <div class="function">
                      <nuxt-link :to="`/exd/suggested?itemID=${exchangeItem.item.itemID}&enhance=${exchangeItem.item.enhance}`">
                        <span class="view-more">{{ $t('t.exd.view.more') }}</span>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="suggest-list">
                  <ul class="list">
                    <router-link
                      v-for="suggestItem in suggestedTradeItems.filter((item) => item.tradeUID != exchangeItem.tradeUID).slice(0, 5)"
                      :key="`suggested-item-${suggestItem.tradeUID}`"
                      tag="li"
                      :to="`/exd/item/${suggestItem.tradeUID}`"
                      style="cursor: pointer"
                    >
                      <item-seller :seller="suggestItem.seller" />
                      <div class="enhance">
                        <span>{{ $t('w.common.item.enhance') }}</span
                        ><strong>+{{ suggestItem.item.enhance }}</strong>
                      </div>
                      <div class="score">
                        <span>{{ $t('t.exd.power.score') }}</span
                        ><strong>{{ suggestItem.item.PowerScore | currency(0) }}</strong>
                      </div>
                      <div class="price">
                        <span>{{ $t('w.exd.sales.price') }}</span
                        ><strong class="ico-hydra ico-ss add-inside"
                      ><span>{{ suggestItem.price | currency(2) }}</span></strong
                      >
                      </div>
                    </router-link>
                  </ul>
                </div>
              </div>
              <div class="wrap-overall">
                <div class="overall-header">
                  <h2 class="title">
                    {{ $t('t.exd.overall.stat', [`${item.item.itemName || item.item.name}${item.item.enhance > 0 ? '+ ' + item.item.enhance : ''}`]) }}
                  </h2>
                </div>
                <div v-if="stat && Object.keys(stat).length !== 0" class="overall-list">
                  <ul>
                    <li>
                      <item-stat :title="$t('t.exd.recent.price')" :price="stat.recentPrice.price" :date="stat.recentPrice.time" />
                    </li>
                    <li>
                      <item-stat :title="$t('t.exd.highest.price')" :price="stat.maxPrice.price" :date="stat.maxPrice.time" />
                    </li>
                    <li>
                      <item-stat :title="$t('t.exd.average.price')" :price="stat.averagePrice.price" :date="stat.averagePrice.time" />
                    </li>
                    <li>
                      <item-monthly-stat :title="$t('t.exd.trade.volume')" :value="stat.totalVolume.volume" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- Side Contents -->
          <div class="grid-side">
            <aside class="sidebar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';
import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import ItemCard from '@/components/common/item/ItemCard';
import ItemOption from '@/components/common/item/ItemOption';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import ExchangeItemDescription from '@/components/exd/common/ExchangeItemDescription';
import ItemInfo from '@/components/exd/common/ItemInfo';
import ItemMonthlyStat from '@/components/exd/common/ItemMonthkyStat';
import ItemSeller from '@/components/exd/common/ItemSeller';
import ItemStat from '@/components/exd/common/ItemStat';
import { useExhToUsd } from '@/utils/composables/exchange';
import Footer from '@/components/common/Footer';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useHspState, useActions: useHspActions, useMutations: useHspMutations } = createNamespacedHelpers('hsp');

export default defineComponent({
  components: {
    BackButton,
    ItemStat,
    ItemMonthlyStat,
    AccountInfo,
    ItemSeller,
    ItemOption,
    ExchangeItemDescription,
    ItemCard,
    Footer,
    ItemInfo,
    SidebarContactUs,
  },
  setup(props, { root }) {
    const itemUID = root.$route.params.id;

    if (!itemUID) {
      root.$router.replace('/exd/list');
    }

    const state = reactive({
      stat: null,
      suggestedTradeItems: [],
      suggestedTradeItemsMore: false,
    });

    const item = ref(null);

    const { loading, topTradedItems, recentlyItems } = useExdState(['loading', 'topTradedItems', 'recentlyItems']);

    const { usd } = useExhToUsd();

    const fetchOtherTrades = () => {
      root.$dracoWebApi
        .get('/exd/sameitem/lists', { params: { itemID: item.value.item.itemID, enhance: item.value.item.enhance } })
        .then(({ data }) => {
          if (data.code === 200 && data.data.lists) {
            state.suggestedTradeItems = [...data.data.lists];
            state.suggestedTradeItemsMore = data.data.more || false;
          }
        });
    };

    const fetchSummary = () => {
      root.$dracoWebApi
        .get('/exd/sameitem/summary', { params: { itemID: item.value.item.itemID, enhance: item.value.item.enhance } })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            state.stat = { ...data.data };
          }
        });
    };

    const findItem = () => {
      if (topTradedItems.value || recentlyItems.value) {
        // eslint-disable-next-line eqeqeq
        const tradedItem = topTradedItems.value.find((i) => i.item.itemUID == itemUID);

        console.log(tradedItem);

        if (tradedItem) {
          item.value = tradedItem;
        }

        if (!item.value) {
          // eslint-disable-next-line eqeqeq
          item.value = recentlyItems.value.find((i) => i.item.itemUID == itemUID);
        }

        if (!item.value) {
          root.$router.replace('/exd/list');
        }

        if (item.value) {
          fetchOtherTrades();
          fetchSummary();
        }
      } else {
        root.$router.replace('/exd/list');
      }
    };

    watch(
      () => itemUID,
      (from, to) => {
        console.log(from, to);
        findItem();
      },
    );

    onMounted(() => {
      findItem();
    });

    return {
      ...toRefs(state),
      item,
      usd,
      loading,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
</style>
