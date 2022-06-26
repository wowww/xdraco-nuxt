<template>
  <v-expansion-panel class="playnow">
    <v-expansion-panel-header class="playnow-header">
      <div v-if="stakeInfo && valleyList && stakeInfo.Valley && valleyList" class="top">
        <div class="top-left">
          <div class="title">{{ $t(`t.mirage.valley-type.${valleyType}`) }}</div>
          <div class="slot">
            <p>
              <span>{{ stakeInfo.Valley[valleyType].Info.CurrentSlotCnt }}</span>
              /{{ valleyList[valleyType].MaxSlotCnt }}
            </p>
            <v-tooltip content-class="mirage-tooltip-playnow" top max-width="320">
              <template #activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">icon</v-icon>
              </template>
              <div class="tooltip-wrap">
                <p>{{ $t('s.mirage.message.slot-count') }}</p>
              </div>
            </v-tooltip>
          </div>
        </div>
        <div class="top-right">
          MiraX
          <em>
            <template v-if="valleyType === '1'"> +4 </template>
            <template v-if="valleyType === '2'"> +7 </template>
            <template v-if="valleyType === '3'"> +10 </template>
          </em>
        </div>
      </div>
      <div v-if="stakeInfo && stakeInfo.Valley && valleyType && stakeInfo.Valley[valleyType]" class="bottom">
        <dl class="rate">
          <dt>{{ $t('w.mirage.mining.rate-e') }}</dt>
          <dd>{{ Math.round(Number(stakeInfo.Valley[valleyType].Info.Ratio) * 100) }}<span>%</span></dd>
        </dl>
        <dl class="amount">
          <dt>{{ $t('w.mirage.ds.mined') }}</dt>
          <dd>
            <img src="@/assets/img/common/mirage/ico-24-darksteel.webp" :width="!isMobile ? 24 : 20" />
            <p>{{ stakeInfo.Valley[valleyType].Info.BlackIron | currency(0) }}</p>
          </dd>
        </dl>
        <dl class="septaria">
          <dt>{{ $t('w.mirage.septaria-e') }}</dt>
          <dd>
            <img src="@/assets/img/common/mirage/ico-24-septaria.webp" :width="!isMobile ? 24 : 20" />
            <p>{{ stakeInfo.Valley[valleyType].Info.Septaria }}</p>
          </dd>
        </dl>
        <ul class="job">
          <li data-character-class="1" :data-character-grade="warrior.grade"></li>
          <li data-character-class="2" :data-character-grade="sorcerer.grade"></li>
          <li data-character-class="3" :data-character-grade="taoist.grade"></li>
          <li data-character-class="5" :data-character-grade="lancer.grade"></li>
          <li data-character-class="4" :data-character-grade="arbalist.grade"></li>
          <li class="percent">
            <template v-if="characters.length === 5">7%</template>
            <template v-else-if="characters.length === 4">4%</template>
            <template v-else-if="characters.length === 3">2%</template>
            <template v-else-if="characters.length === 2">1%</template>
            <template v-else>0%</template>
          </li>
        </ul>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="playnow-content">
      <ul v-if="stakeInfo && valleyList && serverInfo" class="char-list">
        <li>
          <mirage-valley-character-item
            :key="`miarge-valley-${valleyType}-1-${warrior.State}-${warrior.CharacterUID}`"
            :assault="assault"
            :server-id="serverInfo.ServerID"
            :valley-type="valleyType"
            :character="warrior"
            klass="1"
            mode="battle"
            :closed="mirageLock"
          />
        </li>
        <li>
          <mirage-valley-character-item
            :key="`miarge-valley-${valleyType}-1-${sorcerer.State}-${sorcerer.CharacterUID}`"
            :assault="assault"
            :server-id="serverInfo.ServerID"
            :valley-type="valleyType"
            :character="sorcerer"
            klass="2"
            mode="battle"
            :closed="mirageLock"
          />
        </li>
        <li>
          <mirage-valley-character-item
            :key="`miarge-valley-${valleyType}-1-${taoist.State}-${taoist.CharacterUID}`"
            :assault="assault"
            :server-id="serverInfo.ServerID"
            :valley-type="valleyType"
            :character="taoist"
            klass="3"
            mode="battle"
            :closed="mirageLock"
          />
        </li>
        <li>
          <mirage-valley-character-item
            :key="`miarge-valley-${valleyType}-1-${lancer.State}-${lancer.CharacterUID}`"
            :assault="assault"
            :server-id="serverInfo.ServerID"
            :valley-type="valleyType"
            :character="lancer"
            klass="5"
            mode="battle"
            :closed="mirageLock"
          />
        </li>
        <li>
          <mirage-valley-character-item
            :key="`miarge-valley-${valleyType}-1-${arbalist.State}-${arbalist.CharacterUID}`"
            :assault="assault"
            :server-id="serverInfo.ServerID"
            :valley-type="valleyType"
            :character="arbalist"
            klass="4"
            mode="battle"
            :closed="mirageLock"
          />
        </li>
      </ul>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';

import MirageValleyCharacterItem from '@/components/mirage/MirageValleyCharacterItem';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';
import CharacterClass from '@/constants/character/character-class';

export default defineComponent({
  name: 'MirageValleyItem',
  components: {
    MirageValleyCharacterItem,
  },
  props: {
    serverInfo: {
      type: Object,
      default: () => ({}),
    },
    valleyType: {
      type: String,
      default: '',
    },
  },
  setup({ valleyType }, { root }) {
    const { useMirageState, useMirageGetters } = useMirageStore();
    const { valleyList, stakeInfo } = useMirageState(['valleyList', 'stakeInfo']);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);

    const characters = computed(() => {
      if (stakeInfo.value && stakeInfo.value.Valley && stakeInfo.value.Valley[valleyType]) {
        return stakeInfo.value.Valley[valleyType].Character;
      }

      return [];
    });

    const assault = computed(() => {
      if (stakeInfo.value && valleyList.value && stakeInfo.value.Valley && stakeInfo.value.Valley[valleyType]) {
        return stakeInfo.value.Valley[valleyType].Info.CurrentSlotCnt == valleyList.value[valleyType].MaxSlotCnt;
      }
      return false;
    });

    const warrior = computed(() => {
      const exist = characters.value.find((item) => item.Class == CharacterClass.WARRIOR);

      if (exist) {
        return { ...exist, State: 1, ...getCharacterGrade(exist.CombatPoint) };
      }

      return {
        grade: 1,
        tokenID: '',
        CharacterUID: '',
        CharacterName: '',
        Class: CharacterClass.WARRIOR,
        CombatPoint: '0',
        MirageScore: '',
        SanctuaryOfHydraLevel: 0,
        CreatedDT: 0,
        State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0,
      };
    });

    const sorcerer = computed(() => {
      const exist = characters.value.find((item) => item.Class == CharacterClass.SORCERER);

      if (exist) {
        return { ...exist, State: 1, ...getCharacterGrade(exist.CombatPoint) };
      }

      return {
        grade: 1,
        tokenID: '',
        CharacterUID: '',
        CharacterName: '',
        Class: CharacterClass.SORCERER,
        CombatPoint: '0',
        MirageScore: '',
        SanctuaryOfHydraLevel: 0,
        CreatedDT: 0,
        State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0,
      };
    });

    const taoist = computed(() => {
      const exist = characters.value.find((item) => item.Class == CharacterClass.TAOIST);

      if (exist) {
        return { ...exist, State: 1, ...getCharacterGrade(exist.CombatPoint) };
      }

      return {
        grade: 1,
        tokenID: '',
        CharacterUID: '',
        CharacterName: '',
        Class: CharacterClass.TAOIST,
        CombatPoint: '0',
        MirageScore: '',
        SanctuaryOfHydraLevel: 0,
        CreatedDT: 0,
        State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0,
      };
    });

    const lancer = computed(() => {
      const exist = characters.value.find((item) => item.Class == CharacterClass.LANCER);

      if (exist) {
        return { ...exist, State: 1, ...getCharacterGrade(exist.CombatPoint) };
      }

      return {
        grade: 1,
        tokenID: '',
        CharacterUID: '',
        CharacterName: '',
        Class: CharacterClass.LANCER,
        CombatPoint: '0',
        MirageScore: '',
        SanctuaryOfHydraLevel: 0,
        CreatedDT: 0,
        State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0,
      };
    });

    const arbalist = computed(() => {
      const exist = characters.value.find((item) => item.Class == CharacterClass.ARBALIST);

      if (exist) {
        return { ...exist, State: 1, ...getCharacterGrade(exist.CombatPoint) };
      }

      return {
        grade: 1,
        tokenID: '',
        CharacterUID: '',
        CharacterName: '',
        Class: CharacterClass.ARBALIST,
        CombatPoint: '0',
        MirageScore: '',
        SanctuaryOfHydraLevel: 0,
        CreatedDT: 0,
        State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0,
      };
    });

    return {
      characters,
      warrior,
      sorcerer,
      taoist,
      lancer,
      arbalist,
      valleyList,
      stakeInfo,
      assault,
      mirageStatus,
      mirageLock,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
