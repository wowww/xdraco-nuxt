<template>
  <v-app id="app">
    <mobile-header v-if="isMobile" />
    <desktop-header v-else />
    <v-main>
      <v-container id="container" fluid>
        <main class="contents mywarehouse">
          <section class="section">
            <div class="section__inner">
              <div class="subnav-block"></div>
              <div class="wrap-grid">
                <div class="grid-timeline">
                  <div v-if="!accessToken" class="before-login">
                    <p>Log in with WEMIX Wallet and join HSP.</p>
                    <div class="wrap-button"><button type="button" class="btn btn-wemix-login btn-sm btn-max">LOGIN</button></div>
                  </div>
                  <Nuxt v-else/>
                  <modal-account />
                  <modal-wemix-login />
                  <modal-common />
                </div>
                <div class="grid-side">
                  <aside class="sidebar">
                    <account-info />
                    <sidebar-contact-us />
                  </aside>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';
import AccountInfo from '@/components/account/AccountInfo';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import Footer from '@/components/common/Footer';
import DesktopHeader from '@/components/common/desktop/AppHeader';
import MobileHeader from '@/components/common/mobile/header-v1/Header';
import ModalAccount from '~/components/common/modal/ModalAccount';
import ModalCommon from '~/components/common/modal/ModalCommon';
import ModalWemixLogin from '~/components/common/desktop/ModalWemixLogin';


export default defineComponent({
  name: 'InventoryLayout',
  components: {
    Footer,
    SidebarContactUs,
    AccountInfo,
    DesktopHeader,
    MobileHeader,
    ModalAccount,
    ModalCommon,
    ModalWemixLogin,
  },
  setup(_, { root }) {
    const { accessToken } = useState(['accessToken']);

    watch(
      () => accessToken.value,
      () => {
        if (!accessToken.value) {
          root.$router.replace('/exd/list');
        }
      },
    );

    onMounted(() => {
      if (!accessToken.value) {
        root.$router.replace('/exd/list');
      }
    });

    return {
      accessToken,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  created() {
    if (process.client) {
      if (this.isMobile) {
        document.documentElement.classList.add('is-mobile');
      } else {
        document.documentElement.classList.add('is-desktop');
      }
    }

    if (this.$store.state.accessToken && !this.$store.state.balance) {
      this.$store.dispatch('fetchBalance');
    }
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/_mywarehouse.scss';
@import '~@/assets/sass/components/_tab-style1.scss';
</style>
