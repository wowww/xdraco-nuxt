<template>
  <div class="option-detail">
    <div v-if="item" class="wrap-item-desc">
      <div class="item-manual">
        <h3 class="item-title">{{ item.character.name }}</h3>
        <p class="item-subtitle">{{ item.character.worldName }}</p>
        <ul class="item-detail-table size-lg">
          <li class="classname">
            <span>{{ $t(`w.rounds.item.class.${item.character.class}`) }}</span>
            <strong>
              <character-class-thumb :character-class="item.character.class" size="48" type="icon" />
            </strong>
          </li>
          <li class="level">
            <span>{{ $t('w.rounds.level') }}</span>
            <strong>{{ item.character.level }}</strong>
          </li>
          <li class="power">
            <span>{{ $t('t.exd.power.score') }}</span>
            <strong>{{ item.character.powerScore | currency(0) }}</strong>
          </li>
        </ul>
      </div>

      <ul class="list">
        <li v-show="false">
          <span class="skill-desc">{{ $t('w.nft.minted.on') }}</span>
          <strong class="value">{{ item.mintedTS | dateFormat }}</strong>
        </li>
        <li>
          <span class="skill-desc">{{ $t('w.nft.sealed.on') }}</span>
          <strong class="value">{{ item.sealedTS | dateFormat }}</strong>
        </li>
        <li>
          <span class="skill-desc">NFT ID</span>
          <strong class="value">
            <a :href="`https://scope.wemixnetwork.com/1003/nft/${item.contractAddress}/${item.nftID}`" target="_blank">{{ item.nftID }}</a>
          </strong>
        </li>
        <li>
          <span class="skill-desc">{{ $t('w.nft.blockchain') }}</span>
          <strong class="value">{{ item.blockChain }}</strong>
        </li>
      </ul>
      <div class="wrap-button">
        <button
          type="button"
          class="btn"
          :class="{ 'btn-price btn-primary-nft': item.tradeType === 1 }"
          :disabled="item.tradeType !== 1"
          @click="purchase"
        >
          <em class="price">
            <strong class="ico-wemixcredit ico-ss add-inside">{{ item.price | currency(0) }}</strong>
            <span class="rate">
              <template v-if="item.tradeType === 1"> $ {{ priceUSD | currency(0, true) }}</template>
              <template v-if="item.tradeType === 2">{{ $t('t.exd.sales.cancel') }}</template>
              <template v-else-if="item.tradeType === 3">
                {{ $t('w.exd.my-items.tab.sold-out') }}
              </template>
            </span>
          </em>
        </button>
        <!-- 구매 완료시 -->
        <!-- <button type="button" class="btn" disabled>구매 완료</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import NftIntroWallet from '@/components/nft/common/NftIntroWallet';

const { useState: useExdState } = createNamespacedHelpers('exd');

const { useState: useNftState, useGetters: useNftGetters, useMutations: useNftMutations } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterDescription',
  components: { CharacterClassThumb },
  props: {
    item: {
      type: Object,
    },
    purchase: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const { price } = useExdState(['price']);

    return {
      price,
    };
  },
  computed: {
    priceUSD() {
      return this.item.price * Number(this.price.USDWemixRate);
    },
  },
});
</script>

<style lang="scss">
.btn:disabled {
  .ico-wemixcredit {
    &::before {
      opacity: 0.5;
    }
  }
}
</style>
