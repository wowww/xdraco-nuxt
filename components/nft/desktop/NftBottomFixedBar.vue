<template>
  <div v-if="item" v-show="item.tradeType === 1" class="float-bottom">
    <div class="sale-item">
      <div :data-item-type="`grade-${characterGrade}`" class="item-info">
        <div class="item__layer">
          <div v-if="character && character.class && characterGrade" class="wrap-item">
            <img :src="icon" width="56" :alt="characterClass" class="item" />
          </div>
        </div>
        <div class="item-desc">
          <h4 class="item-name">{{ character && character.name }}</h4>
          <p>{{ character && character.worldName }}</p>
        </div>
        <div class="item-manual">
          <ul class="item-detail-table size-lg">
            <li class="classname">
              <span>{{ $t(`w.rounds.item.class.${character && character.class}`) }}</span>
              <strong>
                <character-class-thumb :character-class="character && character.class" size="28" type="icon" />
              </strong>
            </li>
            <li class="level">
              <span>{{ $t('w.rounds.level') }}</span>
              <strong>{{ character && character.level }}</strong>
            </li>
            <li class="power">
              <span>{{ $t('t.exd.power.score') }}</span>
              <strong>{{ character && character.powerScore | currency(0) }}</strong>
            </li>
          </ul>
        </div>
      </div>
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
import arbalist2 from '@/assets/img/common/card/arbalist-grade2.webp';
import arbalist3 from '@/assets/img/common/card/arbalist-grade3.webp';
import arbalist4 from '@/assets/img/common/card/arbalist-grade4.webp';
import arbalist5 from '@/assets/img/common/card/arbalist-grade5.webp';
import sorcerer2 from '@/assets/img/common/card/sorcerer-grade2.webp';
import sorcerer3 from '@/assets/img/common/card/sorcerer-grade3.webp';
import sorcerer4 from '@/assets/img/common/card/sorcerer-grade4.webp';
import sorcerer5 from '@/assets/img/common/card/sorcerer-grade5.webp';
import taoist2 from '@/assets/img/common/card/taoist-grade2.webp';
import taoist3 from '@/assets/img/common/card/taoist-grade3.webp';
import taoist4 from '@/assets/img/common/card/taoist-grade4.webp';
import taoist5 from '@/assets/img/common/card/taoist-grade5.webp';
import lancer2 from '@/assets/img/common/card/lancer-grade2.webp';
import lancer3 from '@/assets/img/common/card/lancer-grade3.webp';
import lancer4 from '@/assets/img/common/card/lancer-grade4.webp';
import lancer5 from '@/assets/img/common/card/lancer-grade5.webp';
import warrior2 from '@/assets/img/common/card/warrior-grade2.webp';
import warrior3 from '@/assets/img/common/card/warrior-grade3.webp';
import warrior4 from '@/assets/img/common/card/warrior-grade4.webp';
import warrior5 from '@/assets/img/common/card/warrior-grade5.webp';
import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import CharacterClass from '@/constants/character/character-class';

export default {
  name: 'NftBottomFixedBar',
  components: {
    CharacterClassThumb,
  },
  props: {
    item: {
      type: Object,
    },
    priceRate: {
      type: Object,
    },
    characterClass: {
      type: String,
    },
    characterGrade: {
      type: Number,
    },
    onClickPurchase: {
      type: Function,
    },
  },
  computed: {
    character() {
      return this.item.character;
    },
    resources() {
      return {
        [CharacterClass.WARRIOR]: { 2: warrior2, 3: warrior3, 4: warrior4, 5: warrior5 },
        [CharacterClass.SORCERER]: { 2: sorcerer2, 3: sorcerer3, 4: sorcerer4, 5: sorcerer5 },
        [CharacterClass.TAOIST]: { 2: taoist2, 3: taoist3, 4: taoist4, 5: taoist5 },
        [CharacterClass.ARBALIST]: { 2: arbalist2, 3: arbalist3, 4: arbalist4, 5: arbalist5 },
        [CharacterClass.LANCER]: { 2: lancer2, 3: lancer3, 4: lancer4, 5: lancer5 },
      };
    },
    icon() {
      return this.resources[Number(this.character.class)][this.characterGrade];
    },
    priceUSD() {
      return this.item.price * Number(this.priceRate.USDWemixRate);
    },
  },
};
</script>


