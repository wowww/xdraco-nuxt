<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-play"
    :value="visibleEnlistResult"
    :width="!isMobile ? '560px' : '100%'"
    scrollable
    persistent
    :transition="isMobile ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div v-if="enlistResultResponse" class="content">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleEnlistResult(false)" />
      <p
        v-if="enlistResultResponse && enlistResultResponse.isKick == '1'"
        class="mirage-popup-playdesc"
        v-html="
          $t('s.mirage.message.assault.kick', [
            selectedCharacter.CharacterName,
            enlistResultResponse.VictimCharacterName,
            $t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`),
          ])
        "
      />
      <p v-if="selectedCharacter && enlistResultResponse.isKick != '1'" class="mirage-popup-playdesc">
        <strong>{{ selectedCharacter.CharacterName }}</strong
        ><br />
        has joined in the <strong>‘{{ $t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`) }}’</strong> Hidden Valley Capture.
      </p>
      <div v-if="selectedCharacter" class="play-wrap">
        <div class="char">
          <mirage-valley-character-item :character="selectedCharacter" hide-action hide-character-name hide-mirage-score />
        </div>
        <div class="play-info">
          <dl class="play-score">
            <dt>MIRAGE Score</dt>
            <dd>
              <span class="volume">{{ selectedCharacter.MirageScore | currency(0) }}</span>
              <div class="mirax">
                <span>MiraX</span>
                <span class="value">{{ selectedCharacter.MiraX }}</span>
              </div>
            </dd>
          </dl>
          <dl class="play-stage">
            <dt>{{ $t('t.mirage.sanctuary') }}</dt>
            <dd>
              <p>Stage</p>
              <span>{{ selectedCharacter.SanctuaryOfHydraLevel }}</span>
            </dd>
          </dl>
        </div>
      </div>
      <p v-if="enlistResultResponse.isKick === '1' && savedVigor" class="break-in">{{ $t('s.mirage.assault.base.vigor') }}</p>
      <div v-if="enlistResultResponse && enlistResultResponse.isKick === '1'" class="remain-energy type2">
        <span>{{ $t('w.mirage.used.vigor') }}</span
        ><span class="remain">{{ vigorAmount }}</span>
      </div>
      <button type="button" class="btn btn-black-mirage" @click="setVisibleEnlistResult(false)">OK</button>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, watch } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MobileDetect from 'mobile-detect';
import MirageValleyCharacterItem from '@/components/mirage/MirageValleyCharacterItem';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalEnlistResult',
  components: { MirageValleyCharacterItem },
  setup() {
    const { rosters, modalSelectedValley, visibleEnlistResult, modalSelectedCharacterUID, enlistResultResponse } = useMirageState([
      'rosters',
      'modalSelectedValley',
      'visibleEnlistResult',
      'modalSelectedCharacterUID',
      'enlistResultResponse',
    ]);
    const { setVisibleEnlistResult, setEnlistResultResponse } = useMirageMutations(['setVisibleEnlistResult', 'setEnlistResultResponse']);

    const selectedCharacter = computed(() => {
      if (modalSelectedCharacterUID.value) {
        return rosters.value.find((item) => item.CharacterUID === modalSelectedCharacterUID.value);
      }

      return null;
    });

    const savedVigor = computed(() => {
      if (enlistResultResponse.value) {
        return Number(enlistResultResponse.value.VigorAmount) < Number(enlistResultResponse.value.BetVigorAmount);
      }

      return false;
    });

    const vigorAmount = computed(() => {
      if (enlistResultResponse.value) {
        return enlistResultResponse.value.VigorAmount;
      }

      return 0;
    });

    watch(
      () => visibleEnlistResult.value,
      () => {
        if (!visibleEnlistResult.value) {
          setEnlistResultResponse(null);
        }
      },
    );

    return {
      modalSelectedValley,
      visibleEnlistResult,
      enlistResultResponse,
      setVisibleEnlistResult,
      selectedCharacter,
      savedVigor,
      vigorAmount,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
