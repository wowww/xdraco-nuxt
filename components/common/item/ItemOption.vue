<template>
  <li>
    <img v-if="option.optionIconPath" :src="option.optionIconPath" :alt="option.optionName" :width="32" />
    <span class="skill-desc" v-html="option.optionName">{{ option.optionName }}</span>
    <strong v-if="option.optionValue" class="rate">{{ option.optionValue }}</strong>
  </li>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import MobileDetect from 'mobile-detect';

export default defineComponent({
  name: 'ItemOption',
  props: {
    option: {
      type: Object,
      default: () => ({
        optionName: '',
        optionValue: '',
        optionIconPath: '',
      }),
    },
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
