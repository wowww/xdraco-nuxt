<template>
  <header id="header" class="header" height="auto" dark tile app>
    <div class="header__inner">
      <div class="header__left">
        <app-nav />
      </div>
      <div class="header__right">
        <app-profile />
        <app-external-menu />
        <language />
      </div>
    </div>
    <xdraco-notification v-if="notification" :notification="notification" @on-closed="clearNotification()" />
    <app-sub-nav v-if="hasSubNav" :sub-nav="hasSubNav" />
  </header>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import AppSubNav from '@/components/common/AppSubNav';
import AppExternalMenu from '@/components/common/desktop/AppExternalMenu';
import AppNav from '@/components/common/desktop/AppNav';
import AppProfile from '@/components/common/desktop/AppProfile';
import XdracoNotification from '@/components/common/XdracoNotification';
import Language from '@/components/common/desktop/header-v2/Language';

export default defineComponent({
  name: 'AppHeader',
  components: {
    XdracoNotification,
    AppProfile,
    AppNav,
    AppExternalMenu,
    Language,
    AppSubNav,
  },
  setup(_, { root }) {
    const { $route, $nextTick } = root;
    const state = reactive({
      groupNav: null,
      hasSubNav: '',
      isUiPage: false,
      notification: null,
    });

    const { notifications } = useState(['notifications']);

    const getIsUiPage = (path) => {
      return path.includes('ui-');
    };
    const setShowDspNav = (meta) => {
      if (!meta) {
        return;
      }
      state.hasSubNav = meta.hasSubNav;
    };

    const checkAndSetNotification = () => {
      if (notifications.value == null)
        return false;
      if (notifications.value?.length === 0) {
        state.notification = null;
      }

      const filteredNotifications = notifications.value.filter((item) => {
        if (item.id === '1509564297461960710') {
          return false;
        }

        if (localStorage.getItem(`xdraco-noti-${item.id}`)) {
          return false;
        }
        return true;
      });

      if (filteredNotifications.length > 0) {
        state.notification = filteredNotifications[0];
      }
    };

    watch(
      () => $route.path,
      () => {
        checkAndSetNotification();
      },
    );

    watch(
      () => notifications.value,
      () => {
        checkAndSetNotification();
      },
    );

    const clearNotification = () => {
      state.notification = null;

      $nextTick(() => {
        checkAndSetNotification();
      });
    };

    // watch(
    //   () => $route,
    //   (to) => {
    //     setShowDspNav(to.meta);
    //   },
    // );

    onMounted(() => {
      setShowDspNav($route.meta);
    });

    return {
      ...toRefs(state),
      getIsUiPage,
      setShowDspNav,
      clearNotification,
    };
  },
  watch: {
    $route(to) {
      this.setShowDspNav(to.meta);
    },
  }
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/partials/header-v2/header';
</style>
