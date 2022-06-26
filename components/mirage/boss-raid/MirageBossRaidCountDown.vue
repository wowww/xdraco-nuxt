<template>
  <div ref="tickMirage" class="tick-mirage tick" :class="{ 'tick--smaller': smaller, 'theme-dark': dark, 'theme-purple': themePurple }">
    <div aria-hidden="true" data-repeat="true" data-layout="horizontal left fit">
      <div class="tick-group">
        <div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
          <span data-view="flip"></span>
        </div>

        <span v-if="tickLabel" data-key="label" data-view="text" class="tick-label" data-transform="value(t)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MirageBossRaidCountDown',
  props: {
    targetDate: {
      type: String,
      required: true,
    },
    tickLabel: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    smaller: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    dark: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    themePurple: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    timerValue: [],
  }),
  watch: {
    dark() {
      console.log('AA');
      // Tick.DOM.destroy(this.$refs.tickMirage);

      this.$nextTick(() => {
        // this.createDomFlip();
        this.initCountdown();
      });
    },
  },
  mounted() {
    this.createDomFlip();
    this.initCountdown();
  },
  methods: {
    createDomFlip() {
      const { displayFormat } = this;
      const didInit = (tick) => {
        this.tickFlip = tick;
        // console.log(this.tickFlip.root.querySelectorAll('.tick-group .tick-label'));
      };
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-countdown';
</style>
