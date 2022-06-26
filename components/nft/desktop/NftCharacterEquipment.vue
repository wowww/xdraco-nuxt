<template>
  <div class="wrap-character-equip">
    <ul v-if="item" v-show="loadInfo" class="list-character-equip">
      <li
        v-for="slot in slots"
        :key="`character-item-slot-${slot}`"
        class="list-character-equip__item"
        :data-item-grade="item.equipItem && item.equipItem[slot] ? `grade-${item.equipItem[slot].grade}` : ''"
        :data-item-type="`slot-${slot}`"
      >
        <div class="front">
          <span v-if="item.equipItem && item.equipItem[slot] && Number(item.equipItem[slot].tier) > 0" class="item-tier">
            <template>
              {{ Number(item.equipItem[slot].tier) | roman }}
            </template>
          </span>
          <span class="item-enchance">
            <template v-if="item.equipItem && item.equipItem[slot] && item.equipItem[slot].enhance > 0">
              {{ item.equipItem[slot].enhance > 0 && `+${item.equipItem[slot].enhance}` }}
            </template>
          </span>
          <img v-if="item.equipItem && item.equipItem[slot]" :src="item.equipItem[slot].itemPath" class="item-image" width="48" alt="아이템이름" />
          <span class="item-slot-default"></span>
        </div>
        <div class="back"></div>
      </li>
    </ul>

    <CharacterClassThumb
      v-if="characterClass && nftGrade"
      type="detail"
      :grade="nftGrade"
      :character-class="item.character.class"
      class="thumbs-character-equip"
      :width="width"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import { orderedSlots } from '@/constants/character/character-equipment-slot';

const { useState: useNftState, useGetters: useNftGetters } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterEquipment',
  components: {
    CharacterClassThumb,
  },
  props: {
    width: {
      type: Number,
      required: false,
      default: 480,
    },
    loadInfo: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { item } = useNftState(['item']);

    const { nftGrade, characterClass } = useNftGetters(['nftGrade', 'characterClass']);

    return {
      item,
      characterClass,
      nftGrade,
    };
  },
  computed: {
    slots() {
      return orderedSlots;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>


