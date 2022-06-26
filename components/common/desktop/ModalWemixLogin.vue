<template>
  <div v-if="isOpen" class="wemix__modal" aria-wemix-modal="true">
    <section class="wemix__modal-set" :aria-cell-phone="isMobile">
      <div class="wemix__modal-close" @click="close">
        <img src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-close.svg" alt="" />
      </div>
      <div class="wemix__modal-title">
        <img
          class="wemix__modal-title-logo"
          src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-logo.svg"
          height="75"
          width="75"
          alt="WEMIX"
        />
        <label class="wemix__modal-title-prefix">{{ i18n.t('qr.title.prefix') }}</label>
        <img
          class="wemix__modal-title-logo-name"
          src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-logo-text.svg"
          height="75"
          width="auto"
          alt="WEMIX"
        />
        <span>{{ i18n.t('qr.title.suffix') }}</span>
      </div>
      <article class="wemix__modal-qrcode">
        <div class="wemix__modal-qrcode-image">
          <canvas ref="canvas" class="wemix__qr-canvas" />
          <div v-if="refreshable" class="wemix__modal-qrcode-image-refresh" @click="refresh">
            <img src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-refresh.svg" height="30" width="30" />
          </div>
        </div>
        <div class="wemix__modal-qrcode-timer">
          <p>{{ i18n.t('qr.remain') }} <span class="wemix__modal-qrcode-remain">{{ remainTimeText }}</span></p>
        </div>

        <div class="wemix__modal-qrcode-warning">
          {{ i18n.t('qr.text1}') }}
        </div>
      </article>
      <article class="wemix__modal__notice">
        <div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <span>step<em>1</em></span>
              <div class="wemix__modal__flow-icon app">
                <img
                  class="wemix__modal__flow-icon--app"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-logo.svg"
                  alt=""
                />
              </div>
              <p>{{ i18n.t('qr.step1') }}</p>
            </div>
            <img
              class="wemix__modal__flow-arrow"
              src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-arrow.svg"
              alt="pointer"
            />
          </div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <span>step<em>2</em></span>
              <div class="wemix__modal__flow-icon">
                <img
                  class="wemix__modal__flow-icon--scan"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-scan.svg"
                  alt=""
                />
              </div>
              <p>{{ i18n.t('qr.step2') }}</p>
            </div>
            <img
              class="wemix__modal__flow-arrow"
              src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-arrow.svg"
              alt="pointer"
            />
          </div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <span>step<em>3</em></span>
              <div class="wemix__modal__flow-icon">
                <img
                  class="wemix__modal__flow-icon--auth"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-auth.svg"
                  alt=""
                />
              </div>
              <p>{{ i18n.t('qr.step3') }}</p>
            </div>
          </div>
        </div>
        <div class="wemix__modal__step-warning">
          <span>* {{ i18n.t('qr.other1') }}</span>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import qrcode from 'qrcode';
import i18n from '@/utils/wemix/sdk/language/i18n';
import WemixConstants from '@/utils/wemix/constants';

export default {
  name: 'ModalWemixLogin',
  props: {
    req: {
      type: Object,
      default: undefined,
    },
    onSuccess: {
      type: Function,
      default: undefined,
    },
    onFailed: {
      type: Function,
      default: undefined,
    },
  },
  setup() {
    return {
      i18n,
    };
  },
  data() {
    return {
      finished: true,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.wemix.modal.open;
    },
    openLink() {
      return this.$store.state.wemix.modal.openLink;
    },
    type() {
      return this.$store.state.wemix.modal.type;
    },
    requestUrl() {
      return this.$store.state.wemix.information.url;
    },
    timer() {
      return this.$store.state.wemix.timer;
    },
    remainTimeText() {
      const remainTime = this.$store.state.wemix.modal.remainTime;
      if (remainTime > 0) {
        const duration = this.$dayjs.duration(remainTime, 'seconds');
        return i18n.t('qr.remain.format').replace('{mm}', duration.minutes()).replace('{ss}', duration.seconds());
      }
      return i18n.t('qr.expired');
    },
    refreshable() {
      return this.$store.state.wemix.modal.remainTime <= 0;
    },
    result() {
      return this.$store.state.wemix.modal.response;
    },
    resultStatus() {
      return this.result ? this.result.status : '';
    },
    isMobile() {
      return this.$device.isMobile;
    },
  },
  watch: {
    isOpen(open) {
      if (open) {
        this.start();
      }
    },
    openLink(open) {
      if (open) {
        window.open(this.requestUrl, 'WEMIX Authentication');
      }
    },
    requestUrl(url) {
      this.drawQROnCanvas(url);
    },
    resultStatus(status) {
      switch (status) {
        case WemixConstants.STATUS.CONFIRM:
          switch (this.type) {
            case WemixConstants.TYPE.AUTH:
              this.$store.dispatch('wemix/getToken');
              break;
            case WemixConstants.TYPE.SIGN:
              this.$store.dispatch('wemix/executeTransaction');
              break;
          }
          break;
      }
    },
  },
  methods: {
    drawQROnCanvas(url) {
      qrcode.toCanvas(this.$refs.canvas, url, { width: 300, errorCorrectionLevel: 'L' });
    },
    clearCountdown() {
      this.$store.dispatch('wemix/clearCountdown');
    },
    prepare() {
      this.$store.dispatch('wemix/prepare');
    },
    setCountdown(timer) {
      this.$store.dispatch('wemix/setCountdown', timer);
    },
    start() {
      this.prepare();
      const timer = setInterval(this.decreaseRemain, 1000);
      this.setCountdown(timer);
    },
    close() {
      this.$store.dispatch('wemix/close');
    },
    refresh() {
      this.clearCountdown();
      this.start();
    },
    decreaseRemain() {
      this.drawQROnCanvas(this.requestUrl);
      this.$store.dispatch('wemix/checkStatus');
      this.$store.dispatch('wemix/decreaseRemain');
    },
  },
};
</script>

<style scoped>
@import '~@/utils/wemix/sdk/templete/qr/qr.css';
</style>
