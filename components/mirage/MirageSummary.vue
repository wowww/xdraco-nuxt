<template>
  <div v-if="accountInfo" class="mirage-dashboard">
    <dl class="list-dashboard">
      <div>
        <dt>{{ $t('w.mirage.draksteel') }}</dt>
        <dd>
          <em class="value"
          ><img src="@/assets/img/common/mirage/ico-20-darksteel.webp" width="20" />{{ accountInfo.BlackIronAmount | currency(0) }}</em
          >
        </dd>
      </div>
      <div>
        <dt>{{ $t('w.mirage.septaria') }}</dt>
        <dd>
          <em class="value"
          ><img src="@/assets/img/common/mirage/ico-20-septaria.webp" width="20" />{{ accountInfo.SeptariaAmount | currency(0) }}</em
          >
        </dd>
      </div>
      <div>
        <dt>MIRAGE Scroll</dt>
        <dd>
          <em class="value"
          ><img src="@/assets/img/common/mirage/img-24-mirage-scroll.webp" width="24" alt="" />{{ accountInfo.ScrollAmount | currency(0) }}</em
          >
          <button v-show="false" disabled type="button" class="btn-enhance btn-disabled">Enhance</button>
        </dd>
      </div>
      <div>
        <dt>{{ $t('w.mirage.vigor') }}</dt>
        <dd>
          <em class="value"><img src="@/assets/img/common/mirage/ico-20-energy.webp" width="20" />{{ accountInfo.VigorAmount | currency(0) }}</em>
          <button type="button" class="btn btn-charge" @click="openChargeVigor()">{{ $t('w.mirage.charge') }}</button>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { computed, defineComponent, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageSummary',
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { accessToken } = useState(['accessToken']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { accountInfo, accountServerInfo, rosters } = useMirageState(['accountInfo', 'accountServerInfo', 'rosters']);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { setVisibleChargeVigor } = useMirageMutations(['setVisibleChargeVigor']);
    const { fetchAccountInfo } = useMirageActions(['fetchAccountInfo']);

    const enlisted = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => Number(roster.State) === 1).length;
      }

      return 0;
    });

    const wounded = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => [3, 7, 14].includes(Number(roster.State))).length;
      }

      return 0;
    });

    const openChargeVigor = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.vigor'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      setVisibleChargeVigor(true);
    };

    watch(
      () => accessToken.value,
      () => {
        console.log(accessToken.value);
        if (accessToken.value) {
          fetchAccountInfo();
        }
      },
    );

    return {
      accountInfo,
      accountServerInfo,
      setVisibleChargeVigor,
      enlisted,
      wounded,
      rosters,
      openChargeVigor,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-dashboard';
</style>
