<template>
  <main class="contents">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <div v-if="myItem" class="exchange-market add-float">
          <div class="wrap-addition">
            <!-- 디자인파트에서 원하는 기능인거 같습니다. -->
            <!-- https://renatodeleao.github.io/vue-sticky-directive/ -->
            <!-- https://codesandbox.io/s/mm4olmxkrx -->
            <div class="wrap-card">
              <item-card :item="myItem.item" :collectible="!!myItem.item.uniqueNo" />
            </div>
            <div class="option-detail">
              <div class="wrap-item-desc">
                <exchange-item-description :item="myItem.item" />

                <!--                <div class="wrap-form">-->
                <!--                  <h3 class="title">Price</h3>-->
                <!--                  <div class="fieldset editable focus">-->
                <!--                    <div>-->
                <!--                      <span class="ico-hydra ico-xs"><em class="hidden">DRACO</em></span>-->
                <!--                      <input type="text" v-model="salesDraco" @input="inputOnlyNum" />-->
                <!--                    </div>-->
                <!--                    &lt;!&ndash; .add-draco &ndash;&gt;-->
                <!--                  </div>-->
                <!--                </div>-->

                <!--                <div class="wrap-button">-->
                <!--                  <button type="button" class="btn btn-primary" :disabled="salesDraco === ''" @click="openRegister = true">Register sale</button>-->
                <!--                </div>-->
              </div>
              <div v-if="myItem.item.powerScore > 0 || myItem.item.options.length > 0" class="wrap-option">
                <h2 class="title">{{ myItem.item.powerScore > 0 ? $t('t.exd.power.score') : $t('w.exd.options') }}</h2>
                <div class="totalscore">
                  <span class="ico-total">{{ myItem.item.powerScore | currency(0) }}</span>
                </div>

                <ul v-if="myItem.item.options" class="list">
                  <item-option v-for="option in myItem.item.options" :key="`option-${option.optionName}`" :option="option" />
                </ul>
              </div>
              <div v-if="myItem.item.itemType === '17_2' && myItem.item.passiveOption && myItem.item.passiveOption.petOrigin" class="wrap-option">
                <h2 class="title">{{ myItem.item.passiveOption.petOrigin }}</h2>
                <ul class="list">
                  <item-option :option="{ optionName: myItem.item.passiveOption.desc }" />
                </ul>
              </div>
              <div v-if="myItem.item.addOptions.length > 0" class="wrap-option">
                <h2 class="title">{{ $t('t.exd.add.options') }}</h2>
                <ul class="list">
                  <item-option v-for="option in myItem.item.addOptions" :key="`option-${option.optionName}`" :option="option" />
                </ul>
              </div>
              <!-- .wrap-seller -->
            </div>
          </div>
          <exd-daily-avg-price-chart :item-id="myItem.item.itemID" :enhance="myItem.item.enhance" :grade="myItem.item.grade" />
          <!-- .wrap-suggest -->
          <div class="wrap-overall">
            <div class="overall-header">
              <h2 class="title">{{ $t('t.exd.overall.stat', [myItem.item.name]) }}</h2>
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
    </section>
    <v-dialog v-model="openRegister" content-class="dialog-item-regi theme-dark" max-width="640" persistent fullscreen>
      <div class="content">
        <v-btn class="btn-close" fab plain x-small @click="openRegister = false">
          <v-icon color="#fff" size="26">mdi-close</v-icon>
        </v-btn>
        <div class="dialog-header">
          <h2 class="title">{{ $t('w.exd.event.listing') }}</h2>
        </div>

        <div v-if="myItem" class="item-content">
          <div class="wrap-cardinfo">
            <div class="card-detail">
              <item-card :item="myItem.item" :collectible="!!myItem.item.uniqueNo" />
            </div>

            <div class="item-detail">
              <exchange-item-description :item="myItem.item" />

              <div class="credit-info">
                <div class="category">{{ $t('w.exd.purchase.price') }}</div>
                <div class="info">
                  <span class="ico-hydra ico-sm add-inside">{{ price | currency(2) }}</span>
                </div>
              </div>

              <ul class="list">
                <li>{{ $t('s.exd.purchase.desc.1', [5]) }}</li>
                <li>{{ $t('s.exd.purchase.desc.2') }}</li>
                <li>{{ $t('s.exd.purchase.desc.3') }}</li>
                <li>{{ $t('s.exd.purchase.desc.4') }}</li>
                <li>{{ $t('s.exd.purchase.desc.5', [14]) }}</li>
              </ul>
            </div>
          </div>

          <div class="wrap-button">
            <button type="button" class="btn btn-primary2" :disabled="loading" @click="register">{{ $t('w.exd.purchase.register') }}</button>
          </div>
        </div>
      </div>
    </v-dialog>
    <Footer />
    <div class="float-bottom">
      <div class="sale-item">
        <validation-provider ref="form" v-slot="{ errors }" tag="div" class="wrap-regi" :rules="{ required: true, decimal2: true }">
          <div class="wrap-form">
            <div class="form-header">
              <h3 class="title">{{ $t('w.exd.sales.price') }}</h3>
              <strong class="notice" v-html="$t('t.exd.tx.fee', [5])"></strong>
            </div>
            <!-- focus -->
            <div class="fieldset editable">
              <div>
                <span class="ico-hydra ico-xs"><em class="hidden">DRACO</em></span>
                <input v-model="price" type="text" :placeholder="$t('w.exd.sales.price')" @keyup="inputPrice" @keydown="inputPrice" />
              </div>
            </div>
          </div>
          <div class="wrap-button">
            <button type="button" class="btn btn-primary-exd" :disabled="errors.length > 0" @click="openRegister = true">
              {{ $t('w.exd.purchase.register') }}
            </button>
          </div>
        </validation-provider>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

import ItemCard from '@/components/common/item/ItemCard';
import ItemOption from '@/components/common/item/ItemOption';
import ExchangeItemDescription from '@/components/exd/common/ExchangeItemDescription';
import ExdDailyAvgPriceChart from '@/components/exd/common/ExdDailyAvgPriceChart';
import ItemMonthlyStat from '@/components/exd/common/ItemMonthkyStat';
import ItemStat from '@/components/exd/common/ItemStat';
import { MyItemTab } from '@/constants/exchange';
import Footer from '@/components/common/Footer';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  components: {
    Footer,
    ItemCard,
    ExchangeItemDescription,
    ItemOption,
    ItemStat,
    ItemMonthlyStat,
    ExdDailyAvgPriceChart,
  },
  setup(props, { root }) {
    const { locale, $route, $router, $i18n } = root;
    const itemUID = $route.params.id;

    if (!itemUID) {
      $router.replace('/exd/my-items');
    }

    const form = ref(null);
    const state = reactive({
      stat: null,
      openRegister: false,
      loading: false,
      price: '',
    });

    const { myItem } = useExdState(['myItem']);
    const { setMyItemTab } = useExdMutations(['setMyItemTab']);
    const { fetchMyItem } = useExdActions(['fetchMyItem']);

    const { setCommonModal } = useMutations(['setCommonModal']);

    const inputPrice = (v) => {
      console.log(state.price);
      if (state.price) {
        state.price = state.price.replace(/[^0-9.]/g, '');
      }
    };

    const earned = computed(() => {
      if (state.price && !Number.isNaN(state.price)) {
        return new BigNumber(state.price).times(0.95).toFormat(4);
      }

      return 0;
    });

    const register = async () => {
      if (state.loading) {
        return;
      }

      const { errors } = await form.value.validate();

      console.log(errors);

      if (errors.length > 0) {
        return;
      }

      state.loading = true;
      root.$dracoWebApi
        .post('/exd/item', {
          itemUID,
          price: state.price,
        })
        .then(({ data }) => {
          state.loading = false;
          if (data.code === 200) {
            setCommonModal({
              open: true,
              title: root.$t('t.exd.purchase.register.complete'),
              desc: root.$t('s.exd.purchase.register.complete', [myItem.value.item.name || myItem.value.item.itemName]),
              primary: 'OK',
              onPrimary() {
                setMyItemTab(MyItemTab.SALE);
                root.$router.push('/exd/my-items');
              },
            });
          } else {
            setCommonModal({
              open: true,
              title: root.$t('t.exd.register.failed'),
              desc: `Error Code : ${data.code}`,
              primary: 'OK',
            });
          }
        })
        .catch(() => {
          state.loading = false;
        });
    };

    onMounted(() => {
      fetchMyItem(itemUID);
    });

    const fetchSummary = () => {
      root.$dracoWebApi
        .get('/exd/sameitem/summary', { params: { itemID: myItem.value.item.itemID, enhance: myItem.value.item.enhance } })
        .then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            state.stat = { ...data.data };
          }
        });
    };

    watch(
      () => myItem.value,
      () => {
        if (myItem.value) {
          if (form.value) {
            form.value.validate();
          }

          fetchSummary();
        }
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchMyItem(itemUID);
      },
    );

    return {
      ...toRefs(state),
      myItem,
      form,
      inputPrice,
      register,
      earned,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',

    // for layer-price-range
    showLayerPriceRange: false,

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
</style>
