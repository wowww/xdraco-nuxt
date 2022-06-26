<template>
  <div class="logged-in">
    <div class="logged-in__header">
      <h2 class="title">My Wallet</h2>
    </div>

    <!-- <div class="wrap-balance"> -->
    <div v-if="balance" class="wrap-balance" :class="{ 'no-gutter': isMobile }">
      <dl class="balance">
        <dt class="balance-title">HYDRA Balance</dt>
        <dd class="balance-desc">
          <div class="balance-volume">
            <img src="~@/assets/img/common/logged-in/logo-hydra.webp" class="logo" alt="HYDRA" />
            <xdraco-number :value="balance['HYDRA']" />
          </div>
          <div class="exchange-volume">
            <span>USD ${{ (balance['HYDRA'] * hydraUsd) | currency(0) }}</span>
            <span>WEMIX {{ (balance['HYDRA'] * hydraWemix) | currency(0) }}</span>
          </div>
        </dd>
      </dl>

      <dl class="balance">
        <dt class="balance-title">DRACO Balance</dt>
        <dd class="balance-desc">
          <div class="balance-volume">
            <img src="~@/assets/img/common/logged-in/logo-draco.webp" class="logo" alt="DRACO" />
            <xdraco-number :value="balance['DRACO']" />
          </div>
          <div class="exchange-volume">
            <span>USD ${{ (balance['DRACO'] * dracoUsd) | currency(0) }}</span>
            <span>WEMIX {{ (balance['DRACO'] * dracoWemix) | currency(0) }}</span>
          </div>
        </dd>
      </dl>

      <dl class="balance">
        <dt class="balance-title">WEMIX CREDIT Balance</dt>
        <dd class="balance-desc">
          <div class="balance-volume">
            <img src="~@/assets/img/common/logged-in/logo-wemixc.webp" class="logo" alt="WEMIX CREDIT" />
            <xdraco-number :value="balance['WEMIX CREDIT']" />
          </div>
          <div class="exchange-volume">
            <span>USD ${{ (balance['WEMIX CREDIT'] * Number(dracoRate ? dracoRate.USDWemixRate : 0)) | currency(0) }}</span>
          </div>
        </dd>
      </dl>

      <dl class="balance">
        <dt class="balance-title">WEMIX Balance</dt>
        <dd class="balance-desc">
          <div class="balance-volume">
            <img src="~@/assets/img/common/logged-in/logo-wemix.webp" class="logo" alt="WEMIX" />
            <xdraco-number :value="balance['WEMIX']" />
          </div>
          <div class="exchange-volume">
            <span>USD ${{ (balance['WEMIX'] * Number(dracoRate ? dracoRate.USDWemixRate : 0)) | currency(0) }}</span>
          </div>
        </dd>
      </dl>
    </div>

    <div class="wrap-copy-code" :class="{ 'no-gutter': isMobile }">
      <button id="btnCopyCode" type="button" class="btn-copy-code" @click="copyToClipboard">
        <!-- <span class="value" v-if="userInfo">{{ userInfo.address }}</span> -->
        <span class="value">{{ userInfo ? userInfo.address : '' }}</span>
      </button>
    </div>

    <div class="wrap-traded-button">
      <v-dialog v-model="dialogTradeCoin" content-class="dialog-trade-coin" max-width="520" persistent>
        <template #activator="{ on, attrs }">
          <button type="button" class="btn-trade" v-bind="attrs" v-on="on">
            <span>Trade with WEMIX WALLET</span>
          </button>
        </template>
        <div class="content">
          <v-btn class="btn-close" fab plain large @click="dialogTradeCoin = false">
            <v-icon color="#000" size="40">mdi-close</v-icon>
          </v-btn>
          <h3 class="bi-wemix">WEMIX</h3>
          <p v-html="$t('s.price.trade.message')"></p>
          <div class="wrap-link">
            <img src="@/assets/img/desktop/qr-wallet-google.webp" width="160" alt="WEMIX Wallet Google QR" />
            <img src="@/assets/img/desktop/qr-wallet-apple.webp" width="160" alt="WEMIX Wallet Apple QR" />
          </div>
        </div>
      </v-dialog>
    </div>

    <v-snackbar v-model="isCopiedCode" :timeout="2500" top>
      <span>Copied</span>
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="isCopiedCode = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import { useActions, useGetters, useState } from 'vuex-composition-helpers/dist';
import clipboardCopy from 'clipboard-copy';

export default defineComponent({
  name: 'LoggedIn',
  setup() {
    const { accessToken, userInfo, balance, dracoRate } = useState(['accessToken', 'userInfo', 'balance', 'dracoRate']);
    const { dracoAmount, dracoDate, dracoUsd, dracoWemix, hydraUsd, hydraWemix } = useGetters([
      'dracoAmount',
      'dracoDate',
      'dracoUsd',
      'dracoWemix',
      'hydraUsd',
      'hydraWemix',
    ]);

    const { fetchBalance, fetchDracoLastest, fetchDraco, fetchDerby, fetchCurrent, postLogin, logOut } = useActions([
      'fetchBalance',
      'fetchDracoLastest',
      'fetchDraco',
      'fetchDerby',
      'fetchCurrent',
      'postLogin',
      'logOut',
    ]);

    const state = reactive({
      selectedChart: 'usd',

      // for tab
      tabChartPrice: null,

      // for dialog
      dialogExchange: false,
      dialogTradeCoin: false,

      // for btn-copy-code
      isCopiedCode: false,
    });

    const copyToClipboard = () => {
      if (!userInfo) {
        return;
      }
      clipboardCopy(userInfo.value && userInfo.value.address);
      // clipboardCopy('0x89808ca091d7cb1ee8e2790fgf5023a0b15e2356');
      state.isCopiedCode = true;
    };

    onMounted(() => {
      postLogin();
      fetchDracoLastest();
      fetchDraco();
      fetchDerby();
      fetchBalance();
    });

    return {
      ...toRefs(state),
      accessToken,
      dracoRate,
      userInfo,
      balance,
      dracoAmount,
      dracoDate,
      dracoUsd,
      dracoWemix,
      copyToClipboard,
      fetchBalance,
      fetchDracoLastest,
      fetchDraco,
      fetchDerby,
      fetchCurrent,
      postLogin,
      logOut,
      hydraUsd,
      hydraWemix,
    };
  },
  data() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/_logged-in.scss';
</style>
