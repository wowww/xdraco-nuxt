<template>
  <img :src="thumbnail" :width="size" :alt="className" />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import profileLancer from '@/assets/img/common/login-profile/profile-lancer.webp';
import iconWarrior from '@/assets/img/common/ranking/ico_klass_warrior.webp';
import iconSorcerer from '@/assets/img/common/ranking/ico_klass_sorcerer.webp';
import iconTaoist from '@/assets/img/common/ranking/ico_klass_taoist.webp';
import iconArbalist from '@/assets/img/common/ranking/ico_klass_arbalist.webp';
import iconLancer from '@/assets/img/common/ranking/ico_klass_lancer.webp';
import cardWarriorGrade2 from '@/assets/img/common/card/warrior-grade2.webp';
import cardWarriorGrade3 from '@/assets/img/common/card/warrior-grade3.webp';
import cardWarriorGrace4 from '@/assets/img/common/card/warrior-grade4.webp';
import cardWarriorGrade5 from '@/assets/img/common/card/warrior-grade5.webp';
import cardSorcererGrade2 from '@/assets/img/common/card/sorcerer-grade2.webp';
import cardSorcererGrade3 from '@/assets/img/common/card/sorcerer-grade3.webp';
import cardSorcererGrade4 from '@/assets/img/common/card/sorcerer-grade4.webp';
import cardSorcererGrade5 from '@/assets/img/common/card/sorcerer-grade5.webp';
import cardTaoistGrade2 from '@/assets/img/common/card/taoist-grade2.webp';
import cardTaoistGrade3 from '@/assets/img/common/card/taoist-grade3.webp';
import cardTaoistGrade4 from '@/assets/img/common/card/taoist-grade4.webp';
import cardTaoistGrade5 from '@/assets/img/common/card/taoist-grade5.webp';
import cardArbalistGrade2 from '@/assets/img/common/card/arbalist-grade2.webp';
import cardArbalistGrade3 from '@/assets/img/common/card/arbalist-grade3.webp';
import cardArbalistGrade4 from '@/assets/img/common/card/arbalist-grade4.webp';
import cardArbalistGrade5 from '@/assets/img/common/card/arbalist-grade5.webp';
import cardLancerGrade2 from '@/assets/img/common/card/lancer-grade2.webp';
import cardLancerGrade3 from '@/assets/img/common/card/lancer-grade3.webp';
import cardLancerGrade4 from '@/assets/img/common/card/lancer-grade4.webp';
import cardLancerGrade5 from '@/assets/img/common/card/lancer-grade5.webp';
import profileArbalist from '@/assets/img/common/login-profile/profile-arbalist.webp';
import profileSorcerer from '@/assets/img/common/login-profile/profile-sorcerer.webp';
import profileTaoist from '@/assets/img/common/login-profile/profile-taoist.webp';
import profileWarrior from '@/assets/img/common/login-profile/profile-warrior.webp';
import nftDetailSorcerer2 from '@/assets/img/common/nft-detail/nft-detail-sorcerer2.webp';
import nftDetailSorcerer3 from '@/assets/img/common/nft-detail/nft-detail-sorcerer3.webp';
import nftDetailSorcerer4 from '@/assets/img/common/nft-detail/nft-detail-sorcerer4.webp';
import nftDetailSorcerer5 from '@/assets/img/common/nft-detail/nft-detail-sorcerer5.webp';
import nftDetailTaoist2 from '@/assets/img/common/nft-detail/nft-detail-taoist2.webp';
import nftDetailTaoist3 from '@/assets/img/common/nft-detail/nft-detail-taoist3.webp';
import nftDetailTaoist4 from '@/assets/img/common/nft-detail/nft-detail-taoist4.webp';
import nftDetailTaoist5 from '@/assets/img/common/nft-detail/nft-detail-taoist5.webp';
import nftDetailArbalist2 from '@/assets/img/common/nft-detail/nft-detail-arbalist2.webp';
import nftDetailArbalist3 from '@/assets/img/common/nft-detail/nft-detail-arbalist3.webp';
import nftDetailArbalist4 from '@/assets/img/common/nft-detail/nft-detail-arbalist4.webp';
import nftDetailArbalist5 from '@/assets/img/common/nft-detail/nft-detail-arbalist5.webp';
import nftDetailLancer2 from '@/assets/img/common/nft-detail/nft-detail-lancer2.webp';
import nftDetailLancer3 from '@/assets/img/common/nft-detail/nft-detail-lancer3.webp';
import nftDetailLancer4 from '@/assets/img/common/nft-detail/nft-detail-lancer4.webp';
import nftDetailLancer5 from '@/assets/img/common/nft-detail/nft-detail-lancer5.webp';
import nftDetailWarrior2 from '@/assets/img/common/nft-detail/nft-detail-warrior2.webp';
import nftDetailWarrior3 from '@/assets/img/common/nft-detail/nft-detail-warrior3.webp';
import nftDetailWarrior4 from '@/assets/img/common/nft-detail/nft-detail-warrior4.webp';
import nftDetailWarrior5 from '@/assets/img/common/nft-detail/nft-detail-warrior5.webp';
import thumbArbalist from '@/assets/img/common/profile/thumb-profile-arbalist.webp';
import thumbLancer from '@/assets/img/common/profile/thumb-profile-lancer.webp';
import thumbSorcerer from '@/assets/img/common/profile/thumb-profile-sorcerer.webp';
import thumbTaoist from '@/assets/img/common/profile/thumb-profile-taoist.webp';
import thumbWarrior from '@/assets/img/common/profile/thumb-profile-warrior.webp';
import CharacterClass, { findLowercaseKey } from '@/constants/character/character-class';

export default defineComponent({
  name: 'CharacterClassThumb',
  watch: {
    thumbnail(value) {
      console.log('thumbnail', value);
    },
  },
  computed: {
    classCode() {
      return Number(this.characterClass);
    },
    className() {
      return findLowercaseKey(this.classCode);
    },
    thumbnail() {
      if (Number.isNaN(this.classCode) || this.classCode === CharacterClass.ALL) {
        // if executed this scope, it means error are occurred.
        return '';
      }
      const resource = this.resource[this.type][this.classCode];
      return typeof resource === 'string' ? resource : resource[this.grade];
    },
    resource() {
      return {
        thumb: {
          [CharacterClass.WARRIOR]: thumbWarrior,
          [CharacterClass.SORCERER]: thumbSorcerer,
          [CharacterClass.TAOIST]: thumbTaoist,
          [CharacterClass.ARBALIST]: thumbArbalist,
          [CharacterClass.LANCER]: thumbLancer,
        },
        profile: {
          [CharacterClass.WARRIOR]: profileWarrior,
          [CharacterClass.SORCERER]: profileSorcerer,
          [CharacterClass.TAOIST]: profileTaoist,
          [CharacterClass.ARBALIST]: profileArbalist,
          [CharacterClass.LANCER]: profileLancer,
        },
        icon: {
          [CharacterClass.WARRIOR]: iconWarrior,
          [CharacterClass.SORCERER]: iconSorcerer,
          [CharacterClass.TAOIST]: iconTaoist,
          [CharacterClass.ARBALIST]: iconArbalist,
          [CharacterClass.LANCER]: iconLancer,
        },
        card: {
          [CharacterClass.WARRIOR]: {
            2: cardWarriorGrade2,
            3: cardWarriorGrade3,
            4: cardWarriorGrace4,
            5: cardWarriorGrade5,
          },
          [CharacterClass.SORCERER]: {
            2: cardSorcererGrade2,
            3: cardSorcererGrade3,
            4: cardSorcererGrade4,
            5: cardSorcererGrade5,
          },
          [CharacterClass.TAOIST]: {
            2: cardTaoistGrade2,
            3: cardTaoistGrade3,
            4: cardTaoistGrade4,
            5: cardTaoistGrade5,
          },
          [CharacterClass.ARBALIST]: {
            2: cardArbalistGrade2,
            3: cardArbalistGrade3,
            4: cardArbalistGrade4,
            5: cardArbalistGrade5,
          },
          [CharacterClass.LANCER]: {
            2: cardLancerGrade2,
            3: cardLancerGrade3,
            4: cardLancerGrade4,
            5: cardLancerGrade5,
          },
        },
        detail: {
          [CharacterClass.WARRIOR]: {
            2: nftDetailWarrior2,
            3: nftDetailWarrior3,
            4: nftDetailWarrior4,
            5: nftDetailWarrior5,
          },
          [CharacterClass.SORCERER]: {
            2: nftDetailSorcerer2,
            3: nftDetailSorcerer3,
            4: nftDetailSorcerer4,
            5: nftDetailSorcerer5,
          },
          [CharacterClass.TAOIST]: {
            2: nftDetailTaoist2,
            3: nftDetailTaoist3,
            4: nftDetailTaoist4,
            5: nftDetailTaoist5,
          },
          [CharacterClass.ARBALIST]: {
            2: nftDetailArbalist2,
            3: nftDetailArbalist3,
            4: nftDetailArbalist4,
            5: nftDetailArbalist5,
          },
          [CharacterClass.LANCER]: {
            2: nftDetailLancer2,
            3: nftDetailLancer3,
            4: nftDetailLancer4,
            5: nftDetailLancer5,
          },
        },
      };
    },
  },
  props: {
    characterClass: {
      type: [Number, String],
      required: true,
    },
    grade: {
      type: Number,
      required: false,
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 64,
    },
    type: {
      type: String,
      required: false,
      default: 'profile',
    },
  },
});
</script>
