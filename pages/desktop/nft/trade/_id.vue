<template>
  <main class="contents nft" :class="`market single bg-grade-${nftGrade}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />

        <div class="wrap-grid">
          <div class="grid-timeline">
            <div class="exchange-market">
              <div v-if="loading" class="wrap-addition">
                <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
                  <v-progress-circular class="ml-2" size="24" width="4" color="#f0f0f0" indeterminate />
                </div>
              </div>
              <div v-else-if="!loading && item" class="wrap-addition">
                <nft-character-equipment :load-info="loadInfo" />
                <nft-character-description :purchase="purchase" :item="item" />
              </div>
              <div v-else-if="!loading && itemError" class="wrap-addition">Error: {{ itemError }}</div>

              <template v-if="item">
                <nft-character-stat :load-info="loadInfo" />
                <nft-character-skill v-show="loadInfo" />
                <nft-character-spirit v-show="loadInfo" />
                <nft-character-magic-stone v-show="loadInfo" />
                <nft-character-mystical-pieces v-show="loadInfo" />
                <nft-character-training v-show="loadInfo" />
                <nft-character-conquest v-show="loadInfo" />
                <nft-character-asset v-show="loadInfo" />
                <nft-character-codex v-show="loadInfo" />
                <nft-character-inventory v-show="loadInfo" />
                <nft-character-price-history />
              </template>
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
    <Footer></Footer>
    <nft-purchase-dialog :open="openQR" :set-open="setOpenQR" :remain="remain" />
    <nft-bottom-fixed-bar
      :item="item"
      :price-rate="price"
      :character-class="characterClass"
      :character-grade="nftGrade"
      :on-click-purchase="purchase"
    />
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import NftPurchaseDialog from '@/components/nft/common/NftPurchaseDialog';
import NftBottomFixedBar from '@/components/nft/desktop/NftBottomFixedBar';
import NftCharacterAsset from '@/components/nft/desktop/NftCharacterAsset';
import NftCharacterCodex from '@/components/nft/desktop/NftCharacterCodex';
import NftCharacterConquest from '@/components/nft/desktop/NftCharacterConquest';
import NftCharacterDescription from '@/components/nft/desktop/NftCharacterDescription';
import NftCharacterMagicStone from '@/components/nft/desktop/NftCharacterMagicStone';
import NftCharacterSkill from '@/components/nft/desktop/NftCharacterSkill';
import NftCharacterStat from '@/components/nft/desktop/NftCharacterStat';
import NftCharacterMysticalPieces from '@/components/nft/desktop/NftCharacterMysticalPieces';
import NftCharacterTraining from '@/components/nft/desktop/NftCharacterTraining';
import NftCharacterInventory from '@/components/nft/desktop/NftCharacterInventory';
import NftCharacterPriceHistory from '@/components/nft/desktop/NftCharacterPriceHistory';
import NftCharacterSpirit from '@/components/nft/desktop/NftCharacterSpirit';
import Footer from '@/components/common/Footer';
import NftCharacterEquipment from '@/components/nft/desktop/NftCharacterEquipment';

const { useState: useExdState } = createNamespacedHelpers('exd');

const { useState: useNftState, useGetters: useNftGetters, useActions: useNftActions, useMutations: useNftMutations } = createNamespacedHelpers('nft');

export default defineComponent({
  components: {
    Footer,
    NftCharacterSpirit,
    NftCharacterPriceHistory,
    NftCharacterCodex,
    NftCharacterInventory,
    NftCharacterAsset,
    NftCharacterConquest,
    NftCharacterTraining,
    NftCharacterMagicStone,
    NftCharacterMysticalPieces,
    NftCharacterSkill,
    NftCharacterStat,
    NftCharacterDescription,
    NftCharacterEquipment,
    NftBottomFixedBar,
    NftPurchaseDialog,
    AccountInfo,
    BackButton,
    SidebarContactUs,
  },
  setup(props, { root }) {
    const { $i18n, $route, $device, $store } = root;
    const seq = $route.params.id;
    const { price } = useExdState(['price']);
    const qrRef = ref(null);
    const state = reactive({
      os: '',
      checkTimer: null,
      timer: null,
      time: 180,
      loadInfo: false,
    });

    const {
      loading,
      item,
      itemError,
      openQR,
    } = useNftState(['loading', 'item', 'itemError', 'openQR']);

    const { nftGrade, characterClass } = useNftGetters(['nftGrade', 'characterClass']);

    const { fetchNftItem } = useNftActions(['fetchNftItem']);
    const { setOpenQR, setItem } = useNftMutations(['setOpenQR', 'setItem']);

    onMounted(() => {
      fetchNftItem(seq);
    });

    const goMarket = () => {
      if (state.os === 'android') {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.wemadetree.wemixwallet&hl=ko&gl=US';
      } else if (state.os === 'ios') {
        window.location.href = 'https://apps.apple.com/kr/app/wemix-wallet/id1531057807';
      }
    };

    const checkAppInstall = () => {
      const mobile = $device.isMobile;

      if (mobile) {
        // 유저에이전트를 불러와서 OS를 구분합니다.
        if ($device.isAndroid) state.os = 'android';
        else if ($device.isIOS) state.os = 'ios';
        else state.os = 'etc';
      } else {
        // 모바일이 아닐 때
        state.os = 'nomobile';
      }

      // 앱에 설정해놓은 커스텀 스킴.
      const schemeHost = 'wemix-wallet://wemixnetwork.com';
      const urlScheme = `${schemeHost}/nft/dex/detail?symbol=M4CHA&tid=${item.nftID}`;

      const clickedAt = +new Date();
      state.checkTimer = setTimeout(() => {
        if (+new Date() - clickedAt < 2000) {
          // if (window.confirm('Wemix 앱이 설치되어 있지 않습니다.   \n설치페이지로 이동하시겠습니까?')) {
          goMarket();
          // }
        }
      }, 1500);
      window.location.href = urlScheme;
    };

    const purchase = () => {
      if ($device.isMobile) {
        checkAppInstall();
      } else {
        $store.dispatch('wemix/sendTransaction', {
          url: `wemix-wallet://wemixnetwork.com/nft/dex/detail?symbol=M4CHA&tid=${item.value.nftID}`,
          onSuccess: () => {
            fetchNftItem(seq);
          },
        });
        // setOpenQR(true);
        //
        // root.$nextTick(() => {
        //   const url = `wemix-wallet://wemixnetwork.com/nft/dex/detail?symbol=M4CHA&tid=${item.value.nftID}`;
        //   qrcode.toCanvas(document.querySelector('.qrcode-area'), url, { width: 300, errorCorrectionLevel: 'L' });
        // });
      }
    };

    const stopTimer = () => {
      clearInterval(state.timer);
      state.time = 0;
    };

    const startTimer = () => {
      state.time = 180;

      state.timer = setInterval(() => {
        state.time -= 1;

        if (state.time <= 0) {
          stopTimer();
          setOpenQR(false);
        }
      }, 1000);
    };

    const remain = computed(() => {
      const time = state.time / 60;
      const minutes = parseInt(time, 10);
      const seconds = Math.round((time - minutes) * 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchNftItem(seq);
      },
    );

    watch(
      () => openQR.value,
      (tobe, asis) => {
        if (asis === true && tobe === false) {
          fetchNftItem(seq);
          stopTimer();
        }

        if (asis === false && tobe === true) {
          startTimer();
        }
      },
    );

    watch(
      () => item.value,
      () => {
        if (item.value) {
          state.loadInfo = item.value.tradeType === 1 || Object.keys(item.value.equipItem).length > 0;
        }
      },
    );

    onUnmounted(() => {
      setItem(null);
      if (state.timer) {
        clearTimeout(state.timer);
      }
    });

    return {
      loading,
      nftGrade,
      characterClass,
      price,
      item,
      itemError,
      openQR,
      setOpenQR,
      qrRef,
      purchase,
      remain,
      ...toRefs(state),
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

// NFT 상품상세
@import '~@/assets/sass/common/pages/_nft-detail.scss';
@import '~@/assets/sass/common/pages/_popup-nft.scss';
</style>
