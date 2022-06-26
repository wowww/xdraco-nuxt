<template>
  <main class="contents rounds">
    <banner-exd-top />
    <section class="section">
      <div class="section__inner">
        <div class="wrap-grid">
          <div class="grid-timeline">
            <div class="myitem-list">
              <my-items-tab />

              <div class="wrap-list">
                <div v-if="!loading && myItems.length > 0" class="list-bar">
                  <div class="list-bar__title">
                    <strong>{{ $t('w.rounds.item') }}</strong>
                    <em>{{ myItems.length }}</em>
                  </div>

                  <my-items-order v-show="false" />
                </div>

                <template v-if="loading">
                  <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate />
                </template>
                <template v-else-if="myItems.length > 0">
                  <ul class="list-myitem">
                    <li v-for="(item, itemIdx) in myItems" :key="`exd-${myItemTab}-${item.tradeUID || item.itemUID}-${itemIdx}`">
                      <my-item :tab-type="myItemTab" :my-item="item" />
                    </li>
                  </ul>
                  <div v-if="myItemsMore" class="wrap-button">
                    <button type="button" class="btn-viewmore" @click="fetchMyItems(myItemsPage + 1)">{{ $t('t.exd.view.more') }}</button>
                  </div>
                </template>
                <div v-else class="list-empty">
                  <template v-if="myItemTab === MyItemTab.SEAL"> {{ $t('s.exd.my-item.seal.no-item') }} </template>
                  <template v-else-if="myItemTab === MyItemTab.SALE"> {{ $t('s.exd.my-item.sales.no-item') }} </template>
                  <template v-else-if="myItemTab === MyItemTab.SOLD_OUT"> {{ $t('s.exd.my-item.soldout.no-item') }} </template>
                  <template v-else-if="myItemTab === MyItemTab.PURCHASE"> {{ $t('s.exd.my-item.purchase.no-item') }} </template>
                </div>
              </div>
            </div>
          </div>

          <!-- 사이드영역 -->
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
import { defineComponent, onMounted, onUnmounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BannerExdTop from '@/components/banner/ExdTop';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import MyItemsOrder from '@/components/exd/common/my/MyItemsOrder';
import MyItemsTab from '@/components/exd/common/my/MyItemsTab';
import MyItem from '@/components/exd/common/MyItem';
import { MyItemTab } from '@/constants/exchange';
import Footer from '@/components/common/Footer';

const { useState: useAccountState } = createNamespacedHelpers('account');
const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'ExdMyItemList',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
    auth: true,
  },
  components: {
    BannerExdTop,
    MyItem,
    MyItemsOrder,
    MyItemsTab,
    Footer,
    AccountInfo,
    SidebarContactUs,
  },
  setup(props, { root }) {
    const { $i18n } = root;
    const { dracoAccessToken } = useState(['dracoAccessToken']);
    const { loading, myItems, myItemTab, myItemsMore, myItemsPage } = useExdState(['loading', 'myItems', 'myItemTab', 'myItemsMore', 'myItemsPage']);
    const { exist } = useAccountState(['exist']);
    const { setMyItemTab } = useExdMutations(['setMyItemTab']);
    const { fetchMyItems } = useExdActions(['fetchMyItems']);

    watch(
      () => myItemTab.value,
      () => {
        fetchMyItems();
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchMyItems();
      },
    );

    watch(
      () => dracoAccessToken.value,
      (current, before) => {
        if (before && !current) {
          root.$router.push('/exd/list');
        }
      },
    );

    onMounted(() => {
      console.log('exd/my-items onMounted');
      setMyItemTab(MyItemTab.SALE);
      if (myItemTab.value === MyItemTab.SALE) {
        if (exist.value === 1) {
          fetchMyItems();
        }
      }
    });

    onUnmounted(() => {
      setMyItemTab(MyItemTab.SALE);
    });

    return {
      MyItemTab,
      loading,
      myItems,
      myItemTab,
      myItemsMore,
      myItemsPage,
      fetchMyItems,
      exist,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
</style>
