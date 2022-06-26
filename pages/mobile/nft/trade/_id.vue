<template>
  <main class="contents nft" :class="`market bg-grade-${nftGrade}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <div class="exchange-market add-float">
          <!-- 상단 캐릭터 정보 영역 -->
          <div v-if="loading" class="wrap-addition">
            <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
              <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
            </div>
          </div>
          <div v-else-if="!loading && item" class="wrap-addition">
            <nft-character-equipment :width="320" :load-info="loadInfo" />
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
    </section>
    <Footer></Footer>
    <nft-bottom-fixed-bar :item="item" :price-rate="price" :on-click-purchase="purchase" />
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import NftCharacterAsset from '@/components/nft/desktop/NftCharacterAsset';
import NftCharacterCodex from '@/components/nft/desktop/NftCharacterCodex';
import NftCharacterConquest from '@/components/nft/desktop/NftCharacterConquest';
import NftCharacterDescription from '@/components/nft/desktop/NftCharacterDescription';
import NftCharacterEquipment from '@/components/nft/desktop/NftCharacterEquipment';
import NftCharacterInventory from '@/components/nft/desktop/NftCharacterInventory';
import NftCharacterMagicStone from '@/components/nft/desktop/NftCharacterMagicStone';
import NftCharacterPriceHistory from '@/components/nft/desktop/NftCharacterPriceHistory';
import NftCharacterSkill from '@/components/nft/desktop/NftCharacterSkill';
import NftCharacterStat from '@/components/nft/desktop/NftCharacterStat';
import NftCharacterTraining from '@/components/nft/desktop/NftCharacterTraining';
import NftCharacterSpirit from '@/components/nft/desktop/NftCharacterSpirit';
import NftBottomFixedBar from '@/components/nft/mobile/NftBottomFixedBar';
import NftCharacterMysticalPieces from '@/components/nft/desktop/NftCharacterMysticalPieces';
import CharacterClass from '@/constants/character/character-class';
import Footer from '@/components/common/Footer';

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
  },
  setup(props, { root }) {
    const { $route, $device, $store } = root;
    const seq = $route.params.id;
    const { price } = useExdState(['price']);

    const qrRef = ref(null);
    const state = reactive({
      os: '',
      checkTimer: null,
      loadInfo: false,
    });

    const {
      loading,
      item,
      itemError,
      openQR,
    } = useNftState(['loading', 'item', 'itemError', 'openQR']);

    const { nftGrade } = useNftGetters(['nftGrade']);

    const { fetchNftItem } = useNftActions(['fetchNftItem']);
    const { setOpenQR, setItem } = useNftMutations(['setOpenQR', 'setItem']);

    onMounted(() => {
      fetchNftItem(seq);
    });

    const characterGrade = computed(() => {
      if (item.value.character.powerScore > 205000) {
        return 5;
      }

      if (item.value.character.powerScore > 170000) {
        return 4;
      }

      if (item.value.character.powerScore > 135000) {
        return 3;
      }

      return 2;
    });

    const characterClass = computed(() => {
      return CharacterClass[item.value.character.class];
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
        else if ($device.isIos) state.os = 'ios';
        else state.os = 'etc';
      } else {
        // 모바일이 아닐 때
        state.os = 'nomobile';
      }

      // 앱에 설정해놓은 커스텀 스킴.
      const schemeHost = 'wemix-wallet://wemixnetwork.com';
      const urlScheme = `${schemeHost}/nft/dex/detail?symbol=M4CHA&tid=${item.value.nftID}`;

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
        // console.log(item.contractAddress);
        // setOpenQR(true);
        //
        // root.$nextTick(() => {
        //   const url = `wemix-wallet://wemixnetwork.com/nft/dex/detail?symbol=M4CHA&tid=${item.value.nftID}`;
        //   console.log(url);
        //   qrcode.toCanvas(document.querySelector('.qrcode-area'), url, { width: 300, errorCorrectionLevel: 'L' });
        // });
      }
    };

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
    });

    return {
      loading,
      nftGrade,
      price,
      item,
      itemError,
      characterClass,
      characterGrade,
      openQR,
      setOpenQR,
      qrRef,
      purchase,
      ...toRefs(state),
    };
  },
  data: () => ({
    number: 0,
    isDevelopment: process.env.NODE_ENV === 'development',
    Category: ['grade-5', 'grade-4', 'grade-3', 'grade-2'],
  }),
  beforeMount() {
    const N = Math.floor(Math.random() * 4);
    this.rankType = this.Category[N];
  },
  created() {
    setTimeout(() => {
      document.documentElement.classList.add('init--nft-detail');
    }, 10);
  },
  destroyed() {
    document.documentElement.classList.remove('init--nft-detail');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

// NFT 상품상세
@import '~@/assets/sass/common/pages/_nft-detail.scss';
@import '~@/assets/sass/common/pages/_popup-nft.scss';
</style>
