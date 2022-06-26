<template>
  <div class="round-number">
    <span>ROUND</span>
    <strong>{{ value }}</strong>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DspRoundNumber',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
});
</script>
