<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-scorepop-type1 dialog-mirage-score"
    :value="visibleSeal"
    :width="!isMobile ? '560px' : '100%'"
    scrollable
    :transition="isMobile ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div v-if="character" class="content">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close" />
      <div class="info">
        <nft-card
          :item="{
            tokenID: character.tokenID,
            characterName: character.CharacterName,
            class: character.Class,
            powerScore: character.CombatPoint,
          }"
        />
        <div class="info-box">
          <dl class="info-score">
            <dt>MIRAGE Score</dt>
            <dd>
              <span class="volume">{{ character.MirageScore | currency(0) }}</span>
              <div class="mirax">
                <span>MiraX</span>
                <span class="value">{{ character.MiraX | currency(0) }}</span>
              </div>
            </dd>
          </dl>
          <dl class="info-sanctuary">
            <dt>Sanctuary of Hydra</dt>
            <dd>
              <p>STAGE</p>
              <div>{{ character.SanctuaryOfHydraLevel }}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div class="mirage-popup-scorepopdesc">
        <p v-html="$t('t.mirage.seal.character', [character.CharacterName])" />
      </div>
      <mirage-vigor />
      <button type="button" class="btn btn-red-mirage" :disabled="loading" @click="getPrepare">
        <span>Seal</span>
        <span class="seal">
          {{ computedVigor }}
        </span>
      </button>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';
import MirageVigor from '@/components/mirage/MirageVigor';
import NftCard from '@/components/nft/common/NftCard';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'ModalSealCharacter',
  components: {
    MirageVigor,
    NftCard,
  },
  setup(props, { root, emit }) {
    const { $dracoWebApi, $wemix, $store } = root;
    const state = reactive({
      loading: false,
      address: '',
    });

    const { accessToken, walletAddress } = useState(['accessToken', 'walletAddress']);
    const { setCommonModal } = useMutations(['setCommonModal']);

    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { mirageStatus } = useMirageGetters(['mirageStatus']);
    const { accountInfo, visibleSeal, rosters, modalCharacterInfo } = useMirageState(['accountInfo', 'visibleSeal', 'rosters', 'modalCharacterInfo']);
    const { setVisibleSeal, setModalCharacterInfo } = useMirageMutations(['setVisibleSeal', 'setModalCharacterInfo']);
    const { fetchMyCharacters } = useMirageActions(['fetchMyCharacters']);

    const character = computed(() => {
      if (!rosters.value || rosters.value.length === 0 || modalCharacterInfo.value.characterUID === '') {
        return null;
      }

      return rosters.value.find((c) => c.CharacterUID === modalCharacterInfo.value.characterUID);
    });

    const computedGrade = computed(() => {
      if (!character.value) {
        return 1;
      }

      return getCharacterGrade(Number(character.value.CombatPoint));
    });

    const computedVigor = computed(() => {
      if (computedGrade.value.grade === 5) {
        return 40;
      }
      if (computedGrade.value.grade === 4) {
        return 20;
      }
      if (computedGrade.value.grade === 3) {
        return 10;
      }

      return 5;
    });

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          state.loading = false;
        },
        onClose() {
          state.loading = false;
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      const { code: errorCode } = errorResponse;
      let errorTitle = root.$t('t.mirage.action.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = root.$t('t.mirage.action.failed');
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const messageSign = (nonce) => {
      const message = [
        { type: 'address', value: state.address },
        { type: 'uint256', value: `${character.value.tokenID}` },
        { type: 'address', value: walletAddress.value },
        { type: 'uint256', value: `${nonce}` },
        { type: 'string', value: 'seal' },
      ];
      const messages = $wemix.transaction.requestMessageSignature(['seal'], ['yellow'], message);
      console.log('message sign', messages);
      $store.dispatch('wemix/sendTransaction', {
        kind: 'mirage-seal',
        request: {
          ...messages,
          payload: {
            tokenID: character.value.tokenID,
            nonce,
          },
        },
        onSuccess: (result) => {
          if (result.code === 200 && result.data.Result === 0) {
            setCommonModal({
              open: true,
              title: root.$t('t.mirage.action.success'),
              desc: root.$t('s.mirage.seal.success'),
              primary: 'OK',
              onPrimary() {
                state.loading = false;
                emit('close');
                fetchMyCharacters();
                setVisibleSeal(false);
                setModalCharacterInfo({
                  visible: false,
                  characterUID: '',
                });
              },
              onClose() {
                state.loading = false;
                emit('close');
                fetchMyCharacters();
                setVisibleSeal(false);
                setModalCharacterInfo({
                  visible: false,
                  characterUID: '',
                });
              },
            });
          } else {
            showErrorModal(result);
          }
        }
      })
      // $wemix.openQR(
      //   'sign',
      //   req,
      //   (success) => {
      //     const last = success[success.length - 1];
      //
      //     if (last.code === 200 && last.data.Result === 0) {
      //       setCommonModal({
      //         open: true,
      //         title: root.$t('s.exd.purchase.complete'),
      //         desc: root.$t('s.exd.purchase.complete.desc'),
      //         primary: 'OK',
      //         onPrimary() {
      //           state.loading = false;
      //           emit('close');
      //         },
      //         onClose() {
      //           state.loading = false;
      //           emit('close');
      //         },
      //       });
      //     } else {
      //       showErrorModal(last);
      //     }
      //   },
      //   (fail, err) => {
      //     showErrorModal(fail[0]);
      //   },
      //   () => {
      //     state.loading = false;
      //   },
      //   'mirage-seal',
      //   {
      //     tokenID: character.value.tokenID,
      //     nonce,
      //   },
      // );
    };

    const getContractAddress = () => {
      $dracoWebApi
        .get('/exd/contractaddress', { params: { contractName: 'character' } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.address = data.data.address;
          } else {
            state.address = null;
          }
        })
        .catch((e) => {
          state.address = null;
        });
    };

    const getPrepare = () => {
      if (!character.value) {
        return;
      }
      if (mirageStatus.value.valleyCaptureLocked || mirageStatus.value.raidLocked) {
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

      if (Number(accountInfo.value.VigorAmount) < Number(computedVigor.value)) {
        setCommonModal({
          open: true,
          title: root.$t('s.mirage.message.not-enough.vigor'),
          desc: root.$t('s.mirage.message.charge.vigor'),
          primary: 'OK',
          onPrimary() {
            state.loading = false;
          },
          onClose() {
            state.loading = false;
          },
        });
        return;
      }

      root.$dracoWebApi.get('/mirage/prepare', { params: { txType: 'seal' } }).then(({ data }) => {
        if (data.code === 200) {
          messageSign(data.data.nonce);
        }
      });
    };

    const close = () => {
      setVisibleSeal(false);
    };

    watch(
      () => visibleSeal.value,
      () => {
        if (visibleSeal.value) {
          getContractAddress();
        }
        if (!visibleSeal.value) {
          state.loading = false;
        }
      },
    );

    return {
      ...toRefs(state),
      getContractAddress,
      messageSign,
      getPrepare,
      accountInfo,
      computedGrade,
      computedVigor,
      visibleSeal,
      close,
      character,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>


