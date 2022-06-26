<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-termos"
    :value="openTermsOfUse"
    :width="!isMobile ? '560px' : '100%'"
    scrollable
    :transition="isMobile ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="content">
      <v-btn v-show="false" class="btn-close btn-miragepop-close" fab plain x-small @click="close()" />
      <h2 class="title">XDRACO</h2>
      <p class="desc" v-html="$t('s.mirage.popup.desc1')"></p>
      <div class="link-wrap">
        <a href="/policy" class="link-service" target="_blank" v-html="$t('t.policy.main')"></a>
        <a href="https://forum.mir4global.com/policy/terms" class="link-service" target="_blank" v-html="$t('w.mirage.footer.terms')"></a>
      </div>
      <div class="checkbox-container">
        <input id="is-subscription" type="checkbox" :value="agree" @click="agree = !agree" />
        <label for="is-subscription" v-html="$t('s.mirage.popup.desc2')"></label>
      </div>
      <button type="button" :disabled="!agree || loading" class="btn btn-red-mirage" @click="sendAgree">Continue</button>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { useState, useMutations, useActions } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'ModalTermsOfUse',
  setup(_, { root }) {
    const state = reactive({
      agree: false,
      loading: false,
    });
    const { logOut } = useActions(['logOut']);
    const { openTermsOfUse } = useState(['openTermsOfUse']);
    const { setOpenTermsOfUse } = useMutations(['setOpenTermsOfUse']);

    const sendAgree = () => {
      state.loading = true;
      root.$dracoWebApi
        .post('/mirage/account')
        .then(({ data }) => {
          if (data.code === 200) {
            setOpenTermsOfUse(false);
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const close = () => {
      setOpenTermsOfUse(false);
      logOut();
    };

    return {
      ...toRefs(state),
      openTermsOfUse,
      setOpenTermsOfUse,
      sendAgree,
      close,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
