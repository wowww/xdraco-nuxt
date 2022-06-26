<template>
  <v-dialog :value="open" content-class="wemix-qr-wrap" max-width="480" persistent v-on:click="setOpen">
    <div class="content nft-buy-qr">
      <v-btn class="btn-close" fab plain x-small @click="setOpen(false)">
        <v-icon color="#000" size="26">mdi-close</v-icon>
      </v-btn>
      <!-- dialogTitle이 있는 경우 대비 -->
      <div class="dialog-header">&nbsp;</div>
      <div class="contents-center">
        <h4 class="title">NFT</h4>
        <p class="desc">Scan QR code with your WEMIX WALLET app to purchase NFT</p>
        <p class="count">
          Time left <span>{{ remain }}</span>
        </p>
        <canvas ref="qrRef" class="qrcode-area" />
        <span class="qr-wemix">WEMIX</span>
      </div>
    </div>
    <div class="step-area">
      <div class="step-item step-1">
        <span class="step-title">STEP 1</span>
        <span class="step-img"></span>
        <p class="step-desc">Start WEMIX<br />Wallet</p>
      </div>
      <span class="step-next"></span>
      <div class="step-item step-2">
        <span class="step-title">STEP 2</span>
        <span class="step-img"></span>
        <p class="step-desc">Click the icon<br />on th top</p>
      </div>
      <span class="step-next"></span>
      <div class="step-item step-3">
        <span class="step-title">STEP 3</span>
        <span class="step-img"></span>
        <p class="step-desc">Verify after<br />code scan</p>
      </div>
      <p class="qr-bottom">Available to scan with other QR Code readers.</p>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftPurchaseDialog',
  props: {
    open: {
      type: Boolean,
    },
    setOpen: {
      type: Function,
    },
    remain: {
      type: [Number, String],
    },
  },
});
</script>


