<template>
  <div class="wrap-my-mirage">
    <v-tabs v-model="currentTab" class="tab-rounds">
      <v-tab>My Roster</v-tab>
      <v-tab>NFT Enhancement</v-tab>
      <v-tab>My NFTs</v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item class="wrap-my-mirage">
        <div class="util-list">
          <div class="summary">
            <em>{{ rosters.length }}</em> Characters
          </div>
          <mirage-inventory />
        </div>

        <template v-if="rosters.length === 0">
          <div class="no-data">
            <p class="desc">
              <em>There is no Character NFT available in your roster.</em>
              <span>Transfer your Character NFTs from your WEMIX WALLET to your MIRAGE roster.</span>
            </p>
            <div>
              <button type="button" class="btn-mirage btn-primary" @click="currentTab = 2">Import My NFT</button>
            </div>
          </div>
        </template>
        <ul v-else class="list-mirage-roster">
          <li v-for="(roster, rosterIdx) in rosters" :key="`mirage-roster-${rosterIdx}`">
            <mirage-roster-character-item
              :key="`mirage-roster-${rosterIdx}-${roster.CharacterUID}-${roster.State}-${closed}`"
              :character="roster"
              :closed="mirageLock"
              :hide-mirage-score="roster.State === '3' || roster.State === '7'"
              @onSealClick="selectSealCharacter"
            />
          </li>
        </ul>
      </v-tab-item>
      <v-tab-item class="wrap-my-mirage nft-enhancement">
        <div class="util-list">
          <mirage-inventory />
        </div>

        <div v-show="false" class="group-seal">
          <div class="seal-item">
            <div class="inner-item">
              <span class="thumb-item">
                <img src="@/assets/img/common/mirage/img-64-mirage-scroll.webp" alt="" />
                <span class="item-amount">x 34</span>
              </span>
              <span class="item-desc">MIRAGE Scroll</span>
            </div>
            <div class="wrap-btn">
              <button type="button" class="btn-mirage btn-primary">Seal</button>
            </div>
          </div>
          <div class="seal-item">
            <div class="inner-item">
              <span class="thumb-item">
                <img
                  src="https://file.mir4global.com/xdraco-thumb/Content/UI/Atlas_N_Resource/Global_Image/Global_Item/Item_Xdraco_01/Item_Xdraco_box_05.png"
                  alt=""
                />
                <span class="item-amount">x 34</span>
              </span>
              <span class="item-desc">MIRAGE Scroll Sealing Box</span>
            </div>
            <div class="wrap-btn">
              <button type="button" class="btn-mirage btn-primary">Unseal</button>
            </div>
          </div>
        </div>

        <div class="section-teasing">
          <span class="teasing-ment">NFT Enhancement will be updated</span>
          <span class="teasing-ment-sub">Collect more MIRAGE Scrolls</span>
        </div>
      </v-tab-item>
      <v-tab-item class="wrap-my-mirage">
        <div class="util-list">
          <div class="summary">
            <em>{{ sealList ? sealList.length : 0 }}</em> NFTs
          </div>
        </div>
        <div v-if="sealList.length === 0" class="no-data">
          <p class="desc">
            <em>{{ $t('t.mirage.no-nft') }}</em>
            <span>{{ $t('s.mirage.no-nft') }}</span>
          </p>
        </div>
        <ul class="list-card-nft" :data-empty-message="sealList && sealList.length > 0 ? '' : $t('s.nft.empty.sales')">
          <li v-for="(item, itemIdx) in sealList" :key="`nft-list-item-${item.TokenID}`">
            <nft-card
              :item="{
                tokenID: item.TokenID,
                lv: item.CharacterLev,
                characterName: item.CharacterName,
                class: item.CharacterClass,
                powerScore: item.PowerScore,
              }"
              size="sm"
              :hide-level="true"
              :non-flipped="true"
            />
            <div class="wrap-button">
              <button type="button" class="btn btn-sm btn-primary-mirage" @click="selectImportNft(itemIdx)">Send to roster</button>
            </div>
          </li>
        </ul>

        <div class="exchange-list">
          <nft-list-section-title>{{ $t('t.exd.recommended') }}</nft-list-section-title>

          <ul class="list-item" :data-empty-message="recommendedItems.list && recommendedItems.list.length > 0 ? '' : $t('s.nft.empty.sales')">
            <nft-item v-for="item in recommendedItems.list" :key="`nft-recommended-item-${item.seq || item.info.seq}`" :item="item" use-link />
          </ul>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <modal-mirage-character-info />
    <modal-import-character :visible="openImport" :item="selectedNft" @close="closeImportNft" />
    <modal-seal-character />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import MirageInventory from '@/components/mirage/common/MirageInventory';
import MirageRosterCharacterItem from '@/components/mirage/MirageRosterCharacterItem';
import ModalImportCharacter from '@/components/mirage/ModalImportCharacter';
import ModalMirageCharacterInfo from '@/components/mirage/ModalMirageCharacterInfo';
import ModalSealCharacter from '@/components/mirage/ModalSealCharacter';
import NftCard from '@/components/nft/common/NftCard';
import NftItem from '@/components/nft/common/NftItem';
import NftListSectionTitle from '@/components/nft/common/NftListSectionTitle';
import { useMirageStore } from '@/utils/composables/mirage';

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'MirageMyPage',
  components: {
    MirageInventory,
    ModalMirageCharacterInfo,
    ModalSealCharacter,
    ModalImportCharacter,
    MirageRosterCharacterItem,
    NftItem,
    NftListSectionTitle,
    NftCard,
  },
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
    hasBottomSticky: 'type1',
  },
  setup(_, { root }) {
    const { $i18n, $router } = root;
    const now = useNow({ interval: 1000 });
    const state = reactive({
      currentTab: 0,
      list: [],
      selectedNft: null,
      selectedCharacter: null,
      openImport: false,
      openSeal: false,
    });

    const { setCommonModal } = useMutations(['setCommonModal']);

    const { accessToken } = useState(['accessToken']);
    const { recommendedItems } = useNftState(['recommendedItems']);
    const { fetchNftRecommendedItems } = useNftActions(['fetchNftRecommendedItems']);

    const { useMirageState, useMirageMutations, useMirageActions, useMirageGetters } = useMirageStore();
    const { valleyCapture, rosters, sealList } = useMirageState(['valleyCapture', 'rosters', 'sealList']);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);
    const { fetchMyCharacters, fetchSealList } = useMirageActions(['fetchMyCharacters', 'fetchSealList']);

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    const startDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.StartDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const endDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const nowDay = computed(() => {
      return dayjs(now.value).utcOffset(8, false);
    });

    const startDiff = computed(() => {
      return nowDay.value.diff(startDay.value, 'minute');
    });

    const closedDiff = computed(() => {
      return nowDay.value.diff(endDay.value, 'minute');
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    const selectImportNft = (idx) => {
      if (closed.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.import'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      state.selectedNft = sealList.value[idx];
      state.openImport = true;
    };

    const closeImportNft = () => {
      state.openImport = false;
      state.selectedNft = null;

      fetchMyCharacters();
      fetchSealList();
    };

    const selectSealCharacter = (tokenID) => {
      console.log('selectSealCharacter', tokenID);
      state.selectedCharacter = rosters.value.find((item) => item.tokenID === tokenID);
      state.openSeal = true;
    };

    const closeSealCharacter = () => {
      state.openSeal = false;
      state.selectedCharacter = null;

      fetchMyCharacters();
      fetchSealList();
    };

    watch(
      () => accessToken.value,
      () => {
        if (accessToken.value) {
          fetchMyCharacters();
          fetchSealList();
        } else {
          $router.replace('/mirage/dashboard');
        }
      },
    );

    watch(
      () => state.currentTab,
      () => {
        if (state.currentTab === 0) {
          fetchMyCharacters();
        }

        if (state.currentTab === 1) {
          fetchSealList();
        }
      },
    );

    onMounted(() => {
      if (!accessToken.value) {
        $router.replace('/mirage/dashboard');
      }

      fetchMyCharacters();
      fetchSealList();
      fetchNftRecommendedItems();
    });

    return {
      ...toRefs(state),
      accessToken,
      recommendedItems,
      rosters,
      sealList,
      selectImportNft,
      closeImportNft,
      selectSealCharacter,
      closeSealCharacter,
      closed,
      now,
      mirageLock,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/mirage-list';
@import '~@/assets/sass/common/pages/mirage/nft-enhancement';
</style>
