<template>
  <v-dialog
    :value="open"
    content-class="dialog-hsp"
    scrollable
    persistent
    :max-width="isMobile ? null : '720px'"
    :transition="isMobile ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <v-card class="dialog-contents" tile dark>
      <v-card-title class="title">
        <h2>{{ $t('t.hsp.main.reward-claim') }}</h2>
        <v-spacer />

        <v-btn class="close" fab icon @click="close">
          <img src="@/assets/img/common/hsp-dialog/icon-close-white.webp" />
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="additional pb-0 reward">
        <div class="additional-info-title">{{ $t('s.hsp.main.reward-claim') }}</div>

        <div class="additinal-info">
          <div>
            <span class="dot">·</span>
            <span v-html="$t('s.hsp.main.reward-claim2')"></span>
          </div>
          <div>
            <span class="dot">·</span>
            <span>{{ $t('s.hsp.main.reward-claim3') }}</span>
          </div>
        </div>

        <div class="reward-label">{{ $t('w.hsp.main.reward-claim.claim') }}</div>

        <div class="reward-box">
          <img class="hydra-icon" src="@/assets/img/common/hsp-dialog/img-icon-hydra-gold.webp" alt="hydra" />

          <v-tooltip content-class="hydra-tooltip price" :open-on-click="isMobile" :open-on-hover="!isMobile" top>
            <template #activator="{ on, attrs }">
              <span class="count" v-bind="attrs" v-on="on">
                {{ viewMyReward }}<em>{{ viewMyRewardPoint }}</em>
              </span>
            </template>

            <span class="tooltip-content" v-html="`${my.claimAmount} HYD`"></span>
          </v-tooltip>

          <v-btn width="24" height="24" fab icon :disabled="loadingMy" @click="fetchMy">
            <img :class="{ on: loadingMy }" class="icon-refresh" src="@/assets/img/common/hsp-dialog/ico-refresh.webp" />
          </v-btn>
        </div>
        <p v-if="my && price" class="usd">$ {{ (Number(my.claimAmount) * Number(price.USDHydraRate)) | currency(2) }}</p>
      </v-card-text>

      <v-divider v-if="isMobile" />

      <v-card-actions class="actions">
        <button type="button" class="btn-stake btn-reward" :disabled="loadingMy || loading" @click="reward">
          {{ $t('w.hsp.main.reward-claim') }}
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api';
import { computed, watch } from '@vue/composition-api/dist/vue-composition-api';
import { useState, createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { currency } from '@/utils/filters/numeric';

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'HspModalReward',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    remainStake: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { root, emit }) {
    const { $store } = root;
    const { balance } = useState(['balance']);
    const { loadingMy, my, price } = useHspState(['loadingMy', 'my', 'price']);
    const { fetchMy } = useHspActions(['fetchMy']);
    const state = reactive({
      loading: false,
      stake: '',
    });

    const close = () => {
      emit('onClose');
    };

    const inputStake = () => {
      console.log('inputStake');
      state.stake = state.stake.replace(/[^0-9]/g, '');
    };

    const postStake = () => {
      emit('onStake', state.stake);
      state.stake = '';
    };

    const setMax = () => {
      state.stake = `${props.remainStake}`;
    };

    const reward = () => {
      if (state.loading) {
        return;
      }

      state.loading = true;
      root.$dracoWebApi
        .post('/hsp/prepare', {
          type: 'claim',
          args: [],
        })
        .then(({ data }) => {
          if (data.code !== 200) {
            // showErrorModal(data);
            state.loading = false;
            return;
          }

          const hashes = data.data.hash;
          const messages = root.$wemix.transaction.requestSignature(hashes);
          state.loading = true;
          emit('onStart', 'reward');
          $store.dispatch('wemix/sendTransaction', {
            kind: 'hsp',
            request: {
              ...messages
            },
            onSuccess: (response) => {
              if (response.code === 200 && response.data.Result === 0) {
                emit('onEnd', 'reward');
                close();
              } else {
                emit('onEnd', 'reward', response.code);
              }
              state.loading = false;
            }
          })
          // root.$wemix.openQR(
          //   'sign',
          //   req,
          //   (success) => {
          //     const last = success[success.length - 1];
          //     if (last.code === 200 && last.data.Result === 0) {
          //       emit('onEnd', 'reward');
          //       close();
          //     } else {
          //       emit('onEnd', 'reward', last.code);
          //     }
          //     state.loading = false;
          //   },
          //   (fail, err) => {
          //     state.loading = false;
          //     emit('onEnd', 'reward', fail[0].code);
          //   },
          //   () => {
          //     emit('onCancel');
          //     state.loading = false;
          //   },
          //   'hsp',
          // );
        })
        .catch((e) => {
          console.log(e);
          state.loading = false;
          emit('onEnd', 'reward', 110);
        });
    };

    const viewMyReward = computed(() => {
      return my.value.claimAmount ? currency(my.value.claimAmount.split('.')[0], 0) : '--';
    });

    const viewMyRewardPoint = computed(() => {
      return my.value.claimAmount && my.value.claimAmount.split('.').length > 1 ? `.${my.value.claimAmount.split('.')[1].slice(0, 4)}` : '';
    });

    watch(
      () => props.open,
      (current, before) => {
        if (current && !before) {
          fetchMy();
        }
      },
    );

    return {
      ...toRefs(state),
      balance,
      close,
      inputStake,
      postStake,
      setMax,
      reward,
      loadingMy,
      fetchMy,
      my,
      price,
      viewMyReward,
      viewMyRewardPoint,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.wemix.modal.open;
    },
    isMobile() {
      return this.$device.isMobile;
    },
  },
  watch: {
    isOpen(open) {
      if (!open) {
        this.loading = false;
      }
    },
  },
});
</script>
