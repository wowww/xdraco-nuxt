<template>
  <v-app id="app">
    <mobile-header v-if="isMobile" />
    <desktop-header v-else />
    <v-main>
      <v-container id="container" fluid>
        <main id="contents" class="contents mirage">
          <banner-mirage-top v-if="$route.path.includes('dashboard')"/>
          <section ref="refSection" class="section">
            <div class="section__inner">
              <div v-if="!$route.path.includes('dashboard')" class="subnav-block"></div>

              <div class="wrap-grid">
                <div class="grid-timeline">
                  <mirage-lock-notice v-if="mirageLock"/>
                  <Nuxt />
                </div>
                <div class="grid-side">
                  <aside class="sidebar">
                    <account-info/>
                    <sidebar-contact-us/>
                  </aside>
                </div>
              </div>
            </div>
          </section>
          <app-footer class="mt-16"/>
          <mirage-footer :closed="mirageLock"/>
          <modal-minting/>
          <modal-charge-vigor/>
          <modal-terms-of-use/>
          <modal-retreat-character/>
          <modal-recover/>
          <modal-dispel/>
          <modal-account />
          <modal-wemix-login />
          <modal-common />
          <v-dialog
            :value="openLoading"
            content-class="dialog-hsp"
            scrollable
            :max-width="!isMobile ? '480px' : null"
            persistent
            :transition="isMobile ? 'dialog-bottom-transition' : 'scale-transition'"
          >
            <v-card class="dialog-loading-contents" tile>
              <v-btn v-show="false" class="close" fab icon absolute small @click="openLoading = false">
                <v-icon color="#000">mdi-close</v-icon>
              </v-btn>

              <v-card-text
                :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }">
                <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '3rem auto' }">
                  <v-progress-circular class="ml-2" :size="48" :width="10" color="#f0f0f0" indeterminate/>
                </div>

                <h2 class="loading-status">
                  {{ $t('t.hsp.main.loading.doing') }}...
                </h2>

                <div class="loading-info">
                  {{ $t('s.hsp.main.loading.waiting') }}
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </main>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, watch } from '@vue/composition-api';
import { useActions, useState } from 'vuex-composition-helpers/dist';

import Headroom from 'headroom.js';
import DesktopHeader from '@/components/common/desktop/AppHeader';
import MobileHeader from '@/components/common/mobile/header-v1/Header';
import AccountInfo from '@/components/account/AccountInfo';
import BannerMirageTop from '@/components/banner/MirageTop';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import MirageLockNotice from '@/components/mirage/common/MirageLockNotice';
import MirageFooter from '@/components/mirage/MirageFooter';
import ModalChargeVigor from '@/components/mirage/ModalChargeVigor';
import ModalDispel from '@/components/mirage/ModalDispel';
import ModalMinting from '@/components/mirage/ModalMinting';
import ModalRecover from '@/components/mirage/ModalRecover';
import ModalRetreatCharacter from '@/components/mirage/ModalRetreatCharacter';
import ModalTermsOfUse from '@/components/mirage/ModalTermsOfUse';
import ModalAccount from '@/components/common/modal/ModalAccount';
import ModalWemixLogin from '@/components/common/desktop/ModalWemixLogin';
import ModalCommon from '@/components/common/modal/ModalCommon';
import { useMirageStore } from '@/composables/mirage';
import AppFooter from '~/components/common/AppFooter';

export default defineComponent({
  name: 'MirageLayout',
  components: {
    DesktopHeader,
    MobileHeader,
    AppFooter,
    ModalDispel,
    ModalRetreatCharacter,
    MirageLockNotice,
    ModalTermsOfUse,
    MirageFooter,
    ModalRecover,
    BannerMirageTop,
    ModalChargeVigor,
    ModalMinting,
    SidebarContactUs,
    AccountInfo,
    ModalAccount,
    ModalCommon,
    ModalWemixLogin,
  },
  setup () {
    const { accessToken } = useState(['accessToken']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { openLoading, accountInfo, valleyCapture } = useMirageState(['openLoading', 'accountInfo', 'valleyCapture']);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);
    const { fetchDerby, fetchHydraSupply } = useActions(['fetchDerby', 'fetchHydraSupply']);
    const {
      fetchValleyList,
      fetchServerInfo,
      fetchAccountServerInfo,
      fetchAccountInfo,
      fetchMyCharacters,
      startCheckLocked,
      stopCheckLocked,
      fetchBossRaidList,
      fetchBossRaidMetaParty,
      fetchBossRaidMetaWound,
    } = useMirageActions([
      'fetchValleyList',
      'fetchServerInfo',
      'fetchAccountServerInfo',
      'fetchAccountInfo',
      'fetchMyCharacters',
      'fetchBossRaidList',
      'startCheckLocked',
      'stopCheckLocked',
      'fetchBossRaidMetaParty',
      'fetchBossRaidMetaWound',
    ]);

    onMounted(() => {
      fetchValleyList();
      fetchBossRaidList();
      fetchDerby();
      fetchHydraSupply();
      fetchServerInfo();
      fetchAccountServerInfo();
      fetchAccountInfo();
      fetchMyCharacters();

      startCheckLocked();
      fetchBossRaidMetaParty();
      fetchBossRaidMetaWound();
    });

    onUnmounted(() => {
      stopCheckLocked();
    });

    watch(
      () => accessToken.value,
      () => {
        fetchAccountInfo();
      },
    );

    return {
      openLoading,
      mirageStatus,
      mirageLock,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    }
  },
  watch: {
    $route (to) {
      if (to.path.includes('/valley-capture')) {
        if (!this.$refs.refSection.classList.contains('mirage-play')) {
          this.$refs.refSection.classList.add('mirage-play');
        }
      } else {
        this.$refs.refSection.classList.remove('mirage-play');
      }
    },
  },
  created () {
    if (process.client) {
      if (this.isMobile) {
        document.documentElement.classList.add('is-mobile');
      } else {
        document.documentElement.classList.add('is-desktop');
      }
    }
    this.$store.dispatch('exd/fetchPrice');
    this.$store.dispatch('hsp/fetchPrice');

    if (this.accessToken) {
      this.$store.dispatch('account/fetchRepCharacter');
    }
    if (this.$store.state.dracoAccessToken && !this.$store.state.account.represent) {
      this.$store.dispatch('account/fetchUserCharacter');
    }
    if (this.$store.state.accessToken && !this.$store.state.balance) {
      this.$store.dispatch('fetchBalance');
    }
  },
  mounted () {
    this.setHeadroom();

    if (this.$route.path.includes('/valley-capture')) {
      if (!this.$refs.refSection.classList.contains('mirage-play')) {
        this.$refs.refSection.classList.add('mirage-play');
      }
    }
  },
  unmounted () {
    if (!this.$route.path.includes('/valley-capture')) {
      this.$refs.refSection.classList.remove('mirage-play');
    }
  },
  methods: {
    setHeadroom() {
      if (!document.querySelector('#header')) {
        return;
      }
      const target = document.querySelector('#header');
      this.headroom = new Headroom(target, this.optionsHeadroom);
      this.headroom.init();
    },
  },
});
</script>

<style lang="scss">
//@import '~@/assets/sass/common/app';
//@import '~@/assets/sass/components/mirage-dialog';
</style>
