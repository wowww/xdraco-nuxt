<template>
  <li :class="{ 'list-item__item': isMobile }">
    <nuxt-link v-if="useLink" :to="`/nft/trade/${item.seq}`" class="link">
      <nft-card :size="size" :item="item" :non-flipped="useLink" />
    </nuxt-link>
    <nft-card v-else :item="item" />
    <em v-if="rank > 0" class="rank-badge">
      <template v-if="rank === 1"> 1st</template>
      <template v-else-if="rank === 2"> 2nd</template>
      <template v-else-if="rank === 3"> 3rd</template>
      <template v-else>{{ rank }}th</template>
    </em>
    <div v-if="traded" class="traded-info">
      <!-- data-new="true" 최고가 거래에 신규 건 추가시 빨간점 표시 (24시간 동안 표시) -->
      <div class="wrap-price" :data-new="badge && isNew(item.tradeDT)">
        <strong class="ico-wemixcredit ico-ss add-inside">{{ item.price | currency(0) }}</strong>
      </div>
      <dl class="seller">
        <dt>Seller</dt>
        <!--        <dd class="seller-nickname">{{ item.seller.characterName }}</dd>-->
        <dd class="seller-info" style="opacity: 1">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ item.seller.userAddress | truncateMiddle }}</span>
            </template>
            <span>{{ item.seller.userAddress }}</span>
          </v-tooltip>
        </dd>
      </dl>
      <dl class="date">{{ item.tradeDT | fromNow }}</dl>
    </div>
    <div v-else-if="useLink" class="wrap-button">
      <button type="button" class="btn btn-price btn-primary-nft" @click="go2Detail">
        <em class="price">
          <strong class="ico-wemixcredit ico-ss add-inside">{{ item.price | currency(0) }}</strong>
          <span class="rate">$ {{ (item.price * price ? Number(price.USDWemixRate) : 0) | currency(0, true) }}</span>
        </em>
      </button>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import NftCard from '@/components/nft/common/NftCard';
import { isNew } from '@/utils/filters/date';

export default defineComponent({
  name: 'NftItem',
  components: { NftCard },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    rank: {
      type: Number,
      default: 0,
    },
    useLink: {
      type: Boolean,
      default: false,
    },
    traded: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'sm',
      required: false,
    },
  },
  setup({ item }, { root }) {
    const go2Detail = () => {
      root.$router.push({
        path: `/nft/trade/${item.seq}`,
        params: item.seq,
      });
    };
    return {
      isNew,
      go2Detail,
    };
  },

  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    price() {
      return this.$store.state.exd.price;
    },
  }
});
</script>
