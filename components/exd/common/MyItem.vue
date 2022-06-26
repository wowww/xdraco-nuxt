<template>
  <div class="myitem" :data-sale-type="`${tabType}`">
    <item-info
      :item="tabType === MyItemTab.SEAL ? { ...myItem } : myItem.item"
      :show-enhance="tabType === MyItemTab.SOLD_OUT || tabType === MyItemTab.PURCHASE"
    />
    <div v-if="tabType === MyItemTab.SALE" class="myitem-detail sale">
      <ul class="list">
        <template v-if="!isMobile">
          <li class="enhance">
            <span>{{ $t('w.common.item.enhance') }}</span>
            <strong>
              <template v-if="hasEnhance"> +{{ myItem.item.enhance }} </template>
              <template v-else>-</template>
            </strong>
          </li>
          <li class="score">
            <span>{{ $t('t.exd.power.score') }}</span>
            <strong>
              <template v-if="hasPowerScore">
                {{ myItem.item.powerScore | currency(0) }}
              </template>
              <template v-else>-</template>
            </strong>
          </li>
          <li class="price">
            <span>Sale Price</span>
            <strong class="ico-hydra ico-xs add-inside"
              >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></strong
            >
          </li>
        </template>
        <li class="apply">
          <button v-if="myItem.enable === 0" type="button" disabled="disabled" class="btn btn-sm">{{ $t('t.exd.processing') }}</button>
          <button v-else type="button" class="btn btn-primary2 btn-sm" @click="openCancel">{{ $t('t.exd.sales.cancel') }}</button>
        </li>
      </ul>
    </div>
    <div v-else-if="tabType === MyItemTab.SOLD_OUT" class="myitem-detail">
      <ul class="spec">
        <li class="date">
          <span>{{ $t('t.exd.tx.date') }}</span>
          <strong>{{ myItem.endTime | dateFormat }}</strong>
        </li>
        <li class="price">
          <span>Sales Price</span>
          <strong
            >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></strong
          >
        </li>
        <li class="rate">
          <span>{{ $t('t.exd.tx.fee', [5]) }}</span>
          <strong class="negative"
            >{{ formattedFee[0] }}<small>{{ formattedFee[1] }}</small></strong
          >
        </li>
        <li class="settlement">
          <span>{{ $t('t.exd.tx.earned') }}</span>
          <strong class="ico-hydra ico-xs add-inside">
            {{ formattedSettlement[0] }}<small>{{ formattedSettlement[1] }}</small>
          </strong>
        </li>
      </ul>
    </div>
    <div v-else-if="tabType === MyItemTab.SEAL" class="myitem-detail">
      <ul class="list">
        <li v-if="!isMobile" class="enhance">
          <span>{{ $t('w.common.item.enhance') }}</span>
          <strong>
            <template v-if="hasEnhance"> +{{ myItem.enhance }} </template>
            <template v-else> - </template>
          </strong>
        </li>
        <li class="apply">
          <button type="button" :class="{ 'btn-sell': !isMobile, 'item-more': isMobile }" @click="go2Registration">
            <template v-if="!isMobile">
              {{ $t('t.exd.sell') }}
            </template>
            <em v-else class="hidden"> View more </em>
          </button>
        </li>
      </ul>
    </div>
    <div v-else-if="tabType === MyItemTab.PURCHASE" class="myitem-detail">
      <ul class="spec">
        <li class="date">
          <span>{{ $t('t.exd.tx.date') }}</span>
          <strong>{{ myItem.endTime | dateFormat }}</strong>
        </li>
        <li class="settlement">
          <span>{{ $t('t.exd.purchased.price') }}</span>
          <strong class="ico-hydra ico-xs add-inside"
            ><span>{{ myItem.price | currency(2) }}</span></strong
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from '@vue/composition-api';
import { useMutations, createNamespacedHelpers, useActions } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';
import ItemInfo from '@/components/exd/common/ItemInfo';
import { useFormattedNumber } from '@/utils/composables/common';
import { MyItemTab } from '@/constants/exchange';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'MyItem',
  components: { ItemInfo },
  props: {
    tabType: {
      type: Number,
    },
    itemStatus: {
      type: String,
    },
    myItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ myItem }, { root }) {
    const { $i18n, $router, $dracoWebApi } = root;
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { closeModal } = useActions(['closeModal']);
    const { fetchMyItems } = useExdActions(['fetchMyItems']);

    const go2Registration = () => {
      $router.push(`/exd/my-items/${myItem.itemUID}`);
    };

    const go2Detail = () => {
      $router.push(`/exd/item/${myItem.tradeUID}`);
    };

    const itemType = computed(() => {
      if (!myItem) {
        return [];
      }
      return myItem.item.itemType.split('_');
    });

    const hasEnhance = computed(() => ['2', '3', '4', '20'].includes(itemType.value[0]));
    const hasPowerScore = computed(() => ['2', '3', '4', '8', '20'].includes(itemType.value[0]));

    const openCancel = () => {
      setCommonModal({
        open: true,
        title: root.$t('s.exd.cancel.item', [myItem.item.itemName]),
        primary: root.$t('w.exd.yes'),
        secondary: root.$t('w.exd.no'),
        onPrimary: () => {
          $dracoWebApi.delete('/exd/tradeitem', { params: { tradeUID: myItem.tradeUID } }).then(({ data }) => {
            if (data.code === 200) {
              fetchMyItems();
            }
          });
        },
        onSecondary: () => {
          closeModal();
        },
      });
    };

    const formattedPrice = useFormattedNumber(myItem.price);
    const formattedFee = useFormattedNumber(myItem.fee * -1, 4);
    const formattedSettlement = useFormattedNumber(myItem.settlement, 4);

    onMounted(() => {
      console.log(myItem);
    });

    return {
      MyItemTab,
      go2Registration,
      go2Detail,
      itemType,
      hasEnhance,
      hasPowerScore,
      openCancel,
      formattedPrice,
      formattedFee,
      formattedSettlement,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
