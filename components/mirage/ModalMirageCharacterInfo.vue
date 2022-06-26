<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-character-info"
    :value="modalCharacterInfo.visible"
    :width="!isMobile ? '720px' : '100%'"
    :fullscreen="isMobile"
    scrollable
    persistent
  >
    <div class="dialog-header">
      Character Info
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close"></v-btn>
    </div>
    <div v-if="character" class="content">
      <mirage-character :character="character" />
      <div class="wrap-info-chr">
        <div v-if="!isMobile" class="info-item info-score">
          <div class="info-wrap-score">
            <span class="info-value">{{ computedMirageScore | currency(0) }}</span>
            <span v-if="computedBonus > 0" class="change">+5%</span>
          </div>
          <div class="info-wrap-mirax">
            <span class="info-title">MiraX</span>
            <span class="info-value">{{ character.MiraX | currency(0) }}</span>
          </div>
        </div>
        <div class="info-item info-level">
          <div class="flex-col">
            <span class="info-title">Power Score</span>
            <span class="info-value power-score">{{ character.CombatPoint | currency(0) }}</span>
          </div>
          <div v-if="character.Lv" class="flex-col">
            <span class="info-title">Level</span>
            <span class="info-value">{{ character.Lv }}</span>
          </div>
        </div>
        <div v-if="character.DetailType === '1' || character.DetailType === '2' || character.DetailType === '3'" class="info-item info-hidden-valley">
          <div class="flex-col">
            <span class="info-title">Enlisted</span>
            <div class="flex-row">
              <span class="info-value">Hidden Vally Capture / {{ valleyName }} / {{ $t(`t.mirage.valley-type.${character.DetailType}`) }}</span>
              <button
                type="button"
                class="btn btn-xs"
                @click="openModalRetreat({ characterId: character.CharacterUID, serverId: character.WorldUID, valleyId: character.DetailType })"
              >
                Retreat
              </button>
            </div>
          </div>
          <div v-if="character.DetailType === '1' || character.DetailType === '2' || character.DetailType === '3'" class="flex-row info-sub">
            <span class="info-title">Sanctuary of HYDRA</span>
            <span class="info-value stage"
              >stage<span class="stage-value">{{ character.SanctuaryOfHydraLevel }}</span></span
            >
          </div>
          <div v-if="false" class="flex-row info-sub">
            <span class="info-title">Septaria Harvest</span>
            <span class="info-value septaria">7</span>
          </div>
        </div>
        <div v-if="character.DetailType === '11' || character.DetailType === '12'" class="info-item info-boss-raid">
          <div class="flex-col">
            <span class="info-title">Enlisted</span>
            <div class="flex-row">
              <span class="info-value"
                >BOSS RAID / {{ $t(`w.mirage.boss-raid.name-type-${character.DetailType}`) }}
                {{ $t(`w.mirage.boss-raid.type-${character.DetailType}`) }}</span
              >
            </div>
          </div>
          <div v-if="false" class="flex-row info-sub">
            <span class="info-title">Bid Price</span>
            <span class="info-value vigor">130</span>
          </div>
        </div>
        <!-- <div class="info-item info-hidden-valley">
          <div class="flex-col">
            <span class="info-title">Enlisted</span>
            <div class="flex-row">
              <span class="info-value">Hidden Vally Capture / Valley01 / Red Moon Valley</span>
              <button type="button" class="btn btn-xs">Retreat</button>
            </div>
          </div>
          <div class="flex-row info-sub">
            <span class="info-title">Sanctuary of HYDRA</span>
            <span class="info-value stage">stage<span class="stage-value">15</span></span>
          </div>
          <div class="flex-row info-sub">
            <span class="info-title">Septaria Harvest</span>
            <span class="info-value septaria">7</span>
          </div>
        </div> -->
        <div v-if="Number(character.State) > 1 || hasBuff11 || hasBuff12" class="info-item info-damaged">
          <div v-if="Number(character.State) > 1" class="flex-col">
            <span class="info-title">Wound</span>
            <div class="flex-row">
              <img src="@/assets/img/common/mirage-character/ico-damage.webp" width="32" alt="" />
              <div class="wrap-info-status">
                <span class="info-title color-damage">{{ $t(`w.mirage.wound.${character.State}`) }}</span>
                <div class="wrap-countdown">
                  <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="restRemaining">
                    {{ days }}d {{ hours }}h {{ minutes }}m
                  </vue-countdown>
                  <!--                  <v-tooltip content-class="mirage-tooltip" attach=".wrap-countdown" top max-width="240">-->
                  <!--                    <template v-slot:activator="{ on, attrs }">-->
                  <!--                      <v-icon v-bind="attrs" v-on="on" class="icon-mirage-tooltip">icon</v-icon>-->
                  <!--                    </template>-->
                  <!--                    <div class="tooltip-wrap">-->
                  <!--                      <p>툴팁 내용 내용 내용 내용 내용 내용</p>-->
                  <!--                    </div>-->
                  <!--                  </v-tooltip>-->
                </div>
              </div>
              <button type="button" class="btn btn-xs" @click="openRecover">Recover</button>
            </div>
          </div>
          <div v-if="hasBuff11 || hasBuff12" class="flex-col">
            <span class="info-title">Curse</span>
            <div v-if="hasBuff11" class="flex-row">
              <img src="@/assets/img/common/mirage-character/img-32-scissors.webp" width="32" alt="" />
              <div class="wrap-info-status">
                <span class="info-title color-cursed">Curse of Scissors</span>
                <div v-if="buff11Remaining" class="wrap-countdown">
                  <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="buff11Remaining">
                    {{ days }}d {{ hours }}h {{ minutes }}m
                  </vue-countdown>
                  <!--                  <v-tooltip content-class="mirage-tooltip" attach=".wrap-countdown" top max-width="240">-->
                  <!--                    <template v-slot:activator="{ on, attrs }">-->
                  <!--                      <v-icon v-bind="attrs" v-on="on" class="icon-mirage-tooltip">icon</v-icon>-->
                  <!--                    </template>-->
                  <!--                    <div class="tooltip-wrap">-->
                  <!--                      <p>툴팁 내용 내용 내용 내용 내용 내용</p>-->
                  <!--                    </div>-->
                  <!--                  </v-tooltip>-->
                </div>
              </div>
              <button type="button" class="btn btn-xs" @click="openDispel">Dispel</button>
            </div>
            <div v-if="hasBuff12" class="flex-row">
              <img src="@/assets/img/common/mirage-character/img-32-stink.webp" width="32" alt="" />
              <div class="wrap-info-status">
                <span class="info-title color-cursed">Curse of Stink</span>
                <div v-if="buff12Remaining" class="wrap-countdown">
                  <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="buff12Remaining">
                    {{ days }}d {{ hours }}h {{ minutes }}m
                  </vue-countdown>
                  <!--                  <v-tooltip content-class="mirage-tooltip" attach=".wrap-countdown" top max-width="240">-->
                  <!--                    <template v-slot:activator="{ on, attrs }">-->
                  <!--                      <v-icon v-bind="attrs" v-on="on" class="icon-mirage-tooltip">icon</v-icon>-->
                  <!--                    </template>-->
                  <!--                    <div class="tooltip-wrap">-->
                  <!--                      <p>툴팁 내용 내용 내용 내용 내용 내용</p>-->
                  <!--                    </div>-->
                  <!--                  </v-tooltip>-->
                </div>
              </div>
              <button type="button" class="btn btn-xs" @click="openDispel">Dispel</button>
            </div>
          </div>
        </div>
        <div class="info-item info-sealed">
          <div class="flex-row">
            <span class="info-title">
              <template v-if="sealRemaining > 0">
                <span>Can be sealed after</span>
                <vue-countdown v-slot="{ days, hours, minutes, seconds }" class="countdown" :time="sealRemaining">
                  <template v-if="days">{{ days }}d</template>
                  <template v-if="hours">{{ hours }}h</template>
                  <template v-if="minutes">{{ minutes }}m</template>
                  <template v-if="seconds">{{ seconds }}s</template>
                </vue-countdown>
              </template>
              <template v-else-if="Number(character.State) > 1 || character.buff.length > 0"
                >NFT sealing is unavailable while Wounds or Curses remain active.</template
              >
              <template v-else-if="character.DetailType !== '0'">NFT sealing is unavailable.</template>
              <template v-else>{{ $t('s.mirage.seal.play') }}</template>
            </span>
            <button
              type="button"
              class="btn btn-red-mirage"
              :disabled="sealRemaining > 0 || Number(character.State) > 1 || character.DetailType !== '0' || character.buff.length > 0"
              @click="openSeal"
            >
              <span>Seal</span>
              <span class="seal">{{ computedSealVigor }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { defineComponent, computed } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';

import MobileDetect from 'mobile-detect';
import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'ModalMirageCharacterInfo',
  components: { MirageCharacter, VueCountdown },
  setup() {
    const now = useNow({ interval: 1000 });
    const { useMirageState, useMirageMutations, useMirageActions } = useMirageStore();
    const { rosters, modalCharacterInfo, valleyCapture } = useMirageState(['rosters', 'modalCharacterInfo', 'valleyCapture']);
    const { setModalCharacterInfo, setVisibleRecover, setVisibleSeal, setVisibleDispel } = useMirageMutations([
      'setModalCharacterInfo',
      'setVisibleRecover',
      'setVisibleSeal',
      'setVisibleDispel',
    ]);
    const { openModalRetreat } = useMirageActions(['openModalRetreat']);

    const close = () => {
      setModalCharacterInfo({
        visible: false,
        characterUID: '',
      });
    };

    const nowDay = computed(() => {
      return dayjs(now.value);
    });

    const character = computed(() => {
      if (!rosters.value || rosters.value.length === 0 || modalCharacterInfo.value.characterUID === '') {
        return null;
      }

      return rosters.value.find((c) => c.CharacterUID === modalCharacterInfo.value.characterUID);
    });

    const createdAt = computed(() => {
      if (!character.value) return nowDay.value;
      return dayjs.unix(character.value.CreatedDT);
    });

    const restAt = computed(() => {
      if (!character.value) return nowDay.value;
      return dayjs.unix(character.value.RestDT);
    });

    const sealAvailableAt = computed(() => {
      return createdAt.value.add(24, 'hour');
    });

    const sealRemaining = computed(() => {
      return sealAvailableAt.value.diff(nowDay.value);
    });
    const restRemaining = computed(() => {
      return restAt.value.diff(nowDay.value);
    });

    const computedMirageScore = computed(() => {
      if (!character.value) {
        return 0;
      }
      return new BigNumber(character.value.CombatPoint).pow(2).div(100000).toNumber();
    });

    const computedBonus = computed(() => {
      if (!character.value) {
        return 0;
      }

      const orgScore = new BigNumber(character.value.CombatPoint).pow(2).div(100000);
      const mirageScore = new BigNumber(character.value.MirageScore);

      return (mirageScore.minus(orgScore).div(orgScore).toNumber() * 100) / 100;
    });

    const computedGrade = computed(() => {
      if (!character.value) {
        return 1;
      }
      return getCharacterGrade(Number(character.value.CombatPoint));
    });

    const computedSealVigor = computed(() => {
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

    const valleyName = computed(() => {
      if (!valleyCapture.value) {
        return '';
      }

      const server = valleyCapture.value.serverInfo.find((s) => s.ServerID === character.value.WorldUID);

      if (!server) {
        return '';
      }

      return server.ServerName;
    });

    const hasBuff11 = computed(() => {
      if (!character.value || !character.value.buff) {
        return false;
      }

      return !!character.value.buff.find((b) => b.BuffType === '11');
    });

    const buff11Remaining = computed(() => {
      if (!character.value) {
        return null;
      }
      const buff11 = character.value.buff.find((b) => b.BuffType === '11');

      if (!buff11) {
        return null;
      }

      return dayjs.unix(buff11.ExpireDT).diff(nowDay.value);
    });

    const hasBuff12 = computed(() => {
      if (!character.value || !character.value.buff) {
        return false;
      }

      return !!character.value.buff.find((b) => b.BuffType === '12');
    });

    const buff12Remaining = computed(() => {
      if (!character.value) {
        return null;
      }
      const buff12 = character.value.buff.find((b) => b.BuffType === '12');

      if (!buff12) {
        return null;
      }

      return dayjs.unix(buff12.ExpireDT).diff(nowDay.value);
    });

    const openRecover = () => {
      /*
      if (closed) {
        setCommonModal({
          open: true,
          title: t('t.mirage.harvest.lockout'),
          desc: t('s.mirage.message.lockout.recover'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }
      */
      setVisibleRecover(true);
    };

    const openDispel = () => {
      setVisibleDispel(true);
    };

    const openSeal = () => {
      setVisibleSeal(true);
    };

    return {
      now,
      modalCharacterInfo,
      close,
      character,
      computedMirageScore,
      computedBonus,
      openModalRetreat,
      valleyName,
      openRecover,
      openSeal,
      openDispel,
      sealRemaining,
      restRemaining,
      computedSealVigor,
      hasBuff11,
      hasBuff12,
      buff11Remaining,
      buff12Remaining,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>


