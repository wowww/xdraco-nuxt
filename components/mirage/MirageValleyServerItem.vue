<template>
  <div class="server-item">
    <div class="server-title">{{ serverItem.ServerName }}</div>
    <div class="server-info">
      <div class="capacity">
        <em>{{ serverItem.CurrentSlotCnt }}</em
        >/{{ serverItem.MaxSlotCnt }}
      </div>
      <div class="class-info">
        <div class="class-info-title">
          <span v-html="$t('w.mirage.my-squadron')"></span>
          <span class="count">{{ getTotalSquadron }}</span>
        </div>
        <ul v-if="!isMobile" class="list-class">
          <li data-character-class="1">
            <span class="logo">warrior</span>
            <em class="quantity">{{ currentServerInfo.Class1Count }}</em>
          </li>
          <li data-character-class="2">
            <span class="logo">sorcerer</span>
            <em class="quantity">{{ currentServerInfo.Class2Count }}</em>
          </li>
          <li data-character-class="3">
            <span class="logo">taoist</span>
            <em class="quantity">{{ currentServerInfo.Class3Count }}</em>
          </li>
          <li data-character-class="5">
            <span class="logo">lancer</span>
            <em class="quantity">{{ currentServerInfo.Class5Count }}</em>
          </li>
          <li data-character-class="4">
            <span class="logo">arbalist</span>
            <em class="quantity">{{ currentServerInfo.Class4Count }}</em>
          </li>
        </ul>
      </div>

      <div class="wrap-btn">
        <button v-if="!accessToken" class="btn btn-xs btn-primary-mirage" @click="wemixLogin">{{ $t('w.mirage.enter') }}</button>
        <nuxt-link v-else :to="`/mirage/valley-capture/${serverItem.ServerID}`" tag="button" class="btn btn-sm btn-primary-mirage">{{
          $t('w.mirage.enter')
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import { useWemixLogin } from '@/utils/composables/round';

const { useState: useMirageState } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageValleyServerItem',
  props: {
    serverItem: {
      type: Object,
      default: () => ({
        ServerID: '',
        ServerName: '',
        CurrentSlotCnt: 0,
        MaxSlotCnt: 0,
      }),
    },
  },
  setup(props, { root }) {
    const { wemixLogin } = useWemixLogin(root);
    const { accessToken } = useState(['accessToken']);
    const { accountServerInfo } = useMirageState(['accountServerInfo']);

    const currentServerInfo = computed(() => {
      if (accountServerInfo.value && accountServerInfo.value[props.serverItem.ServerID]) {
        return accountServerInfo.value[props.serverItem.ServerID];
      }

      return {
        Class1Count: 0,
        Class2Count: 0,
        Class3Count: 0,
        Class4Count: 0,
        Class5Count: 0,
      };
    });

    const getTotalSquadron = computed(() => {
      if (!accessToken.value) {
        return 0;
      }

      const obj = currentServerInfo.value;
      let result = 0;

      for (const prop in obj) {
        result += Number(obj[prop]);
      }
      return result;
    });

    return {
      accessToken,
      accountServerInfo,
      currentServerInfo,
      getTotalSquadron,
      wemixLogin,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
