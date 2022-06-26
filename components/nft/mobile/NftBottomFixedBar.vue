<template>
  <div v-if="item" v-show="item.tradeType === 1" class="float-bottom">
    <div class="sale-item">
      <!-- ItemInfo -->
      <div class="wrap-buy">
        <div class="price">
          <strong class="ico-wemixcredit ico-sm add-inside">{{ item.price | currency(0) }}</strong>
          <span class="rate">${{ priceUSD | currency(0, true) }}</span>
        </div>
        <button
          type="button"
          class="btn"
          :class="{ 'btn-primary-nft': item.tradeType === 1 }"
          :disabled="item.tradeType !== 1"
          @click="onClickPurchase"
        >
          <template v-if="item.tradeType === 1">
            {{ $t('w.exd.event.purchase') }}
          </template>
          <em v-else-if="item.tradeType === 2" class="btn-message">{{ $t('t.exd.sales.cancel') }}</em>
          <em v-else-if="item.tradeType === 3" class="btn-message">{{ $t('w.exd.my-items.tab.sold-out') }}</em>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NftBottomFixedBar',
  props: {
    item: {
      type: Object,
    },
    priceRate: {
      type: Object,
    },
    onClickPurchase: {
      type: Function,
    },
  },
  computed: {
    priceUSD() {
      return this.item.price * Number(this.priceRate.USDWemixRate);
    },
  },
};
</script>


