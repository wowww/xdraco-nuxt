<template>
  <main class="contents market" :class="`bg-grade-${exchangeItem ? exchangeItem.item.grade : ''}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />
        <div class="wrap-grid">
          <div class="grid-timeline">
            <div v-if="exchangeItem" class="exchange-market add-float">
              <div class="wrap-addition">
                <!-- 디자인파트에서 원하는 기능인거 같습니다. -->
                <!-- https://renatodeleao.github.io/vue-sticky-directive/ -->
                <!-- https://codesandbox.io/s/mm4olmxkrx -->
                <div class="wrap-card">
                  <item-card :item="exchangeItem.item" :collectible="!!exchangeItem.item.uniqueNo" />
                </div>
                <div class="option-detail">
                  <div class="wrap-item-desc">
                    <exchange-item-description :item="exchangeItem.item" />

                    <div v-if="exchangeItem.myItem == 0" class="wrap-button price-button">
                      <button type="button" class="btn btn-primary-exd" @click="openTrade">
                        <em class="price">
                          <exd-hydra-price :price="exchangeItem.price" :hide-label="true" icon-size="ss" />
                        </em>
                      </button>
                    </div>
                    <div v-else class="wrap-credit">
                      <div class="credit-info">
                        <div class="category">{{ $t('w.exd.sales.price') }}</div>
                        <div class="info">
                          <span class="ico-hydra ico-sm add-inside">{{ exchangeItem.price | currency(2) }}</span>
                        </div>
                      </div>
                      <div class="wrap-button">
                        <button type="button" class="btn btn-primary2" @click="openCancel">{{ $t('t.exd.sales.cancel') }}</button>
                      </div>
                    </div>
                  </div>

                  <template v-if="!!exchangeItem.item.uniqueNo">
                    <h2 class="title">{{ $t('w.collectible.info') }}</h2>
                    <div class="wrap-collectible-info" :data-item-grade="exchangeItem.item.grade">
                      <!-- <div class="wrap-collectible-info" data-item-grade="4"> -->
                      <!-- <div class="wrap-collectible-info" data-item-grade="3"> -->
                      <div class="wrap-info">
                        <dl class="define">
                          <dt>{{ $t('w.collectible.source') }}</dt>
                          <dd>DSP Season {{ dspSeason }}</dd>
                        </dl>
                        <dl class="define">
                          <dt>{{ $t('w.exd.unique.no') }}</dt>
                          <dd>{{ exchangeItem.item.uniqueNo }}</dd>
                        </dl>
                        <dl class="define">
                          <dt>{{ $t('w.collectible.limit-no') }}</dt>
                          <dd>
                            {{
                              exchangeItem.item.limited ||
                              `#${UniqueDict[exchangeItem.item.uniqueNo].idx} / ${UniqueDict[exchangeItem.item.uniqueNo].count}`
                            }}
                          </dd>
                        </dl>
                        <dl class="define">
                          <dt>{{ $t('w.collectible.state') }}</dt>
                          <dd>XDRACO</dd>
                        </dl>
                      </div>
                      <div class="info-message">
                        <p v-if="['2', '3', '4'].includes(exchangeItem.item.itemType.split('_')[0])" style="margin-bottom: 4px">
                          {{ $t(`s.collectible.info.item-type.${exchangeItem.item.itemType.split('_')[0]}`) }}<br />
                        </p>
                        <p>{{ $t('s.collectible.info.mintable') }}</p>
                      </div>
                    </div>
                    <hr />
                  </template>

                  <div v-if="exchangeItem.item.powerScore > 0 || exchangeItem.item.options.length > 0" class="wrap-option">
                    <h2 class="title">{{ exchangeItem.item.powerScore > 0 ? $t('t.exd.power.score') : $t('w.exd.options') }}</h2>
                    <div v-if="exchangeItem.item.powerScore > 0" class="totalscore">
                      <span class="ico-total">{{ exchangeItem.item.powerScore | currency(0) }}</span>
                    </div>

                    <ul v-if="exchangeItem.item.options" class="list">
                      <item-option v-for="option in exchangeItem.item.options" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>
                  <div
                    v-if="exchangeItem.item.itemType === '17_2' && exchangeItem.item.passiveOption && exchangeItem.item.passiveOption.petOrigin"
                    class="wrap-option"
                  >
                    <h2 class="title">{{ exchangeItem.item.passiveOption.petOrigin }}</h2>
                    <ul class="list">
                      <item-option :option="{ optionName: exchangeItem.item.passiveOption.desc }" />
                    </ul>
                  </div>
                  <div v-if="exchangeItem.item.addOptions && exchangeItem.item.addOptions.length > 0" class="wrap-option">
                    <h2 class="title">{{ $t('t.exd.add.options') }}</h2>
                    <ul class="list">
                      <item-option v-for="option in exchangeItem.item.addOptions" :key="`option-${option.optionName}`" :option="option" />
                    </ul>
                  </div>

                  <div class="wrap-seller">
                    <div class="seller">
                      <div class="char-info">
                        {{ $t('w.exd.seller') }}
                        <strong>
                          <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                              <span v-bind="attrs" v-on="on">{{ exchangeItem.seller.walletAddress | truncateMiddle }}</span>
                            </template>
                            <span>{{ exchangeItem.seller.walletAddress }}</span>
                          </v-tooltip>
                        </strong>
                      </div>
                      <div class="sale">
                        {{ $t('w.exd.listed') }}
                        <strong>{{ exchangeItem.seller.saleCount }}</strong>
                      </div>
                      <div class="completed">
                        {{ $t('w.exd.tx.complete') }}
                        <strong>{{ exchangeItem.seller.soldOutCount }}</strong>
                      </div>
                    </div>
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
                <div v-if="!exchangeItem.item.uniqueNo" class="suggest-list">
                  <ul class="list">
                    <router-link
                      v-for="suggestItem in suggestedTradeItems
                        .filter((item) => item.tradeUID != exchangeItem.tradeUID && !item.uniqueNo)
                        .slice(0, 5)"
                      :key="`suggested-item-${suggestItem.tradeUID}`"
                      tag="li"
                      :to="`/exd/trade/${suggestItem.tradeUID}`"
                      style="cursor: pointer"
                    >
                      <exd-hydra-price :hide-label="true" :price="suggestItem.price" icon-size="ss" label-class="mb-0" />
                      <div class="enhance">
                        <span>{{ $t('w.common.item.enhance') }}</span
                        ><strong>+{{ suggestItem.item.enhance }}</strong>
                      </div>
                      <div class="score">
                        <span>{{ $t('t.exd.power.score') }}</span
                        ><strong>{{ suggestItem.item.PowerScore | currency(0) }}</strong>
                      </div>
                      <div class="seller">
                        <span>{{ $t('w.exd.seller') }}</span>
                        <v-tooltip bottom>
                          <template #activator="{ on, attrs }">
                            <strong v-bind="attrs" v-on="on">{{
                                suggestItem.walletAddress || suggestItem.seller.walletAddress | truncateMiddle
                              }}</strong>
                          </template>
                          <span>{{ suggestItem.walletAddress || suggestItem.seller.walletAddress }}</span>
                        </v-tooltip>
                      </div>
                    </router-link>
                  </ul>
                </div>
              </div>
              <exd-daily-avg-price-chart :item-id="exchangeItem.item.itemID" :enhance="exchangeItem.item.enhance" :grade="exchangeItem.item.grade" />
              <div class="wrap-overall">
                <div class="overall-header">
                  <h2 class="title">
                    {{
                      $t('t.exd.overall.stat', [
                        `${exchangeItem.item.itemName || exchangeItem.item.name}${
                          exchangeItem.item.enhance > 0 ? '+ ' + exchangeItem.item.enhance : ''
                        }`,
                      ])
                    }}
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
            <div v-else-if="exdErrorCode">Server Error : {{ exdErrorCode }}</div>
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
    <modal-exchange />
    <Footer />

    <div class="float-bottom">
      <div v-if="exchangeItem" class="sale-item">
        <item-info :item="exchangeItem.item" />
        <div class="wrap-buy">
          <div class="price">
            <strong class="ico-hydra ico-sm add-inside"
            >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></strong
            >
            <span class="rate">$ {{ usd }}</span>
          </div>
          <button v-if="exchangeItem.myItem == 0" type="button" class="btn btn-primary-exd" @click="openTrade">
            {{ $t('w.exd.event.purchase') }}
          </button>
          <button v-else type="button" class="btn btn-primary" @click="openCancel">{{ $t('t.exd.sales.cancel') }}</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs, watch } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import ItemCard from '@/components/common/item/ItemCard';
import ItemOption from '@/components/common/item/ItemOption';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import ExchangeItemDescription from '@/components/exd/common/ExchangeItemDescription';
import ExdDailyAvgPriceChart from '@/components/exd/common/ExdDailyAvgPriceChart';
import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';
import ItemInfo from '@/components/exd/common/ItemInfo';
import ItemMonthlyStat from '@/components/exd/common/ItemMonthkyStat';
import ItemStat from '@/components/exd/common/ItemStat';
import ModalExchange from '@/components/exd/common/modal/ModalExchange';
import { useFormattedRefNumber } from '@/utils/composables/common';
import { useHydraToUsd } from '@/utils/composables/exchange';
import { useWemixLogin } from '@/utils/composables/round';
import { UniqueDict } from '@/constants/exchange';
import Footer from '@/components/common/Footer';

const { useState: useAccountState } = createNamespacedHelpers('account');
const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useHspState, useActions: useHspActions, useMutations: useHspMutations } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'ExdTradeItem',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
    hasBottomSticky: 'type1',
  },
  components: {
    ExdHydraPrice,
    ExdDailyAvgPriceChart,
    BackButton,
    ItemStat,
    ItemMonthlyStat,
    ModalExchange,
    AccountInfo,
    ItemOption,
    ExchangeItemDescription,
    ItemCard,
    Footer,
    ItemInfo,
    SidebarContactUs,
  },
  setup(_, { root }) {
    const { $i18n, $route, $router, $store, $dracoWebApi } = root;
    const { id } = $route.params;

    if (!id) {
      $router.replace('/exd/list');
    }

    const state = reactive({
      stat: null,
      suggestedTradeItems: [],
      suggestedTradeItemsMore: false,
      chartData: null,
      chartOptions: null,
      chartPlugin: null,
    });

    const { wemixLogin } = useWemixLogin(root);

    const { loading, exchangeItem, exdErrorCode } = useExdState(['loading', 'exchangeItem', 'exdErrorCode']);
    const { fetchTradeItem } = useExdActions(['fetchTradeItem']);
    const { setOpenExchange, setExchangeItem } = useExdMutations(['setOpenExchange', 'setExchangeItem']);

    const { setCommonModal } = useMutations(['setCommonModal']);
    const { closeModal } = useActions(['closeModal']);

    const { exist } = useAccountState(['exist']);

    const dspSeason = computed(() => {
      if (exchangeItem.value) {
        if (exchangeItem.value.item.uniqueNo && exchangeItem.value.item.uniqueNo.match(/^[S02](.+){4,}/)) {
          return 2;
        }
      }

      return 1;
    });

    const formattedPrice = useFormattedRefNumber(exchangeItem);
    const { usd } = useHydraToUsd(exchangeItem, 'price');

    const openTrade = () => {
      const { dracoAccessToken, balance } = $store.state;
      if (!dracoAccessToken) {
        wemixLogin();
        return;
      }

      if (!balance) {
        $store.dispatch('fetchBalance');
        return;
      }

      if (Number(balance.HYDRA) < Number(exchangeItem.value.price)) {
        setCommonModal({
          open: true,
          title: root.$t('t.exd.purchase.draco.not-enough'),
          desc: root.$t('s.exd.purchase.draco.not-enough'),
          primary: 'OK',
        });
        return;
      }

      setOpenExchange(true);
    };

    const openCancel = () => {
      setCommonModal({
        open: true,
        title: root.$t('s.exd.cancel.item', [exchangeItem.value.item.itemName]),
        primary: 'Ok',
        secondary: 'Cancel',
        onPrimary: () => {
          $dracoWebApi.delete('/exd/tradeitem', { params: { tradeUID: id } }).then(({ data }) => {
            if (data.code === 200) {
              $router.replace(`/exd/my-items`);
            }
          });
        },
        onSecondary: () => {
          closeModal();
        },
        onClose: () => {
          console.log('aa');
        },
      });
    };

    const fetchOtherTrades = () => {
      $dracoWebApi
        .get('/exd/sameitem/lists', { params: { itemID: exchangeItem.value.item.itemID, enhance: exchangeItem.value.item.enhance } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.suggestedTradeItems = [...data.data.lists];
            state.suggestedTradeItemsMore = data.data.more || false;
          }
        });
    };

    const fetchSummary = () => {
      $dracoWebApi
        .get('/exd/sameitem/summary', { params: { itemID: exchangeItem.value.item.itemID, enhance: exchangeItem.value.item.enhance } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.stat = { ...data.data };
          }
        });
    };

    watch(
      () => id,
      (from, to) => {
        fetchTradeItem(from);
      },
    );

    watch(
      () => exchangeItem.value,
      () => {
        if (exchangeItem.value) {
          fetchOtherTrades();
          fetchSummary();
        }
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchTradeItem(id);
      },
    );

    onMounted(() => {
      if (exchangeItem.value && exchangeItem.value.tradeUID !== id) {
        setExchangeItem(null);
      }
      fetchTradeItem(id);
    });

    return {
      ...toRefs(state),
      exchangeItem,
      exdErrorCode,
      loading,
      formattedPrice,
      usd,
      openTrade,
      openCancel,
      UniqueDict,
      exist,
      dspSeason,
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

.wrap-price-history {
  position: relative;
  padding: 48px 0 0;
  min-height: 100px;

  .price-chart {
    margin-top: 18px;
  }
}
</style>
