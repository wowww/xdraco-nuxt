<template>
  <div class="wrap-define-balance">
    <dl class="define-balance">
      <dt>Wallet Address</dt>
      <dd class="nickname">{{ winner.walletAddress | truncateMiddle }}</dd>
    </dl>
    <dl class="define-balance">
      <dt>{{ $t('w.rounds.winner.stake') }}</dt>
      <dd class="draco">
        <span>{{ winner.stake | currency(0) }}</span>
      </dd>
    </dl>
    <dl class="define-balance">
      <dt>{{ $t('w.rounds.winner.odds') }}</dt>
      <dd class="odds">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ winner.odds | currency(4) }}</span
            >%
          </template>
          <span>{{ winner.odds }}</span>
        </v-tooltip>
      </dd>
    </dl>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundBodyWinner',
  props: {
    winner: {
      type: Object,
      default: () => {},
    },
  },
});
</script>
