<template>
  <div class="item__layer">
    <div class="wrap-item">
      <img
        v-if="nftClass === 1"
        :src="require(`@/assets/img/common/card/warrior-grade${nftGrade}.webp`)"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 2"
        :src="require(`@/assets/img/common/card/sorcerer-grade${nftGrade}.webp`)"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 3"
        :src="require(`@/assets/img/common/card/taoist-grade${nftGrade}.webp`)"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 4"
        :src="require(`@/assets/img/common/card/arbalist-grade${nftGrade}.webp`)"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 5"
        :src="require(`@/assets/img/common/card/lancer-grade${nftGrade}.webp`)"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftIcon',
  props: {
    nftClass: {
      type: Number,
      default: 0,
    },
    nftGrade: {
      type: Number,
      default: 2,
    },
    size: {
      type: Number,
      default: 56,
    },
  },
});
</script>


